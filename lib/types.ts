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
  /** 为 true，优先级高于 isDraggable 和 isResizeable，不能拖拽和改变大小 */
  static?: boolean;
  isDraggable?: boolean;
  isResizeable?: boolean;
  /** 正在拖拽或 resize */
  _actioning?: boolean;
  _skipDown?: boolean;
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
