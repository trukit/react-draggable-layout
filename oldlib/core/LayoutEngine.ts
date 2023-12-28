import type { Layout, CompactType } from '../types';

export default class LayoutEngine {
  /**
   * 检查布局块是否在容器内，返回符合要求的布局块坐标数组
   * @param x 布局块的x坐标
   * @param y 布局块的y坐标
   * @param col 容器的总列数
   * @param w 布局块的宽度
   * @returns
   */
  public static checkInContainer(x: number, y: number, col: number, w: number): [number, number] {
    if (x + w > col - 1) x = col - w;
    if (x <= 0) x = 0;
    if (y <= 0) y = 0;
    return [x, y];
  }

  /**
   * 克隆布局数组
   * @param layouts 布局数组
   * @returns
   */
  public static cloneLayoutList(layouts: Layout[]): Layout[] {
    return JSON.parse(JSON.stringify(layouts));
  }

  /**
   * 移动元素
   * @param layouts 布局数组
   * @param l 移动项
   * @param compactType 压缩方向
   * @param x 目标位置x
   * @param y 目标位置y
   * @param isUserAction 是否由用户触发
   * @param preventCollision 是否阻止碰撞
   * @param cols 容器下总的列数
   * @param allowOverlap 是否允许重叠，默认 false
   * @returns
   */
  public moveElement(
    layouts: Layout[],
    l: Layout,
    compactType: CompactType,
    x?: number,
    y?: number,
    isUserAction?: boolean,
    preventCollision?: boolean,
    cols?: number,
    allowOverlap: boolean = false,
  ): Layout[] {
    if (l.static && l.isDraggable !== true) return layouts;
    if (l.y === y && l.x === x) return layouts;

    console.log(`移动【${l.id}】从 [${String(x)},${String(y)}] 到 [${l.x},${l.y}]`);
    const oldX = l.x;
    const oldY = l.y;

    if (typeof x === 'number') l.x = x;
    if (typeof y === 'number') l.y = y;
    l.moved = true;

    // 对数据进行排序，以便在多次碰撞的情况下，得到最近的碰撞布局块
    let sorted = this._sortLayoutItem(layouts, compactType);
    let movingUp;
    if (compactType === 'vertical' && typeof y === 'number') {
      movingUp = oldY >= y;
    } else if (compactType === 'horizontal' && typeof x === 'number') {
      movingUp = oldX >= x;
    } else {
      movingUp = false;
    }
    if (movingUp) sorted = sorted.reverse();

    const collisions = this._getAllCollisions(sorted, l);
    const hasCollisions = collisions.length > 0;

    if (hasCollisions && allowOverlap) {
      return LayoutEngine.cloneLayoutList(layouts);
    } else if (hasCollisions && preventCollision) {
      l.x = oldX;
      l.y = oldY;
      l.moved = false;
      return layouts;
    }

    let newLayouts = layouts;
    for (let i = 0, len = collisions.length; i < len; i++) {
      const collision = collisions[i];
      console.log(`解决 【${l.id}】- (${l.x},${l.y}) 和 【${collision.id}】- (${collision.x},${collision.y}) 碰撞`);
      if (collision.moved) continue;
      if (collision.static) {
        // 碰撞到的布局块是静态的，移动当前块
        newLayouts = this._moveElementAwayFromCollision(layouts, collision, l, compactType, isUserAction, cols);
      } else {
        // 否则，移动碰撞块
        newLayouts = this._moveElementAwayFromCollision(layouts, l, collision, compactType, isUserAction, cols);
      }
    }
    return newLayouts;
  }

