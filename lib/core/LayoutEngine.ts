import { Layout, LayoutPosition, LayoutMap } from '../types';

interface LayoutNode extends Layout {
  _dirty?: boolean;
  _updating?: boolean;
  /** @internal original values before a drag/size */
  _orig?: Layout;
  _lastTried?: LayoutPosition;
  _willFitPos?: LayoutPosition;
}

interface LayoutEngineOptions {
  cellWidth?: number;
  cellHeight?: number;
  float?: boolean;
  layoutList?: Layout[];
  onChange?: (layoutList: Layout[]) => void;
}

export default class LayoutEngine {
  public cellWidth: number = 0;
  public cellHeight: number = 0;
  public nodes: LayoutNode[] = [];
  public layouts: Layout[] = [];
  public batchMode: boolean = false;

  protected _float: boolean = false;
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

  public static sortLayoutList(layoutList: Layout[]): Layout[] {
    return [...layoutList].sort((a: Layout, b: Layout) => {
      if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
        if (a.static) return 0; // 为了静态，排序的时候尽量把静态的放在前面
        return 1;
      } else if (a.y === b.y && a.x === b.x) {
        return 0;
      }
      return -1;
    });
  }

  /**
   * 在宽度断点发生的时候外部调用，用来更新内置的数据
   * @param opts
   */
  public initOptions(opts: LayoutEngineOptions) {
    this.cellHeight = opts.cellHeight ?? this.cellHeight;
    this.cellWidth = opts.cellWidth ?? this.cellWidth;
    this._float = opts.float ?? this._float;
    this.layouts = opts.layoutList ? JSON.parse(JSON.stringify(opts.layoutList)) : [];
    this.onChange = opts.onChange ?? this.onChange;
  }

  protected _isCollision(a: Layout, b: Layout): boolean {
    return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
  }

  protected _getFirstCollison(layouts: Layout[], item: Layout): Layout | null {
    for (const layout of layouts) {
      if (this._isCollision(layout, item)) {
        return layout;
      }
    }
    return null;
  }

  public checkLayout(layouts: Layout[], curLayout: Layout, id: string, firstItemId: string, moving: number): Layout[] {
    if (
      this._checklayoutCaches &&
      this._checklayoutCaches.x === curLayout.x &&
      this._checklayoutCaches.y === curLayout.y &&
      this._checklayoutCaches.w === curLayout.w &&
      this._checklayoutCaches.h === curLayout.h
    ) {
      return layouts;
    }
    this._checklayoutCaches = { ...curLayout };
    const ids: string[] = [];
    const movedItems: Layout[] = [];
    let newLayouts = layouts.map((item) => {
      if (item.id !== id) {
        if (item.static) {
          return item;
        }
        if (this._isCollision(item, curLayout)) {
          ids.push(item.id);
          let offsetY = item.y + 1;
          /** 这一行也非常关键，当向上移动的时候，碰撞的元素必须固定 */
          // if (moving < 0 && layoutItem.GridY > 0) offsetY = item.GridY
          if (curLayout.y > item.y && curLayout.y < item.y + item.h) {
            offsetY = item.y;
          }
          const newItem: Layout = { ...item, y: offsetY, moved: true };
          movedItems.push(newItem);
          return newItem;
        }
      } else if (firstItemId === id) {
        return { ...item, ...curLayout };
      }
      return item;
    });
    const { length } = movedItems;
    for (let c = 0; c < length; c++) {
      newLayouts = this.checkLayout(newLayouts, movedItems[c], ids[c], firstItemId, 0);
    }
    return newLayouts;
  }

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

  public compactLayout(
    layouts: Layout[],
    movingItem?: Layout,
    mapedLayout?: LayoutMap,
  ): {
    compacted: Layout[];
    mapLayout?: LayoutMap;
  } {
    if (movingItem) {
      if (
        this._compactLayoutCaches &&
        this._compactLayoutCaches.x === movingItem.x &&
        this._compactLayoutCaches.y === movingItem.y &&
        this._compactLayoutCaches.w === movingItem.w &&
        this._compactLayoutCaches.h === movingItem.h &&
        this._compactLayoutCaches.id === movingItem.id
      ) {
        return {
          compacted: layouts,
          mapLayout: mapedLayout,
        };
      }
      this._compactLayoutCaches = movingItem;
    }
    const sorted = LayoutEngine.sortLayoutList(layouts);
    const needCompactList = Array(layouts.length);
    const compareList: Layout[] = [];
    const mapLayout: LayoutMap = {};
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
      mapLayout[finished.id] = finished;
    }
    return {
      compacted: needCompactList,
      mapLayout,
    };
  }
}
