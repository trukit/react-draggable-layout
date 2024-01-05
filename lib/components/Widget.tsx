import * as React from 'react';
import type { IActionOffset, IBoxPosition, ILayoutData, IWidget } from '../types';
import styled from 'styled-components';
import { Manager, MouseDownIgnore, clamp, cls, getActionOffset } from '../utils';
import useWidget from '../hooks/useWidget';

const Wrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  transition: none;
  border-color: transparent;
  border-style: solid;
  transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;
  &.dragging,
  &.dragending,
  &.resizing,
  &.resizeending {
    position: fixed;
    z-index: 999;
    pointer-events: none;
    > div {
      box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.2);
      opacity: 0.8;
    }
  }
  &.dragging {
    will-change: left, top;
  }
  &.resizing {
    will-change: width, height;
  }
  &.dragending {
    will-change: left, top;
    transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;
  }
  &.resizeending {
    will-change: width, height;
    transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;
  }

  > div {
    position: relative;
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  > .default_resize {
    position: absolute;
    width: 18px;
    height: 18px;
    bottom: 8px;
    right: 8px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    color: rgba(0, 0, 0, 0.3);
    cursor: nwse-resize;
  }
  &:hover {
    > .default_resize {
      opacity: 1;
    }
  }
`;

const ResizeArrow = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>((props, ref) => (
  <svg {...props} ref={ref} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 20h4v-4m-6-2l6 6M8 4H4v4m0-4l6 6"
    />
  </svg>
));

export interface IWidgetProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  widget?: IWidget;
  draggableHandle?: string;
  resizeableHandle?: string;
  layoutData?: ILayoutData;
  onActionStart?: (widget: IWidget, eventType: 'drag' | 'resize') => void;
  onActionDoing?: (
    widget: IWidget,
    newBoxPos: IBoxPosition,
    eventType: 'drag' | 'resize',
    widgetEl: HTMLElement,
    e: MouseEvent,
  ) => void;
  onActionEnd?: (widget: IWidget, eventType: 'drag' | 'resize') => void;
}

const Widget: React.FC<IWidgetProps> = (props) => {
  const {
    id,
    children,
    className,
    widget,
    layoutData,
    draggableHandle,
    resizeableHandle,
    onActionStart,
    onActionDoing,
    onActionEnd,
  } = props;
  const widgetRef = React.useRef<HTMLDivElement>(null);
  const mouseDownEventRef = React.useRef<MouseEvent | null>(null);
  const actionOffsetRef = React.useRef<IActionOffset | null>(null);

  const calcBoxPosition = React.useCallback<() => IBoxPosition | undefined>(() => {
    if (!widgetRef.current || !actionOffsetRef.current || !layoutData || !widget) return;
    const { layoutLeft, layoutTop } = actionOffsetRef.current;
    const { left, top, width, height } = widgetRef.current.getBoundingClientRect();
    return {
      left: left - layoutLeft,
      top: top - layoutTop,
      width,
      height,
    };
  }, [layoutData, widget]);

  const actionStartRef = React.useRef<(type: 'drag' | 'resize') => void>();
  const handleActionStart = React.useCallback(
    (type: 'drag' | 'resize') => {
      if (!widget) return;
      onActionStart?.(widget, type);
    },
    [onActionStart, widget],
  );
  React.useEffect(() => {
    actionStartRef.current = handleActionStart;
  }, [handleActionStart]);

  const actionDoingRef = React.useRef<(type: 'drag' | 'resize', e: MouseEvent) => void>();
  const handleActionDoing = React.useCallback(
    (type: 'drag' | 'resize', e: MouseEvent) => {
      if (!widget || !actionOffsetRef.current || !widgetRef.current) return;
      const { layoutLeft, layoutTop } = actionOffsetRef.current;
      const widgetRect: DOMRect = widgetRef.current.getBoundingClientRect();
      const boxPos: IBoxPosition = {
        left: widgetRect.left - layoutLeft,
        top: widgetRect.top - layoutTop,
        width: widgetRect.width,
        height: widgetRect.height,
      };
      onActionDoing?.(widget, boxPos, type, widgetRef.current, e);
    },
    [onActionDoing, widget],
  );
  React.useEffect(() => {
    // console.log('handleActionDoing');
    actionDoingRef.current = handleActionDoing;
  }, [handleActionDoing]);

  const actionEndRef = React.useRef<(type: 'drag' | 'resize') => void>();
  const handleActionEnd = React.useCallback(
    (type: 'drag' | 'resize') => {
      if (!widget) return;
      onActionEnd?.(widget, type);
    },
    [onActionEnd, widget],
  );
  React.useEffect(() => {
    // console.log('handleActionEnd');
    actionEndRef.current = handleActionEnd;
  }, [handleActionEnd]);

  // ========================
  // ===== Draggable ========
  // ========================
  const dragElRef = React.useRef<HTMLElement | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [isDragEnding, setIsDragEnding] = React.useState<boolean>(false);
  const dragFollow = React.useCallback((e: MouseEvent) => {
    if (!actionOffsetRef.current || !widgetRef.current) return;
    const { offsetLeft, offsetTop } = actionOffsetRef.current;
    widgetRef.current.style.left = `${e.clientX + offsetLeft}px`;
    widgetRef.current.style.top = `${e.clientY + offsetTop}px`;
    widgetRef.current.style.transition = 'none';
  }, []);
  // 鼠标移动
  const dragMouseMove = React.useCallback(
    (e: MouseEvent) => {
      // console.log('dragMouseMove', mouseDownEventRef.current);
      const s = mouseDownEventRef.current as MouseEvent;
      if (Manager.isDragging) {
        console.log('dragging');
        dragFollow(e);
        actionDoingRef.current?.('drag', e);
      } else if (Math.abs(e.x - s.x) + Math.abs(e.y - s.y) > 3) {
        console.log('dragging start');
        Manager.isDragging = true;
        Manager.dragWidgetId = id;
        if (widgetRef.current) {
          actionOffsetRef.current = getActionOffset(
            e,
            widgetRef.current,
            widgetRef.current.parentElement as HTMLElement,
          );
        }
        widgetRef.current!.style.transition = 'none';
        widgetRef.current!.style.position = 'fixed';
        dragFollow(e);
        setIsDragging(true);
        actionStartRef.current?.('drag');
      }
    },
    [dragFollow, id],
  );
  // 鼠标抬起
  const dragMouseUp = React.useCallback(
    (e: MouseEvent) => {
      console.log('dragMouseUp');
      document.removeEventListener('mousemove', dragMouseMove);
      document.removeEventListener('mouseup', dragMouseUp);
      if (Manager.isDragging) {
        console.log('dragging end');
        Manager.isDragging = false;
        document.body.style.cursor = 'auto';
        setIsDragging(false);
        setIsDragEnding(true);
        widgetRef.current!.style.transition = '';
        widgetRef.current!.style.position = '';
        actionEndRef.current?.('drag');
      }
      mouseDownEventRef.current = null;
      Manager.dragWidgetId = '';
      Manager.mouseHandled = false;
      e.preventDefault();
    },
    [dragMouseMove],
  );
  // 鼠标按下
  const dragMouseDown = React.useCallback(
    (e: MouseEvent) => {
      console.log('dragMouseDown');
      if (Manager.mouseHandled) return;
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest(MouseDownIgnore)) return;
      mouseDownEventRef.current = e;
      document.addEventListener('mousemove', dragMouseMove);
      document.addEventListener('mouseup', dragMouseUp);
      e.preventDefault();
      if (document.activeElement) (document.activeElement as HTMLElement).blur();
      Manager.mouseHandled = true;
      document.body.style.cursor = 'grabbing';
    },
    [dragMouseMove, dragMouseUp],
  );
  // 开启拖拽
  const dragEnabledRef = React.useRef<boolean>(false);
  const enableDraggable = React.useCallback(() => {
    if (dragElRef.current) return;
    if (!draggableHandle) dragElRef.current = widgetRef.current as HTMLElement;
    if (draggableHandle && !dragElRef.current) {
      const el = (widgetRef.current as HTMLDivElement).querySelector(draggableHandle);
      dragElRef.current = el ? (el as HTMLElement) : widgetRef.current;
    }
    console.log('【enableDrag】');
    dragElRef.current?.addEventListener('mousedown', dragMouseDown);
    dragEnabledRef.current = true;
  }, [dragMouseDown, draggableHandle]);
  // 关闭拖拽
  const diableDraggable = React.useCallback(() => {
    if (!dragElRef.current) return;
    console.log('【disableDrag】');
    dragElRef.current.removeEventListener('mousedown', dragMouseDown);
    dragElRef.current = null;
    dragEnabledRef.current = false;
  }, [dragMouseDown]);
  // 判断开启和关闭的时机
  React.useEffect(() => {
    if (!layoutData?.width || !widget) return;
    if ((widget.static || widget.noDrag) && dragEnabledRef.current) {
      diableDraggable();
      return;
    }
    if (!widget.static && !widget.noDrag && !dragEnabledRef.current) {
      enableDraggable();
    }
  }, [diableDraggable, enableDraggable, layoutData, widget]);

  // ========================
  // ===== Resizeable =======
  // ========================
  const resizeElRef = React.useRef<HTMLElement | null>(null);
  const [isResizing, setIsResizing] = React.useState<boolean>(false);
  const [isResizeEnding, setIsResizeEnding] = React.useState<boolean>(false);
  const resizeFollow = React.useCallback(
    (e: MouseEvent) => {
      if (!actionOffsetRef.current || !mouseDownEventRef.current || !widgetRef.current || !layoutData) return;
      const { width, height, left, top } = actionOffsetRef.current;
      const { clientX, clientY } = mouseDownEventRef.current;
      const offsetWidth = e.clientX - clientX;
      const offsetHeight = e.clientY - clientY;
      widgetRef.current.style.left = `${left}px`;
      widgetRef.current.style.top = `${top}px`;
      // 限制大小
      const minWidth = (widget?.minW || 1) * layoutData.colWidth;
      const maxWidth = (widget?.maxW || layoutData.cols) * layoutData.colWidth;
      const minHeight = (widget?.minH || 1) * layoutData.rowHeight;
      const maxHeight = (widget?.maxH || layoutData.rows) * layoutData.rowHeight;
      const newWidth = clamp(width + offsetWidth, minWidth, maxWidth);
      const newHeight = clamp(height + offsetHeight, minHeight, maxHeight);
      widgetRef.current.style.width = `${newWidth}px`;
      widgetRef.current.style.height = `${newHeight}px`;
      widgetRef.current.style.transition = 'none';
    },
    [layoutData, widget],
  );
  const resizeMouseMove = React.useCallback(
    (e: MouseEvent) => {
      const s = mouseDownEventRef.current as MouseEvent;
      if (Manager.isReszing) {
        console.log('resizing');
        resizeFollow(e);
        actionDoingRef.current?.('resize', e);
      } else if (Math.abs(e.x - s.x) + Math.abs(e.y - s.y) > 3) {
        console.log('resize start');
        Manager.isReszing = true;
        Manager.resizeWidgetId = id;
        if (widgetRef.current) {
          actionOffsetRef.current = getActionOffset(
            e,
            widgetRef.current,
            widgetRef.current.parentElement as HTMLElement,
          );
        }
        widgetRef.current!.style.transition = 'none';
        widgetRef.current!.style.position = 'fixed';
        resizeFollow(e);
        setIsResizing(true);
        actionStartRef.current?.('resize');
      }
    },
    [id, resizeFollow],
  );
  // 鼠标抬起
  const resizeMouseUp = React.useCallback(
    (e: MouseEvent) => {
      console.log('resizeMouseUp');
      document.removeEventListener('mousemove', resizeMouseMove);
      document.removeEventListener('mouseup', resizeMouseUp);
      if (Manager.isReszing) {
        console.log('reszing end');
        Manager.isReszing = false;
        document.body.style.cursor = 'auto';
        setIsResizing(false);
        setIsResizeEnding(true);
        widgetRef.current!.style.transition = '';
        widgetRef.current!.style.position = '';
        actionEndRef.current?.('resize');
      }
      mouseDownEventRef.current = null;
      Manager.resizeWidgetId = '';
      Manager.mouseHandled = false;
      e.preventDefault();
    },
    [resizeMouseMove],
  );
  // 鼠标按下
  const resizeMouseDown = React.useCallback(
    (e: MouseEvent) => {
      console.log('resizeMouseDown');
      if (Manager.mouseHandled) return;
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest(MouseDownIgnore)) return;
      mouseDownEventRef.current = e;
      document.addEventListener('mousemove', resizeMouseMove);
      document.addEventListener('mouseup', resizeMouseUp);
      e.preventDefault();
      if (document.activeElement) (document.activeElement as HTMLElement).blur();
      Manager.mouseHandled = true;
      document.body.style.cursor = 'nwse-resize';
    },
    [resizeMouseMove, resizeMouseUp],
  );
  // 开启 resize
  const resizeEnabledRef = React.useRef<boolean>(false);
  const enableResizable = React.useCallback(() => {
    console.log('【enableResize】');
    if (!resizeElRef.current) return;
    resizeElRef.current!.addEventListener('mousedown', resizeMouseDown);
    resizeEnabledRef.current = true;
  }, [resizeMouseDown]);
  // 关闭 resize
  const disableResizable = React.useCallback(() => {
    if (!resizeElRef.current) return;
    console.log('【disableResize】');
    resizeElRef.current.removeEventListener('mousedown', resizeMouseDown);
    resizeElRef.current = null;
    resizeEnabledRef.current = false;
  }, [resizeMouseDown]);
  // 判断开启和关闭 resize 的时机
  React.useEffect(() => {
    if (!layoutData?.width || !widget) return;
    if ((widget.static || widget.noResize) && resizeEnabledRef.current) {
      disableResizable();
      return;
    }
    if (!widget.static && !widget.noResize && !resizeEnabledRef.current) {
      enableResizable();
    }
  }, [disableResizable, enableResizable, layoutData, widget]);

  // ========================
  // ======= Layout =========
  // ========================
  const isPlaceholder = React.useMemo<boolean>(() => isDragging || isResizing, [isDragging, isResizing]);
  const handleTransitionEnd = React.useCallback(() => {
    if (isDragEnding) {
      setIsDragEnding(false);
    }
    if (isResizeEnding) {
      setIsResizeEnding(false);
    }
    if (isDragEnding || isResizeEnding) {
      widgetRef.current!.style.transition = 'none';
      setTimeout(() => (widgetRef.current!.style.transition = ''), 30);
    }
  }, [isDragEnding, isResizeEnding]);
  const widgetRect = useWidget({
    widget,
    layoutData,
  });
  // layout with widget data
  React.useEffect(() => {
    if (!widgetRect || !widgetRef.current || isPlaceholder) return;
    const { left, top, width, height } = widgetRect;
    widgetRef.current.style.width = `${width}px`;
    widgetRef.current.style.height = `${height}px`;
    if ((isDragEnding || isResizeEnding) && actionOffsetRef.current) {
      // 等 fixed 定位下的移动动画结束
      const { layoutLeft, layoutTop } = actionOffsetRef.current;
      widgetRef.current.style.top = `${top + layoutTop}px`;
      widgetRef.current.style.left = `${left + layoutLeft}px`;
    } else {
      widgetRef.current.style.top = `${top}px`;
      widgetRef.current.style.left = `${left}px`;
    }
  }, [isDragEnding, isPlaceholder, isResizeEnding, widgetRect]);
  // 设置每个 widget 间距，以此保证间距一致性
  React.useEffect(() => {
    if (!layoutData || !widgetRef.current) return;
    const { gap } = layoutData;
    widgetRef.current.style.borderLeftWidth = gap ? `${gap[0] * 0.5}px` : '0';
    widgetRef.current.style.borderRightWidth = gap ? `${gap[0] * 0.5}px` : '0';
    widgetRef.current.style.borderTopWidth = gap ? `${gap[1] * 0.5}px` : '0';
    widgetRef.current.style.borderBottomWidth = gap ? `${gap[1] * 0.5}px` : '0';
  }, [layoutData]);

  return (
    <Wrapper
      key={id}
      ref={widgetRef}
      className={cls({
        dragging: isDragging,
        resizing: isResizing,
        dragending: isDragEnding,
        resizeending: isResizeEnding,
      })}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={className}>{children}</div>
      {!resizeableHandle && !widget?.static && !widget?.noResize && (
        <ResizeArrow className="default_resize" ref={resizeElRef as React.Ref<SVGSVGElement>} />
      )}
    </Wrapper>
  );
};

export default Widget;
