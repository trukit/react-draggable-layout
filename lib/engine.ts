/* eslint-disable no-multi-assign */
import type { IGridNode, IWidget } from './types';
import * as Utils from './utils';

interface Layout {
  x: number;
  y: number;
  w: number;
  id: string;
}

const TEMP_ID = 'rdl-temp-id';
const EMPTY_ID = '';
const EMPTY_NODE: IGridNode = {
  id: '',
  x: 0,
  y: 0,
  w: 1,
  h: 1,
};

export type onChangeCB = (nodes: IGridNode[], removeDOM?: boolean) => void;

export class GridLayoutEngine {
  nodes: IGridNode[];
  column: number;
  maxRow?: number;
  addedNodes: IGridNode[] = [];
  removedNodes: IGridNode[] = [];
  /** true = 批量更新, false = 单次更新 */
  batchMode: boolean = false;
  onchange?: onChangeCB;

  private _float: boolean;
  private _prevFloat?: boolean;
  private _layouts?: Array<Layout[] | undefined>;
  private _ignoreLayoutsNodeChange?: boolean;
  private static _idSeq = 1;
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

  /** 启用/禁用浮动部件（默认：`false） */
  public set float(val: boolean) {
    if (this._float === val) {
      return;
    }
    this._float = val || false;
    if (!val) {
      this._packNodes();
    }
  }
  public get float(): boolean {
    return this._float || false;
  }

  /**
   * 创建引擎实例
   * @param nodes 布局节点数组
   * @param column 总列数
   * @param maxRow 最大行数
   * @param float 时候开启浮动部件，默认为 false
   */
  public constructor(nodes: IGridNode[], column: number, maxRow?: number, float: boolean = false) {
    this.nodes = nodes;
    this.column = column;
    this.maxRow = maxRow;
    this._float = float;
  }

  public batchUpdate(): GridLayoutEngine {
    if (this.batchMode) return this;
    this.batchMode = true;
    this._prevFloat = this._float;
    this._float = true; // let things go anywhere for now... commit() will restore and possibly reposition
    return this;
  }

  public commit(): GridLayoutEngine {
    if (!this.batchMode) return this;
    this.batchMode = false;
    this._float = !!this._prevFloat;
    delete this._prevFloat;
    this._packNodes();
    return this;
  }

  /**
   * 判断某个区域是否是空出来的
   */
  public isAreaEmpty(x: number, y: number, width: number, height: number): boolean {
    let nn: IGridNode = { id: TEMP_ID, x: x || 0, y: y || 0, w: width || 1, h: height || 1 };
    let collisionNode = this.nodes.find((n) => {
      return GridLayoutEngine.isCollisions(n, nn);
    });
    return !collisionNode;
  }

  /** 压缩所有块，回收空白空间 */
  public compact(): GridLayoutEngine {
    if (this.nodes.length === 0) {
      return this;
    }
    this.batchUpdate();
    this._sortNodes();
    let copyNodes = this.nodes;
    this.nodes = []; // pretend we have no nodes to conflict layout to start with...
    copyNodes.forEach((node) => {
      if (!node.noDrag && !node.static) {
        node.autoPosition = true;
      }
      this.addNode(node, false); // 'false' for add event trigger
      node._dirty = true; // force attr update
    });
    this.commit();
    return this;
  }

