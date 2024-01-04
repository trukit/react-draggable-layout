export interface ISize {
  width: number;
  height: number;
}

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
  id?: string;
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
  _moving?: boolean;
  _orig?: IWidgetPosition;
  _rect?: IBoxPosition;
  _packY?: number;
  _skipDown?: boolean;
  _lastTried?: IWidgetPosition;
  _prevYPix?: number;
}

export interface IBoxPosition {
  top: number;
  left: number;
  width: number;
  height: number;
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

export interface IGridMoveOpts extends Partial<IWidgetPosition> {
  /** node to skip collision */
  skip?: IGridNode;
  /** do we pack (default true) */
  pack?: boolean;
  /** true if we are calling this recursively to prevent simple swap or coverage collision - default false */
  nested?: boolean;
  /** position in pixels of the currently dragged items (for overlap check) */
  rect?: IBoxPosition;
  /** true if we're live resizing */
  resizing?: boolean;
  /** best node (most coverage) we collied with */
  collide?: IGridNode;
  /** for collision check even if we don't move */
  forceCollide?: boolean;
}
