import { Layout, LayoutMap } from '../types';

interface LayoutEngineOptions {
  cellWidth?: number;
  cellHeight?: number;
  float?: boolean;
  onChange?: (layoutList: Layout[]) => void;
}

export default class LayoutEngine {
  public cellWidth: number = 0;
  public cellHeight: number = 0;
  public layouts: Layout[] = [];

  protected onChange?: (layoutList: Layout[]) => void;

  protected _checklayoutCaches?: Layout;
  protected _compactLayoutCaches?: Layout;

  constructor(opts: LayoutEngineOptions) {
    this.initOptions(opts);
  }

  public static checkInContainer(x: number, y: number, col: number, w: number): [number, number] {
    if (x + w > col - 1) x = col - w;
    if (x <= 0) x = 0;
    if (y <= 0) y = 0;
    return [x, y];
  }

  public static sortLayoutList(layoutList: Layout[], dir: 1 | -1 = 1, colCount?: number): Layout[] {
    const col = colCount || layoutList.reduce((col, n) => Math.max(n.x + n.w, col), 0) || 12;
    if (dir === -1) {
      return layoutList.sort((a, b) => (b.x ?? 1000) + (b.y ?? 1000) * col - ((a.x ?? 1000) + (a.y ?? 1000) * col));
    } else {
      return layoutList.sort((b, a) => (b.x ?? 1000) + (b.y ?? 1000) * col - ((a.x ?? 1000) + (a.y ?? 1000) * col));
    }
  }

  /**
   * 在宽度断点发生的时候外部调用，更新单元格宽高数据
   * @param opts
   */
  public initOptions(opts: LayoutEngineOptions) {
    this.cellHeight = opts.cellHeight ?? this.cellHeight;
    this.cellWidth = opts.cellWidth ?? this.cellWidth;
    this.onChange = opts.onChange ?? this.onChange;
  }

  /**
   * 判断两个布局块是否碰撞
   */
  protected _isCollision(a: Layout, b: Layout): boolean {
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
   * 检查当前的布局数组，避免出现重叠块，返回解决重叠情况后的布局数组
   * @param layouts 初始布局数组
   * @param curLayout 当前检查的块
   * @param movingId 当前移动的布局块id
   * @param dir 移动方向，-1 向上，1 向下，默认向下
   * @returns
   */
  public checkLayout(layouts: Layout[], curLayout: Layout, movingId?: string, dir: 1 | -1 = 1): Layout[] {
    // if (
    //   this._checklayoutCaches &&
    //   this._checklayoutCaches.x === curLayout.x &&
    //   this._checklayoutCaches.y === curLayout.y &&
    //   this._checklayoutCaches.w === curLayout.w &&
    //   this._checklayoutCaches.h === curLayout.h &&
    //   this._checklayoutCaches.moving === curLayout.moving
    // ) {
    //   return layouts;
    // }
    // this._checklayoutCaches = { ...curLayout };
    const movedItems: Layout[] = []; // 需要被移动的布局块
    let newLayouts = layouts.map((item) => {
      if (item.id !== curLayout.id) {
        if (item.static) {
          // 静态块不动
          return item;
        }
        if (this._isCollision(item, curLayout)) {
          let offsetY = item.y + 1;
          /** 这一行也非常关键，当向上移动的时候，碰撞的元素必须固定 */
          // if (moving < 0 && curLayout.y > 0) offsetY = item.y
          if (curLayout.y > item.y && curLayout.y < item.y + item.h) {
            offsetY = item.y;
          }
          const newItem: Layout = { ...item, y: offsetY, moved: true };
          movedItems.push(newItem);
          return newItem;
        }
      } else if (movingId === curLayout.id) {
        return { ...item, ...curLayout, moving: true };
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
      newItem.y--;
      if (newItem.y < 0) return { ...newItem, y: 0 };
    }
  }

  /**
   * 压缩当前布局数组，并返回压缩后的正常布局数组，使布局块都紧挨
   * @param layouts 布局数组
   * @param movingItem 正在移动的项
   * @returns
   */
  public compactLayout(layouts: Layout[], movingItem?: Layout): Layout[] {
    // if (movingItem) {
    //   if (
    //     this._compactLayoutCaches &&
    //     this._compactLayoutCaches.x === movingItem.x &&
    //     this._compactLayoutCaches.y === movingItem.y &&
    //     this._compactLayoutCaches.w === movingItem.w &&
    //     this._compactLayoutCaches.h === movingItem.h &&
    //     this._compactLayoutCaches.id === movingItem.id &&
    //     this._compactLayoutCaches.moving === movingItem.moving
    //   ) {
    //     return layouts;
    //   }
    //   this._compactLayoutCaches = movingItem;
    // }
    const sorted = LayoutEngine.sortLayoutList(layouts);
    const needCompactList = Array(layouts.length);
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
        finished.moved = false;
      }
      compareList.push(finished);
      needCompactList[i] = finished;
    }
    console.group('needCompactList');
    console.log(JSON.stringify(needCompactList));
    console.groupEnd();
    return needCompactList;
  }
}