  /**
   * 给定一个节点，确保其坐标/值在当前网格中有效
   * @param node 需调整的节点
   * @param resizing 如果超出范围，是否缩小尺寸或移动到网格中以适应
   */
  public prepareNode(node: IGridNode, resizing?: boolean): IGridNode {
    node = node || {};
    // 如果我们缺少位置，网格会自动为我们定位（在我们将它们设置为 0,0 之前）
    if (node.x === undefined || node.y === undefined || node.x === null || node.y === null) {
      node.autoPosition = true;
    }

    // 为缺失的必填字段指定默认值
    let defaults = { w: 1, h: 1, x: 0, y: 0 };
    node = Utils.defaults(node, defaults);

    node.autoPosition = node.autoPosition || false;
    node.noResize = node.noResize || false;
    node.noDrag = node.noDrag || false;

    if (Number.isNaN(node.x)) {
      node.x = defaults.x;
      node.autoPosition = true;
    }
    if (Number.isNaN(node.y)) {
      node.y = defaults.y;
      node.autoPosition = true;
    }
    if (Number.isNaN(node.w)) {
      node.w = defaults.w;
    }
    if (Number.isNaN(node.h)) {
      node.h = defaults.h;
    }

    if (node.maxW) {
      node.w = Math.min(node.w, node.maxW);
    }
    if (node.maxH) {
      node.h = Math.min(node.h, node.maxH);
    }
    if (node.minW) {
      node.w = Math.max(node.w, node.minW);
    }
    if (node.minH) {
      node.h = Math.max(node.h, node.minH);
    }

    if (node.w > this.column) {
      node.w = this.column;
    } else if (node.w < 1) {
      node.w = 1;
    }

    if (this.maxRow && node.h > this.maxRow) {
      node.h = this.maxRow;
    } else if (node.h < 1) {
      node.h = 1;
    }

    if (node.x < 0) {
      node.x = 0;
    }
    if (node.y < 0) {
      node.y = 0;
    }

    if (node.x + node.w > this.column) {
      if (resizing) {
        node.w = this.column - node.x;
      } else {
        node.x = this.column - node.w;
      }
    }
    if (this.maxRow && node.y + node.h > this.maxRow) {
      if (resizing) {
        node.h = this.maxRow - node.y;
      } else {
        node.y = this.maxRow - node.h;
      }
    }

    return node;
  }

  /**
   * 获取脏节点数组
   * @param verify 是否需要校验
   * @returns
   */
  public getDirtyNodes(verify?: boolean): IGridNode[] {
    // 比较原始 X、Y、W、H（整个节点），因为 _dirty 可能是一个临时状态
    if (verify) {
      let dirtNodes: IGridNode[] = [];
      this.nodes.forEach((n) => {
        if (n._dirty) {
          if (n.y === n._origY && n.x === n._origX && n.w === n._origW && n.h === n._origH) {
            delete n._dirty;
          } else {
            dirtNodes.push(n);
          }
        }
      });
      return dirtNodes;
    }

    return this.nodes.filter((n) => n._dirty);
  }

  /**
   * 清洗节点数组，去除节点的 _dirty 标识
   */
  public cleanNodes(): GridLayoutEngine {
    if (this.batchMode) {
      return this;
    }
    this.nodes.forEach((n) => {
      delete n._dirty;
    });
    return this;
  }

  /**
   * 添加一个节点
   * @param node 新节点
   * @param triggerAddEvent 是否触发添加事件
   * @returns
   */
  public addNode(node: IGridNode, triggerAddEvent = false): IGridNode {
    node = this.prepareNode(node);

    node.id = node.id || `rdl-${GridLayoutEngine._idSeq++}`;

    if (node.autoPosition) {
      this._sortNodes();

      for (let i = 0; ; ++i) {
        let x = i % this.column;
        let y = Math.floor(i / this.column);
        if (x + node.w > this.column) {
          continue;
        }
        let box: IGridNode = { id: TEMP_ID, x, y, w: node.w, h: node.h };
        if (!this.nodes.find((n) => GridLayoutEngine.isCollisions(box, n), { x, y, node })) {
          node.x = x;
          node.y = y;
          delete node.autoPosition; // found our slot
          break;
        }
      }
    }

    this.nodes.push(node);
    if (triggerAddEvent) {
      this.addedNodes.push(node);
    }

    this._fixCollisions(node);
    this._packNodes();
    return node;
  }

  public removeNode(node: IGridNode, removeDOM = true, triggerEvent = false): GridLayoutEngine {
    if (triggerEvent) {
      // we wait until final drop to manually track removed items (rather than during drag)
      this.removedNodes.push(node);
    }
    node.id = EMPTY_ID; // hint that node is being removed
    // TODO: .splice(findIndex(),1) would be faster but apparently there are cases we have 2 instances !
    // (see spec 'load add new, delete others')
    // this.nodes = this.nodes.filter(n => n !== node);
    this.nodes.splice(
      this.nodes.findIndex((n) => n === node),
      1,
    );
    if (!this.float) {
      this._packNodes();
    }
    // this._notify(node, removeDOM);
    return this;
  }

  public removeAll(removeDOM = true): GridLayoutEngine {
    delete this._layouts;
    if (this.nodes.length === 0) {
      return this;
    }
    if (removeDOM) {
      this.nodes.forEach((n) => {
        n.id = EMPTY_ID;
      }); // hint that node is being removed
    }
    this.removedNodes = this.nodes;
    this.nodes = [];
    // this._notify(this.removedNodes, removeDOM);
    return this;
  }

