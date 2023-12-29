import type { IWidget } from './types';

export class LayoutEngine {
  widgets: IWidget[];
  maxRow: number;

  constructor(widgets: IWidget[]) {
    this.widgets = widgets;
    this.maxRow = this._getMaxRow(widgets);
  }

  /**
   * 有更新的时候
   * @returns 布局数组
   */
  public batchUpdate(widgets: IWidget[]): IWidget[] {
    this.widgets = widgets;
    return this.widgets;
  }

  protected _moveWidget() {}

  /**
   * 获取容器的最大行数
   * @param widgets 布局组件数组
   * @returns
   */
  protected _getMaxRow(widgets: IWidget[]): number {
    let max = 0;
    widgets.forEach((w) => {
      max = Math.max(max, w.y + w.h);
    });
    return max;
  }

  protected _getStaticWidgets(widgets: IWidget[]): IWidget[] {
    return widgets.filter((w) => w.static);
  }

  protected _isCollisions(a: IWidget, b: IWidget): boolean {
    if (a.id === b.id) return false;
    return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
  }
}
