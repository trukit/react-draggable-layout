/* eslint-disable no-negated-condition */
/* eslint-disable no-multi-assign */
import type { IBoxPosition, IGridMoveOpts, IGridNode, ILayoutData, IWidget, IWidgetPosition } from './types';
import * as Utils from './utils';

export type onChangeCB = (nodes: IGridNode[], removeDOM?: boolean) => void;

export class GridLayoutEngine {
  layoutData?: ILayoutData;
  nodes: IGridNode[];
  column: number;
  addedNodes: IGridNode[] = [];
  removedNodes: IGridNode[] = [];
  /** true = 批量更新, false = 单次更新 */
  batchMode: boolean = false;
  onchange?: onChangeCB;

  private _float: boolean;
  private _prevFloat?: boolean;
  protected _layouts?: IGridNode[][];
  /** @internal true while we are resizing widgets during column resize to skip certain parts */
  protected _inColumnResize?: boolean;
  /** 如果布局 widget 中有 static 属性的块，则为 true */
  protected _hasLocked?: boolean;

  static gridNode2Widget(node: IGridNode): IWidget {
    return {
      id: node.id,
      x: node.x,
      y: node.y,
      w: node.w,
      h: node.h,
      minW: node.minW,
      minH: node.minH,
      maxW: node.maxW,
      maxH: node.maxH,
      static: node.static,
      noDrag: node.noDrag,
      noResize: node.noResize,
    };
  }

  static widget2GridNode(widget: IWidget): IGridNode {
    return {
      ...widget,
    };
  }

  /**
   * 创建引擎实例
   * @param nodes 布局节点数组
   * @param layoutData 布局容器数据
   * @param maxRow 最大行数
   * @param float 是否允许浮动，即任意位置，默认为 false
   */
  public constructor(nodes: IGridNode[], column: number, float: boolean = false) {
    console.log('engine ~ Constructor');
    this.nodes = nodes;
    this.column = column;
    this._float = float;
  }

  public setLayoutData(layoutData: ILayoutData): GridLayoutEngine {
    this.layoutData = layoutData;
    return this;
  }

  /**
   * 浮动设置
   */
  public set float(val: boolean) {
    if (this._float === val) return;
    this._float = val || false;
    if (!val) {
      this._packNodes();
    }
  }
  public get float(): boolean {
    return this._float || false;
  }

  /** 删除节点脏污染标识，以及最新一次尝试的位置信息 */
  public cleanNodes(): GridLayoutEngine {
    if (this.batchMode) return this;
    this.nodes.forEach((n) => {
      delete n._dirty;
      delete n._lastTried;
    });
    return this;
  }

  /**
   * 开始更新某个节点
   * @param node 正在操作的节点
   * @returns {GridLayoutEngine} this
   */
  public beginUpdate(node: IGridNode): GridLayoutEngine {
    if (!node._updating) {
      node._updating = true;
      delete node._skipDown;
      if (!this.batchMode) this.saveInitial();
    }
    return this;
  }

  /**
   * 结束本次更新
   * @returns {GridLayoutEngine} this
   */
  public endUpdate(): GridLayoutEngine {
    let n = this.nodes.find((n) => n._updating);
    if (n) {
      delete n._updating;
      delete n._skipDown;
    }
    return this;
  }

  /**
   * 保存布局块在操作之前的位置和大小
   */
  public saveInitial(): GridLayoutEngine {
    this.nodes.forEach((n) => {
      n._orig = Utils.copyPos({}, n);
      delete n._dirty;
    });
    console.log('engine ~ saveInitial', JSON.parse(JSON.stringify(this.nodes)));
    this._hasLocked = this.nodes.some((n) => n.static);
    return this;
  }

  /** @internal restore all the nodes back to initial values (called when we leave) */
  public restoreInitial(): GridLayoutEngine {
    this.nodes.forEach((n) => {
      if (
        Utils.samePos(n, {
          x: n._orig?.x ?? n.x,
          y: n._orig?.y ?? n.y,
          w: n._orig?.w || n.w,
          h: n._orig?.h || n.h,
        })
      ) {
        return this;
      }
      Utils.copyPos(n, {
        x: n._orig?.x ?? n.x,
        y: n._orig?.y ?? n.y,
        w: n._orig?.w || n.w,
        h: n._orig?.h || n.h,
      });
      n._dirty = true;
    });
    return this;
  }