  public canMoveNode(node: IGridNode, x: number, y: number, width: number, height: number): boolean {
    if (!this.isNodeChangedPosition(node, x, y, width, height)) {
      return false;
    }
    let hasLocked = Boolean(this.nodes.find((n) => n.static));

    if (!this.maxRow && !hasLocked) {
      return true;
    }

    let clonedNode: IGridNode | null = null;
    let clone = new GridLayoutEngine(
      this.nodes.map((n) => {
        if (n === node) {
          clonedNode = Utils.cloneNode(n);
          return clonedNode;
        }
        return Utils.cloneNode(n);
      }),
      this.column,
      0,
      this.float,
    );

    if (!clonedNode) {
      return true;
    }

    clone.moveNode(clonedNode, x, y, width, height);

    let canMove = true;
    if (hasLocked) {
      canMove =
        canMove &&
        !clone.nodes.find((n) => {
          return n !== clonedNode && Boolean(n.static) && Boolean(n._dirty);
        });
    }
    if (this.maxRow) {
      canMove = canMove && clone.getRow() <= this.maxRow;
    }

    return canMove;
  }

  /**
   * 判断是否可按高度放置
   * @param node 需放置的节点
   * @returns {boolean}
   */
  public canBePlacedWithRespectToHeight(node: IGridNode): boolean {
    if (!this.maxRow) {
      return true;
    }

    let clone = new GridLayoutEngine(
      this.nodes.map((n) => Utils.cloneNode(n)),
      this.column,
      0,
      this.float,
    );
    clone.addNode(node);
    return clone.getRow() <= this.maxRow;
  }

  /**
   * 判断节点时候改变了位置
   */
  public isNodeChangedPosition(node: IGridNode, x: number, y: number, width: number, height: number): boolean {
    if (typeof x !== 'number') {
      x = node.x;
    }
    if (typeof y !== 'number') {
      y = node.y;
    }
    if (typeof width !== 'number') {
      width = node.w;
    }
    if (typeof height !== 'number') {
      height = node.h;
    }

    if (node.maxW) {
      width = Math.min(width, node.maxW);
    }
    if (node.maxH) {
      height = Math.min(height, node.maxH);
    }
    if (node.minW) {
      width = Math.max(width, node.minW);
    }
    if (node.minH) {
      height = Math.max(height, node.minH);
    }

    if (node.x === x && node.y === y && node.w === width && node.h === height) {
      return false;
    }
    return true;
  }

  public moveNode(
    node: IGridNode,
    x: number,
    y: number,
    width?: number,
    height?: number,
    noPack?: boolean,
  ): IGridNode | null {
    console.log('moveNode ~ beginUpadte', this.nodes);
    if (node.static) {
      return null;
    }
    if (typeof x !== 'number') {
      x = node.x;
    }
    if (typeof y !== 'number') {
      y = node.y;
    }
    if (typeof width !== 'number') {
      width = node.w;
    }
    if (typeof height !== 'number') {
      height = node.h;
    }

    // constrain the passed in values and check if we're still changing our node
    let resizing = node.w !== width || node.h !== height;
    let nn: IGridNode = {
      id: TEMP_ID,
      x,
      y,
      w: width,
      h: height,
      maxW: node.maxW,
      maxH: node.maxH,
      minW: node.minW,
      minH: node.minH,
    };
    nn = this.prepareNode(nn, resizing);
    if (node.x === nn.x && node.y === nn.y && node.w === nn.w && node.h === nn.h) {
      return null;
    }

    node._dirty = true;

    node.x = node._lastTriedX = nn.x;
    node.y = node._lastTriedY = nn.y;
    node.w = node._lastTriedWidth = nn.w;
    node.h = node._lastTriedHeight = nn.h;

    this._fixCollisions(node);
    if (!noPack) {
      this._packNodes();
    }
    return node;
  }

  public getRow(): number {
    return this.nodes.reduce((memo, n) => Math.max(memo, n.y + n.h), 0);
  }

  public beginUpdate(node: IGridNode): GridLayoutEngine {
    console.log('engine ~ beginUpadte', this.nodes);
    if (node._updating) return this;
    node._updating = true;
    this.nodes.forEach((n) => {
      n._packY = n.y;
    });
    return this;
  }

