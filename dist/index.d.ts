import * as React from 'react';

interface ISize {
    width: number;
    height: number;
}
interface ILayoutData {
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
interface IWidgetPosition {
    x: number;
    y: number;
    w: number;
    h: number;
}
interface IWidget extends IWidgetPosition {
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
interface IGridNode extends IWidget {
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
interface IBoxPosition {
    top: number;
    left: number;
    width: number;
    height: number;
}
interface IActionOffset {
    top: number;
    left: number;
    offsetTop: number;
    offsetLeft: number;
    width: number;
    height: number;
    layoutLeft: number;
    layoutTop: number;
}
interface IGridMoveOpts extends Partial<IWidgetPosition> {
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

interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    col: number;
    widgets: IWidget[];
    children: React.ReactNode;
    draggableHandle?: string;
    resizeableHandle?: string;
    /** [x, y] 方向上每个 widget 的边距，px 数值 */
    gap?: [number, number];
    /** 像素值传字符串例如：40px，传 number 表示为几个 col 宽度。默认为 colWidth 像素宽度 */
    rowHeight?: string | number;
    float?: boolean;
    initCompact?: boolean;
    onSizeChange?: (size: ISize) => void;
    placeholderClassName?: string;
}
declare const Layout: React.FC<ILayoutProps>;

interface IWidgetProps {
    id: string;
    children: React.ReactNode;
    className?: string;
    widget?: IWidget;
    draggableHandle?: string;
    resizeableHandle?: string;
    layoutData?: ILayoutData;
    onActionStart?: (widget: IWidget, eventType: 'drag' | 'resize') => void;
    onActionDoing?: (widget: IWidget, newBoxPos: IBoxPosition, eventType: 'drag' | 'resize', widgetEl: HTMLElement, e: MouseEvent) => void;
    onActionEnd?: (widget: IWidget, eventType: 'drag' | 'resize') => void;
}
declare const Widget: React.FC<IWidgetProps>;

interface IBreakLayoutProps extends Omit<ILayoutProps, 'col' | 'widgets' | 'gap' | 'rowHeight'> {
    breakPoints: Record<string, number>;
    breakWidgets: Record<string, IWidget[]>;
    breakCols: Record<string, number> | number;
    breakGap?: Record<string, [number, number]> | [number, number];
    breakRowHeight?: Record<string, number | string> | number | string;
}
declare const BreakLayout: React.FC<IBreakLayoutProps>;

export { BreakLayout, type IActionOffset, type IBoxPosition, type IGridMoveOpts, type IGridNode, type ILayoutData, type ISize, type IWidget, type IWidgetPosition, Layout, Widget };