  /**
   * 获取布局引擎操作后的布局块数组
   * @returns {IWidget[]}
   */
  public getWidgets(): IWidget[] {
    this.sortNodes();
    return this.nodes.map((n) => GridLayoutEngine.gridNode2Widget(n));
  }

  /**
   * 检查是否可以移动，并做移动相关的处理
   * @param node 待移动布局块
   * @param o 移动选项信息
   * @returns {boolean}
   */
  public moveNodeCheck(node: IGridNode, o: IGridMoveOpts): boolean {
    if (node.static) return false;
    if (
      !this.changedPosConstrain(node, {
        x: o.x!,
        y: o.y!,
        w: o.w!,
        h: o.h!,
      })
    ) {
      return false;
    }
    o.pack = true;
    return this.moveNode(node, o);
  }

  /**
   * 移动节点，如果确实移动了，返回 true
   * @param node 待移动的布局节点
   * @param o 移动项数据
   * @returns {boolean}
   */
  public moveNode(node: IGridNode, o: IGridMoveOpts): boolean {
    if (!node || !o) return false;
    console.log('engine ~ moveNode', node);
    let wasUndefinedPack = false;
    if (o.pack === undefined && !this.batchMode) {
      wasUndefinedPack = o.pack = true;
    }

    // 是否是改变大小
    let nn: IGridNode = Utils.copyPos({}, node, true);
    Utils.copyPos(nn, o as IWidget);
    let before = node._orig || Utils.copyPos({}, node);
    if (!Utils.samePos(node, before)) {
      node._dirty = true;
    }
    Utils.copyPos(o, nn);

    if (!o.forceCollide && Utils.samePos(node, o as IWidget)) {
      return false;
    }
    let prevPos: IWidgetPosition = Utils.copyPos({}, node);

    // 检查我们是否需要在新位置修复碰撞
    let collides = this.collideAll(node, nn, o.skip);
    let needToMove = true;
    if (collides.length) {
      let activeDrag = node._moving && !o.nested;
      // 检查以确保我们在拖动时实际碰撞了 50%的面积
      let collide = activeDrag ? this.directionCollideCoverage(node, o, collides) : collides[0];
      // debugger;
      if (collide) {
        needToMove = !this._fixCollisions(node, nn, collide, o); // check if already moved...
      } else {
        needToMove = false; // we didn't cover >50% for a move, skip...
        if (wasUndefinedPack) delete o.pack;
      }
    }

    // 对于需要移动的进行标记，在 packNodes 内处理
    if (needToMove) {
      node._dirty = true;
      Utils.copyPos(node, nn);
    }
    if (o.pack) {
      this._packNodes();
    }
    // pack 的时候可能会把节点位置调回去了，所以这里校验下
    return !Utils.samePos(node, prevPos);
  }

  /**
   * 从 nodes 拿到与指定区域重叠并忽略 skip，skip2 的布局块
   * @param skip 忽略的块
   * @param area 检测碰撞区域
   * @param skip2 忽略的其他块
   * @returns {IGridNode | undefined}
   */
  public collide(skip: IGridNode, area = skip, skip2?: IGridNode): IGridNode | undefined {
    const skipId = skip.id;
    const skip2Id = skip2?.id;
    return this.nodes.find((n) => n.id !== skipId && n.id !== skip2Id && Utils.isCollisions(n, area));
  }

  /**
   * 从 nodes 拿到与指定区域碰撞并忽略 skip, skip2 的布局块数组
   * @param skip 忽略的块
   * @param area 检测碰撞区域
   * @param skip2 忽略的其他块
   * @returns {IGridNode[]}
   * @example
   * ```typescript
   *  this.collideAll(node, nn, o.skip); // 忽略 node 与 o.skip 块，找出所有与 nn 碰撞的节点，返回节点数组
   * ```
   */
  public collideAll(skip: IGridNode, area = skip, skip2?: IGridNode): IGridNode[] {
    const skipId = skip.id;
    const skip2Id = skip2?.id;
    return this.nodes.filter((n) => n.id !== skipId && n.id !== skip2Id && Utils.isCollisions(n, area));
  }

  /** true if x,y or w,h are different after clamping to min/max */
  public changedPosConstrain(node: IGridNode, p: IWidgetPosition): boolean {
    if (node.x !== p.x || node.y !== p.y) return true;
    return node.w !== p.w || node.h !== p.h;
  }