  public endUpdate(): GridLayoutEngine {
    console.log('engine ~ endUpadte', this.nodes);
    let n = this.nodes.find((n) => n._updating);
    if (n) {
      delete n._updating;
      this.nodes.forEach((n) => {
        delete n._packY;
      });
    }
    return this;
  }

  /** saves the current layout returning a list of widgets for serialization */
  public save(): IWidget[] {
    Utils.sort(this.nodes);
    console.log('engine ~ save', this.nodes);
    return this.nodes.map((n) => GridLayoutEngine.gridNode2Widget(n));
  }

  /** @internal called whenever a node is added or moved - updates the cached layouts */
  public layoutsNodesChange(nodes: IGridNode[]): GridLayoutEngine {
    if (!this._layouts || this._ignoreLayoutsNodeChange) return this;
    // remove smaller layouts - we will re-generate those on the fly... larger ones need to update
    this._layouts.forEach((layout, column) => {
      if (!layout || column === this.column) return this;
      if (column < this.column) {
        this._layouts![column] = undefined;
      } else {
        // we save the original x,y,w (h isn't cached) to see what actually changed to propagate better.
        // Note: we don't need to check against out of bound scaling/moving as
        // that will be done when using those cache values.
        nodes.forEach((node) => {
          let n = layout.find((l) => l.id === node.id);
          if (!n) return this; // no cache for new nodes. Will use those values.
          let ratio = column / this.column;
          // Y changed, push down same amount
          // TODO: detect doing item 'swaps' will help instead of move (especially in 1 column mode)
          if (node.y !== node._origY && node._origY !== undefined) {
            n.y += node.y - node._origY;
          }
          // X changed, scale from new position
          if (node.x !== node._origX) {
            n.x = Math.round(node.x * ratio);
          }
          // width changed, scale from new width
          if (node.w !== node._origW) {
            n.w = Math.round(node.w * ratio);
          }
          // ...height always carries over from cache
        });
      }
    });
    return this;
  }

  /**
   * @internal Called to scale the widget width & position up/down based on the column change.
   * Note we store previous layouts (especially original ones) to make it possible to go
   * from say 12 -> 1 -> 12 and get back to where we were.
   *
   * @param oldColumn previous number of columns
   * @param column  new column number
   * @param nodes different sorted list (ex: DOM order) instead of current list
   */
  public updateNodeWidths(oldColumn: number, column: number, nodes: IGridNode[]): GridLayoutEngine {
    if (!this.nodes.length || oldColumn === column) {
      return this;
    }

    // cache the current layout in case they want to go back (like 12 -> 1 -> 12) as it requires original data
    let copy: Layout[] = [];
    this.nodes.forEach((n, i) => {
      copy[i] = { x: n.x, y: n.y, w: n.w, id: n.id };
    }); // only thing we change is x,y,w and id to find it back
    this._layouts = this._layouts || []; // use array to find larger quick
    this._layouts[oldColumn] = copy;

    // if we're going to 1 column and using DOM order rather than default sorting, then generate that layout
    if (column === 1 && nodes && nodes.length) {
      let top = 0;
      nodes.forEach((n) => {
        n.x = 0;
        n.w = 1;
        n.y = Math.max(n.y, top);
        top = n.y + n.h;
      });
    } else {
      // current column reverse sorting so we can insert last to front (limit collision)
      nodes = Utils.sort(this.nodes, -1, oldColumn);
    }

    // see if we have cached previous layout.
    let cacheNodes = this._layouts[column] || [];
    // if not AND we are going up in size start with the largest layout as down-scaling is more accurate
    let lastIndex = this._layouts.length - 1;
    if (cacheNodes.length === 0 && column > oldColumn && column < lastIndex) {
      cacheNodes = this._layouts[lastIndex] || [];
      if (cacheNodes.length) {
        // pretend we came from that larger column by assigning those values as starting point
        oldColumn = lastIndex;
        cacheNodes.forEach((cacheNode) => {
          let j = nodes.findIndex((n) => n.id === cacheNode.id);
          if (j !== -1) {
            // still current, use cache info positions
            nodes[j].x = cacheNode.x;
            nodes[j].y = cacheNode.y;
            nodes[j].w = cacheNode.w;
          }
        });
        cacheNodes = []; // we still don't have new column cached data... will generate from larger one.
      }
    }

    // if we found cache re-use those nodes that are still current
    let newNodes: IGridNode[] = [];
    cacheNodes.forEach((cacheNode) => {
      let j = nodes.findIndex((n) => n && n.id === cacheNode.id);
      if (j !== -1) {
        // still current, use cache info positions
        nodes[j].x = cacheNode.x;
        nodes[j].y = cacheNode.y;
        nodes[j].w = cacheNode.w;
        newNodes.push(nodes[j]);
        nodes[j] = EMPTY_NODE; // erase it so we know what's left
      }
    });
    // ...and add any extra non-cached ones
    let ratio = column / oldColumn;
    nodes.forEach((node) => {
      if (node === EMPTY_NODE) return this;
      node.x = column === 1 ? 0 : Math.round(node.x * ratio);
      node.w = column === 1 || oldColumn === 1 ? 1 : Math.round(node.w * ratio) || 1;
      newNodes.push(node);
    });

    // finally re-layout them in reverse order (to get correct placement)
    newNodes = Utils.sort(newNodes, -1, column);
    this._ignoreLayoutsNodeChange = true;
    this.batchUpdate();
    this.nodes = []; // pretend we have no nodes to start with (we use same structures) to simplify layout
    newNodes.forEach((node) => {
      this.addNode(node, false); // 'false' for add event trigger
      node._dirty = true; // force attr update
    }, this);
    this.commit();
    delete this._ignoreLayoutsNodeChange;
    return this;
  }