  /**
   * 压缩布局数组，
   * @param layouts 布局数组
   * @param cols 容器列数
   * @param compactType 压缩方向
   * @param allowOverlap 是否可重叠
   * @returns
   */
  public compactLayout(
    layouts: Layout[],
    cols: number,
    compactType: CompactType,
    allowOverlap: boolean = false,
  ): Layout[] {
    const compareWith = this._getStatics(layouts);
    const sorted = this._sortLayoutItem(layouts, compactType);
    const newLayoutList = Array(layouts.length);

    for (let i = 0, len = sorted.length; i < len; i++) {
      let l = { ...sorted[i] };
      if (!l.static) {
        l = this._compactItem(compareWith, l, cols, sorted, compactType, allowOverlap);
        compareWith.push(l);
      }
      l.moved = false;
      newLayoutList[layouts.indexOf(sorted[i])] = l;
    }
    return newLayoutList;
  }

  /**
   * 判断两个布局块是否碰撞
   */
  protected _isCollision(a: Layout, b: Layout): boolean {
    if (a.id === b.id) return false;
    return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
  }

  /** 获取 layout 数组中第一个跟当前项碰撞的布局块 */
  protected _getFirstCollison(layouts: Layout[], item: Layout): Layout | null {
    for (const ly of layouts) {
      if (this._isCollision(ly, item)) {
        return ly;
      }
    }
    return null;
  }

  protected _getAllCollisions(layouts: Layout[], item: Layout): Layout[] {
    return layouts.filter((ly) => this._isCollision(ly, item));
  }

  /**
   * 压缩单个布局块，使得每一个布局块都会紧挨边界或相邻的布局块
   * @param finishedLayouts 压缩后的布局数组，用来对比之后的每一个布局块是否需要压缩
   * @param item 需要判断是否压缩的布局块
   * @returns
   */
  protected _compactItem(
    compareWith: Layout[],
    l: Layout,
    cols: number,
    fullLayout: Layout[],
    compactType: CompactType,
    allowOverlap: boolean = false,
  ): Layout {
    const isCompactH = compactType === 'horizontal';
    const isCompactV = compactType === 'vertical';
    if (isCompactV) {
      l.y = Math.min(this._bottom(compareWith), l.y);
      while (l.y > 0 && !this._getFirstCollison(compareWith, l)) {
        l.y--;
      }
    } else if (isCompactH) {
      while (l.x > 0 && !this._getFirstCollison(compareWith, l)) {
        l.x--;
      }
    }

    let collides;
    while ((collides = this._getFirstCollison(compareWith, l)) && !(compactType === null && allowOverlap)) {
      if (isCompactH) {
        this._resolveCompactionCollision(fullLayout, l, collides.x + collides.w, 'x');
      } else {
        this._resolveCompactionCollision(fullLayout, l, collides.y + collides.h, 'y');
      }
      if (isCompactH && l.x + l.w > cols) {
        l.x = cols - l.w;
        l.y++;
        while (l.x > 0 && !this._getFirstCollison(compareWith, l)) {
          l.x--;
        }
      }
    }

    l.y = Math.max(0, l.y);
    l.x = Math.max(0, l.x);
    return l;
  }

