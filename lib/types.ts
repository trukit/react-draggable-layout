/** 屏幕宽度适配断点 */
export interface BreakPoints {
  [K: string]: number;
}

export interface LayoutPosition {
  /** 网格单位中，x的位置，例如网格 cols 为 12 份，其在第二份位置，则为 2 */
  x: number;
  /** 网格单位中，y的位置 */
  y: number;
  /** 网格单位中，布局组件宽度 */
  w: number;
  /** 网格单位中，布局组件高度 */
  h: number;
}

export interface Layout extends LayoutPosition {
  /** 每个布局组件的唯一key，不要重复 */
  id: string;
  /** 布局组件，最小的网格单位宽度 */
  minW?: number;
  /** 布局组件，最大的网格单位宽度 */
  maxW?: number;
  /** 布局组件，最小网格单位高度 */
  minH?: number;
  /** 布局组件，最大网格单位高度 */
  maxH?: number;
  /**
   * 是否正在移动，由 drag 或 resize 触发
   */
  moving?: boolean;
  /** 是否移动过 */
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
}

export interface LayoutMap {
  [key: string]: Layout;
}

export type Cols = Record<keyof BreakPoints, number>;

export type Layouts = Record<keyof BreakPoints, Layout[]>;

export interface Size {
  width: number;
  height: number;
}

export interface Position {
  top: number;
  left: number;
}

export interface DragUI {
  position?: Position;
  size?: Size;
  draggable?: HTMLElement;
}