  /**
   * 置换，成功返回 true
   * 当两个块大小相同，或同一列开始，考虑直接置换位置
   */
  public swap(a: IGridNode, b: IGridNode): boolean {
    console.log('engine swap', a, b);
    if (!b || b.static || !a || a.static) return false;

    function _doSwap(): true {
      console.log('engine ~ doSwap');
      // assumes a is before b IFF they have different height (put after rather than exact swap)
      let { x, y } = b;
      b.x = a.x;
      b.y = a.y; // b -> a position
      if (a.h !== b.h) {
        a.x = x;
        a.y = b.y + b.h; // a -> goes after b
      } else if (a.w !== b.w) {
        a.x = b.x + b.w;
        a.y = y; // a -> goes after b
      } else {
        a.x = x;
        a.y = y; // a -> old b position
      }
      a._dirty = b._dirty = true;
      return true;
    }

    // same size and same row or column, and touching
    if (a.w === b.w && a.h === b.h && (a.x === b.x || a.y === b.y)) return _doSwap();

    // check for taking same columns (but different height) and touching
    if (a.w === b.w && a.x === b.x) {
      if (b.y < a.y) {
        let t = a;
        a = b;
        b = t;
      } // swap a <-> b vars so a is first
      return _doSwap();
    }

    // check if taking same row (but different width) and touching
    if (a.h === b.h && a.y === b.y) {
      if (b.x < a.x) {
        let t = a;
        a = b;
        b = t;
      } // swap a <-> b vars so a is first
      return _doSwap();
    }
    return false;
  }

  /** sort the nodes array from first to last, or reverse. Called during collision/placement to force an order */
  public sortNodes(dir: 1 | -1 = 1, column = this.column): GridLayoutEngine {
    this.nodes = Utils.sort(this.nodes, dir, column);
    return this;
  }

  public getRow(): number {
    return this.nodes.reduce((row, n) => Math.max(row, n.y + n.h), 0);
  }

  /** called to cache the nodes pixel rectangles used for collision detection during drag */
  public cacheRects(): GridLayoutEngine {
    if (!this.layoutData) return this;
    const { colWidth, rowHeight } = this.layoutData;
    this.nodes.forEach(
      (n) =>
        (n._rect = {
          top: n.y * rowHeight,
          left: n.x * colWidth,
          width: n.w * colWidth,
          height: n.h * rowHeight,
        }),
    );
    return this;
  }

  /** 根据起始位置进行像素覆盖率碰撞，返回覆盖率大于中线 50% 的节点 */
  protected directionCollideCoverage(node: IGridNode, o: IGridMoveOpts, collides: IGridNode[]): IGridNode | undefined {
    if (!o.rect || !node._rect) return;
    let r0 = node._rect; // 开始位置
    let r: IBoxPosition = { ...o.rect }; // 需校验节点的位置

    // update dragged rect to show where it's coming from (above or below, etc...)
    if (r.top > r0.top) {
      r.height += r.top - r0.top;
      r.top = r0.top;
    } else {
      r.height += r0.top - r.top;
    }
    if (r.left > r0.left) {
      r.width += r.left - r0.left;
      r.left = r0.left;
    } else {
      r.width += r0.left - r.left;
    }

    let collide: IGridNode | undefined;
    let overMax = 0.5; // need >50%
    collides.forEach((n) => {
      if (n.static || !n._rect) return;
      let r2 = n._rect; // overlapping target
      let yOver = Number.MAX_VALUE,
        xOver = Number.MAX_VALUE;
      // depending on which side we started from, compute the overlap % of coverage
      // (ex: from above/below we only compute the max horizontal line coverage)
      if (r0.top < r2.top) {
        // from above
        yOver = (r.top + r.height - r2.top) / r2.height;
      } else if (r0.top + r0.height > r2.top + r2.height) {
        // from below
        yOver = (r2.top + r2.height - r.top) / r2.height;
      }
      if (r0.left < r2.left) {
        // from the left
        xOver = (r.left + r.width - r2.left) / r2.width;
      } else if (r0.left + r0.width > r2.left + r2.width) {
        // from the right
        xOver = (r2.left + r2.width - r.left) / r2.width;
      }
      let over = Math.min(xOver, yOver);
      if (over > overMax) {
        overMax = over;
        collide = n;
      }
    });
    o.collide = collide; // save it so we don't have to find it again
    return collide;
  }