  /**
   * 给定一个碰撞，向上有空间时，将布局块尝试向上移动，否则向下移动
   * @param layouts 需要更改的布局数组
   * @param collidesWith 布局数组中正在碰撞的布局块
   * @param itemToMove 正在移动的布局块
   * @param compactType 压缩方向
   * @param isUserAction 是否用户操作触发
   * @param cols 容器内的列数
   * @returns
   */
  protected _moveElementAwayFromCollision(
    layouts: Layout[],
    collidesWith: Layout,
    itemToMove: Layout,
    compactType: CompactType,
    isUserAction?: boolean,
    cols?: number,
  ): Layout[] {
    const compactH = compactType === 'horizontal';
    const compactV = compactType === 'vertical';
    const preventCollision = collidesWith.static;

    if (isUserAction) {
      isUserAction = false;
      const fakeItem: Layout = {
        x: compactH ? Math.max(collidesWith.x - itemToMove.w, 0) : itemToMove.x,
        y: compactV ? Math.max(collidesWith.y - itemToMove.h, 0) : itemToMove.y,
        w: itemToMove.w,
        h: itemToMove.h,
        id: 'rdl_mock_item',
      };

      const firstCollision = this._getFirstCollison(layouts, fakeItem);
      const collisionNorth = firstCollision && firstCollision.y + firstCollision.h > collidesWith.y;
      const collisionWest = firstCollision && collidesWith.x + collidesWith.w > firstCollision.x;
      if (!firstCollision) {
        return this.moveElement(
          layouts,
          itemToMove,
          compactType,
          compactH ? fakeItem.x : undefined,
          compactV ? fakeItem.y : undefined,
          isUserAction,
          preventCollision,
          cols,
        );
      } else if (collisionNorth && compactV) {
        return this.moveElement(
          layouts,
          itemToMove,
          compactType,
          undefined,
          collidesWith.y + 1,
          isUserAction,
          preventCollision,
          cols,
        );
      } else if (collisionNorth && compactType === null) {
        collidesWith.y = itemToMove.y;
        itemToMove.y = itemToMove.y + itemToMove.h;

        return layouts;
      } else if (collisionWest && compactH) {
        return this.moveElement(
          layouts,
          collidesWith,
          compactType,
          itemToMove.x,
          undefined,
          isUserAction,
          preventCollision,
          cols,
        );
      }
    }

    const newX = compactH ? itemToMove.x + 1 : undefined;
    const newY = compactV ? itemToMove.y + 1 : undefined;
    if (newX === undefined && newY == undefined) {
      return layouts;
    }
    return this.moveElement(
      layouts,
      itemToMove,
      compactType,
      compactH ? itemToMove.x + 1 : undefined,
      compactV ? itemToMove.y + 1 : undefined,
      isUserAction,
      preventCollision,
      cols,
    );
  }

  /**
   * 在向下移动项目之前，检查移动项目是否会导致碰撞，然后再向下移动
   * @param layouts 布局数组
   * @param item 当前项
   * @param moveToCoord 移动到坐标
   * @param axis 方向
   */
  protected _resolveCompactionCollision(layouts: Layout[], item: Layout, moveToCoord: number, axis: 'x' | 'y'): void {
    const sizeProp = axis === 'x' ? 'w' : 'h';
    item[axis] += 1;
    const itemIndex = layouts.findIndex((ly) => ly.id === item.id);
    for (let i = itemIndex + 1; i < layouts.length; i++) {
      const other = layouts[i];
      if (other.static) continue;
      if (other.y > item.y + item.h) break;
      if (this._isCollision(item, other)) {
        this._resolveCompactionCollision(layouts, other, moveToCoord + item[sizeProp], axis);
      }
    }
    item[axis] = moveToCoord;
  }

  protected _sortLayoutItem(layouts: Layout[], compactType: CompactType): Layout[] {
    if (compactType === 'horizontal') return this._sortLayoutItemsByColRow(layouts);
    if (compactType === 'vertical') return this._sortLayoutItemsByRowCol(layouts);
    return layouts;
  }

  protected _sortLayoutItemsByColRow(layouts: Layout[]): Layout[] {
    return layouts.slice(0).sort((a, b) => {
      if (a.x > b.x || (a.x === b.x && a.y > b.y)) {
        return 1;
      }
      return -1;
    });
  }

  protected _sortLayoutItemsByRowCol(layouts: Layout[]): Layout[] {
    return layouts.slice(0).sort((a, b) => {
      if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
        return 1;
      } else if (a.y === b.y && a.x === b.x) {
        // Without this, we can get different sort results in IE vs. Chrome/FF
        return 0;
      }
      return -1;
    });
  }

  protected _bottom(layouts: Layout[]): number {
    let bottom = 0;
    layouts.forEach((layout) => {
      bottom = Math.max(bottom, layout.y + layout.h);
    });
    return bottom;
  }

  protected _getStatics(layouts: Layout[]): Layout[] {
    return layouts.filter((ly) => ly.static);
  }
}