  /** @internal called to save initial position/size */
  public saveInitial(): GridLayoutEngine {
    console.log('engine ~ initial');
    this.nodes.forEach((n) => {
      n._origX = n.x;
      n._origY = n.y;
      n._origW = n.w;
      n._origH = n.h;
      delete n._dirty;
    });
    return this;
  }

  /** @internal */
  private _fixCollisions(node: IGridNode): GridLayoutEngine {
    this._sortNodes(-1);

    let nn = node;
    let hasLocked = Boolean(this.nodes.find((n) => n.static));
    if (!this.float && !hasLocked) {
      nn = { id: TEMP_ID, x: 0, y: node.y, w: this.column, h: node.h };
    }
    while (true) {
      let collisionNode = this.nodes.find((n) => n !== node && GridLayoutEngine.isCollisions(n, nn), {
        node: node,
        nn: nn,
      });
      if (!collisionNode) {
        return this;
      }
      let moved;
      if (collisionNode.static) {
        // if colliding with a locked item, move ourself instead
        moved = this.moveNode(node, node.x, collisionNode.y + collisionNode.h, node.w, node.h, true);
      } else {
        moved = this.moveNode(collisionNode, collisionNode.x, node.y + node.h, collisionNode.w, collisionNode.h, true);
      }
      if (!moved) {
        return this;
      } // break inf loop if we couldn't move after all (ex: maxRow, fixed)
    }
  }

  private _sortNodes(dir?: -1 | 1): GridLayoutEngine {
    this.nodes = Utils.sort(this.nodes, dir);
    return this;
  }

  /** @internal */
  private _packNodes(): GridLayoutEngine {
    this._sortNodes();

    if (this.float) {
      this.nodes.forEach((n, i) => {
        if (n._updating || n._packY === undefined || n.y === n._packY) {
          return this;
        }
        let newY = n.y;
        while (newY >= n._packY) {
          let box: IGridNode = { id: TEMP_ID, x: n.x, y: newY, w: n.w, h: n.h };
          let collisionNode = this.nodes
            .slice(0, i)
            .find((bn) => GridLayoutEngine.isCollisions(box, bn), { n: n, newY: newY });
          if (!collisionNode) {
            n._dirty = true;
            n.y = newY;
          }
          --newY;
        }
      });
    } else {
      this.nodes.forEach((n, i) => {
        if (n.static) {
          return this;
        }
        while (n.y > 0) {
          let newY = n.y - 1;
          let canBeMoved = i === 0;
          let box: IGridNode = { id: TEMP_ID, x: n.x, y: newY, w: n.w, h: n.h };
          if (i > 0) {
            let collisionNode = this.nodes
              .slice(0, i)
              .find((bn) => GridLayoutEngine.isCollisions(box, bn), { n: n, newY: newY });
            canBeMoved = collisionNode === undefined;
          }

          if (!canBeMoved) {
            break;
          }
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

  static isCollisions(a: IGridNode, b: IGridNode): boolean {
    if (a.id === b.id) return false;
    return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
  }
}