  /** @internal fix collision on given 'node', going to given new location 'nn', with optional 'collide' node already found.
   * return true if we moved. */
  protected _fixCollisions(node: IGridNode, nn = node, collide?: IGridNode, opt: IGridMoveOpts = {}): boolean {
    this.sortNodes(-1); // from last to first, so recursive collision move items in the right order

    collide = collide || this.collide(node, nn); // REAL area collide for swap and skip if none...
    // debugger;
    if (!collide) return false;

    // swap check: if we're actively moving in gravity mode, see if we collide with an object the same size
    if (node._moving && !opt.nested && !this.float) {
      console.log('engine ~ fixCollisions swap if');
      if (this.swap(node, collide)) return true;
    }

    // during while() collisions MAKE SURE to check entire row so larger items don't leap frog small ones (push them all down starting last in grid)
    let area = nn;
    if (this._useEntireRowArea(node, nn)) {
      area = { x: 0, w: this.column, y: nn.y, h: nn.h };
      collide = this.collide(node, area, opt.skip); // force new hit
    }

    let didMove = false;
    let newOpt: IGridMoveOpts = {
      nested: true,
      pack: false,
    };
    while ((collide = collide || this.collide(node, area, opt.skip))) {
      // could collide with more than 1 item... so repeat for each
      let moved: boolean;
      // if colliding with a locked item OR moving down with top gravity (and collide could move up) -> skip past the collide,
      // but remember that skip down so we only do this once (and push others otherwise).
      if (
        collide.static ||
        (node._moving &&
          !node._skipDown &&
          nn.y > node.y &&
          !this.float &&
          // can take space we had, or before where we're going
          (!this.collide(collide, { ...collide, y: node.y }, node) ||
            !this.collide(collide, { ...collide, y: nn.y - collide.h }, node)))
      ) {
        node._skipDown = node._skipDown || nn.y > node.y;
        moved = this.moveNode(node, { ...nn, ...newOpt, y: collide.y + collide.h });
        if (collide.static && moved) {
          Utils.copyPos(nn, node); // moving after lock become our new desired location
        } else if (!collide.static && moved && opt.pack) {
          // we moved after and will pack: do it now and keep the original drop location, but past the old collide to see what else we might push way
          this._packNodes();
          nn.y = collide.y + collide.h;
          Utils.copyPos(node, nn);
        }
        didMove = didMove || moved;
      } else {
        // move collide down *after* where we will be, ignoring where we are now (don't collide with us)
        moved = this.moveNode(collide, { ...collide, ...newOpt, y: nn.y + nn.h, skip: node });
      }
      if (!moved) {
        return didMove;
      } // break inf loop if we couldn't move after all (ex: maxRow, fixed)
      collide = undefined;
    }
    return didMove;
  }

  /** @internal called to top gravity pack the items back OR revert back to original Y positions when floating */
  protected _packNodes(): GridLayoutEngine {
    if (this.batchMode) {
      return this;
    }
    this.sortNodes(); // first to last

    if (this.float) {
      // restore original Y pos
      this.nodes.forEach((n) => {
        if (n._updating || n._orig === undefined || n.y === n._orig.y) return;
        let newY = n.y;
        while (newY > n._orig.y) {
          --newY;
          let collide = this.collide(n, { x: n.x, y: newY, w: n.w, h: n.h });
          if (!collide) {
            n._dirty = true;
            n.y = newY;
          }
        }
      });
    } else {
      // top gravity pack
      this.nodes.forEach((n, i) => {
        if (n.static) return;
        while (n.y > 0) {
          let newY = i === 0 ? 0 : n.y - 1;
          let canBeMoved = i === 0 || !this.collide(n, { x: n.x, y: newY, w: n.w, h: n.h });
          if (!canBeMoved) break;
          // Note: must be dirty (from last position) for GridStack::OnChange CB to update positions
          // and move items back. The user 'change' CB should detect changes from the original
          // starting position instead.
          n._dirty = n.y !== newY;
          n.y = newY;
        }
      });
    }
    return this;
  }

  // use entire row for hitting area (will use bottom reverse sorted first) if we not actively moving DOWN and didn't already skip
  protected _useEntireRowArea(node: IGridNode, nn: IWidgetPosition): boolean {
    return (
      (!this.float || (this.batchMode && !this._prevFloat)) &&
      !this._hasLocked &&
      (!node._moving || node._skipDown || nn.y <= node.y)
    );
  }
}
