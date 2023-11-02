import type { Layout } from '../types';

interface LayoutEngineOptions {
  cellWidth?: number;
  cellHeight?: number;
  float?: boolean;
}

export default class LayoutEngine {
  public cellWidth: number = 0;
  public cellHeight: number = 0;
  public layouts: Layout[] = [];

  constructor(opts: LayoutEngineOptions) {
    this.initOptions(opts);
  }

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
   * 将布局数组根据位置进行排序
   * @param layoutList 布局数组
   * @param colCount 容器列数
   * @returns
   */
  public static sortLayoutList(layoutList: Layout[], colCount?: number): Layout[] {
    const col = colCount || layoutList.reduce((col, n) => Math.max(n.x + n.w, col), 0) || 12;
    return layoutList.sort((b, a) => (b.x ?? 1000) + (b.y ?? 1000) * col - ((a.x ?? 1000) + (a.y ?? 1000) * col));
  }

  /**
   * 在宽度断点发生的时候外部调用，更新单元格宽高数据
   * @param opts
   */
  public initOptions(opts: LayoutEngineOptions) {
    this.cellHeight = opts.cellHeight ?? this.cellHeight;
    this.cellWidth = opts.cellWidth ?? this.cellWidth;
  }

  /**
   * 检查当前的布局数组，避免出现重叠块，返回解决重叠情况后的布局数组
   * @param layouts 初始布局数组
   * @param curLayout 当前检查的块
   * @param movingId 当前移动的布局块id
   * @param dir 移动方向，-1 向上，1 向下，默认向下
   * @returns
   */
  public checkLayout(layouts: Layout[], curLayout: Layout, movingId?: string): Layout[] {
    // TODO: 看下怎么做缓存优化
    const movedItems: Layout[] = []; // 需要被移动的布局块
    let newLayouts = layouts.map((item) => {
      if (item.id !== curLayout.id) {
        if (item.static) {
          // 静态块不动
          return item;
        }
        if (this._isCollision(item, curLayout)) {
          let offsetY = item.y + 1; // 当和检查的块碰撞时，向下移一个位置
          if (curLayout.y > item.y && curLayout.y < item.y + item.h) {
            offsetY = item.y;
          }
          const newItem: Layout = { ...item, y: offsetY, moved: true };
          movedItems.push(newItem);
          return newItem;
        }
      } else if (movingId === curLayout.id) {
        // 当前正在移动的块，标记 moving = true，以便不通过 useLayout 渲染
        return { ...curLayout, moving: true };
      }
      return item;
    });
    const { length } = movedItems;
    for (let i = 0; i < length; i++) {
      newLayouts = this.checkLayout(newLayouts, movedItems[i], movingId);
    }
    return newLayouts;
  }

  /**
   * 压缩当前布局数组，并返回压缩后的正常布局数组，使布局块都紧挨
   * @param layouts 布局数组
   * @param movingItem 正在拖拽或重置大小的布局块
   * @returns
   */
  public compactLayout(layouts: Layout[], movingItem?: Layout): Layout[] {
    // TODO: 看下怎么做缓存优化
    const sorted = LayoutEngine.sortLayoutList(layouts);
    console.log('排序之后，数组', JSON.stringify(sorted));
    const compactList = Array(layouts.length);
    const compareList: Layout[] = [];
    for (let i = 0; i < sorted.length; i++) {
      const finished = this._compactItem(compareList, sorted[i]);
      if (movingItem) {
        if (movingItem.id === finished.id) {
          movingItem.x = finished.x;
          movingItem.y = finished.y;
          finished.moved = true;
        } else finished.moved = false;
      } else {
        finished.moving = false;
        finished.moved = false;
      }
      compareList.push(finished);
      compactList[i] = finished;
    }
    console.group('compactList');
    console.log(JSON.stringify(compactList));
    console.groupEnd();
    return compactList;
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

  /**
   * 压缩单个布局块，使得每一个布局块都会紧挨边界或相邻的布局块
   * @param finishedLayouts 压缩后的布局数组，用来对比之后的每一个布局块是否需要压缩
   * @param item 需要判断是否压缩的布局块
   * @returns
   */
  protected _compactItem(finishedLayouts: Layout[], item: Layout): Layout {
    if (item.static) return item;
    const newItem = { ...item };
    if (finishedLayouts.length === 0) {
      return { ...newItem, y: 0 };
    }
    while (true) {
      const firstCollison = this._getFirstCollison(finishedLayouts, newItem);
      if (firstCollison) {
        newItem.y = firstCollison.y + firstCollison.h;
        return newItem;
      }
      newItem.y > 0 && newItem.y--;
      if (newItem.y === 0) return newItem;
    }
  }
}
