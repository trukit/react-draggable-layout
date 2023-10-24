/** 屏幕宽度适配断点 */
export interface BreakPoints {
  [K: string]: number;
}

export interface Layout {
  /** 每个布局组件的唯一key，不要重复 */
  key: string;
  /** 网格单位中，x的位置，例如网格 cols 为 12 份，其在第二份位置，则为 2 */
  x: number;
  /** 网格单位中，y的位置 */
  y: number;
  /** 网格单位中，布局组件宽度 */
  w: number;
  /** 网格单位中，布局组件高度 */
  h: number;
  /** 布局组件，最小的网格单位宽度 */
  minW?: number;
  /** 布局组件，最大的网格单位宽度 */
  maxW?: number;
  /** 布局组件，最小网格单位高度 */
  minH?: number;
  /** 布局组件，最大网格单位高度 */
  maxH?: number;
  /**
   * 由 DragEvents (onDragStart, onDrag, onDragStop) 事件和 ResizeEvents (onResizeStart, onResize, onResizeStop) 事件触发后，改变其值
   */
  moved?: boolean;
  /**
   * 为 true，表示其 isDraggable: false` 和 `isResizable: false`，即不能拖拽和手动设置大小。
   */
  static?: boolean;
  /**
   * 默认 undefined。如果为 false，将不能被移动，并且会覆盖 static 的设置
   */
  isDraggable?: boolean;
  /**
   * 默认 undefined。如果为 false，将不能被改变大小，并且会覆盖 static 的设置
   */
  isResizable?: boolean;
  /**
   * 如果为 true，将只能在网格内拖拽
   */
  isBounded?: boolean;
}

export type Cols = Record<keyof BreakPoints, number>;

export type Layouts = Record<keyof BreakPoints, Layout[]>;
