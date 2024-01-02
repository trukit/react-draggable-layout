export interface ILayoutData {
  rows: number;
  cols: number;
  /** 布局框架像素宽度 */
  width: number;
  /** 布局框架像素高度 */
  height: number;
  rowHeight: number;
  colWidth: number;
  /** 布局框架像素距离，[x, y] */
  gap?: [number, number];
}

export interface IWidgetPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface IWidget extends IWidgetPosition {
  id: string;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  /** 为 true，不能拖拽和改变大小 */
  static?: boolean;
  /** 为 true，不能拖拽 */
  noDrag?: boolean;
  /** 为 true，不能缩放 */
  noResize?: boolean;
  autoPosition?: boolean;
}

export interface IGridNode extends IWidget {
  _dirty?: boolean;
  _updating?: boolean;
  _origX?: number;
  _origY?: number;
  _packY?: number;
  _origW?: number;
  _origH?: number;
  _lastTriedX?: number;
  _lastTriedY?: number;
  _lastTriedWidth?: number;
  _lastTriedHeight?: number;
}

export interface ISize {
  width: number;
  height: number;
}

export interface IBoxPosition {
  top: number;
  left: number;
}

export interface IActionOffset {
  top: number;
  left: number;
  offsetTop: number;
  offsetLeft: number;
  width: number;
  height: number;
  layoutLeft: number;
  layoutTop: number;
}
