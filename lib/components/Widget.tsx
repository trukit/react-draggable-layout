import * as React from 'react';
import type { IDragOffset, ILayoutData, IWidget } from '../types';
import styled from 'styled-components';
import { Manager, MouseDownIgnore, cls, getDragOffset } from '../utils';
import useWidget from '../hooks/useWidget';

const Wrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  transition: none;
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
    bottom: 4px;
    right: 4px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
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
}

const Widget: React.FC<IWidgetProps> = (props) => {
  const { id, children, className, widget, layoutData, draggableHandle, resizeableHandle } = props;
  const widgetRef = React.useRef<HTMLDivElement>(null);
  const mouseDownEventRef = React.useRef<MouseEvent | null>(null);

  // ========================
  // ===== Draggable ========
  // ========================
  const dragElRef = React.useRef<HTMLElement | null>(null);
  const dragOffsetRef = React.useRef<IDragOffset | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [isDragEnding, setIsDragEnding] = React.useState<boolean>(false);
  const dragFollow = React.useCallback((e: MouseEvent) => {
    if (!dragOffsetRef.current || !widgetRef.current) return;
    const { offsetLeft, offsetTop } = dragOffsetRef.current;
    widgetRef.current.style.left = `${e.clientX + offsetLeft}px`;
    widgetRef.current.style.top = `${e.clientY + offsetTop}px`;
  }, []);
  // 鼠标移动
  const dragMouseMove = React.useCallback(
    (e: MouseEvent) => {
      // console.log('dragMouseMove', mouseDownEventRef.current);
      const s = mouseDownEventRef.current as MouseEvent;
      if (Manager.isDragging) {
        console.log('dragging');
        dragFollow(e);
      } else if (Math.abs(e.x - s.x) + Math.abs(e.y + s.y) > 3) {
        console.log('dragging start');
        Manager.isDragging = true;
        Manager.dragElementId = id;
        if (widgetRef.current) {
          dragOffsetRef.current = getDragOffset(e, widgetRef.current, widgetRef.current.parentElement as HTMLElement);
        }
        widgetRef.current!.style.transition = 'none';
        dragFollow(e);
        setIsDragging(true);
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
      }
      mouseDownEventRef.current = null;
      Manager.dragElementId = '';
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
  const enableDraggable = React.useCallback(() => {
    if (dragElRef.current) return;
    if (!draggableHandle) dragElRef.current = widgetRef.current as HTMLElement;
    if (draggableHandle && !dragElRef.current) {
      const el = (widgetRef.current as HTMLDivElement).querySelector(draggableHandle);
      dragElRef.current = el ? (el as HTMLElement) : widgetRef.current;
    }
    dragElRef.current?.addEventListener('mousedown', dragMouseDown);
  }, [dragMouseDown, draggableHandle]);
  // 关闭拖拽
  const diableDraggable = React.useCallback(() => {
    if (!dragElRef.current) return;
    dragElRef.current.removeEventListener('mousedown', dragMouseDown);
    dragElRef.current = null;
  }, [dragMouseDown]);
  // 判断开启和关闭的时机
  React.useEffect(() => {
    console.log('dragger');
    if (!widget || widget.static || widget.isDraggable === false) {
      diableDraggable();
    } else {
      enableDraggable();
    }
  }, [diableDraggable, enableDraggable, widget]);

  // ========================
  // ===== Resizeable =======
  // ========================
  const resizeElRef = React.useRef<HTMLElement | null>(null);
  const [isResizing, setIsResizing] = React.useState<boolean>(false);
  const [isResizeEnding, setIsResizeEnding] = React.useState<boolean>(false);
  const resizeMouseDown = React.useCallback((e: MouseEvent) => {}, []);
  // 开启 resize
  const enableResizable = React.useCallback(() => {
    if (resizeElRef.current) return;
    // resizeElRef.current?.addEventListener('mousedown', resizeMouseDown);
  }, []);

  // ========================
  // ======= Layout =========
  // ========================
  const isPlaceholder = React.useMemo<boolean>(() => isDragging || isResizing, [isDragging, isResizing]);
  // const isEnding = React.useMemo<boolean>(() => isDragEnding || isResizeEnding, [isDragEnding, isResizeEnding]);
  const handleTransitionEnd = React.useCallback(() => {
    widgetRef.current!.style.transition = 'none';
    if (isDragEnding) {
      setIsDragEnding(false);
    }
  }, [isDragEnding]);
  const widgetRect = useWidget({
    widget,
    layoutData,
  });
  // layout with widget data
  React.useEffect(() => {
    if (!widgetRect || !widgetRef.current || isPlaceholder) return;
    const { left, top, width, height } = widgetRect;
    console.log('widgetRect', widgetRect);
    widgetRef.current.style.width = `${width}px`;
    widgetRef.current.style.height = `${height}px`;
    if (isDragEnding && dragOffsetRef.current) {
      console.log(dragOffsetRef.current);
      const { layoutLeft, layoutTop } = dragOffsetRef.current;
      widgetRef.current.style.top = `${top + layoutTop}px`;
      widgetRef.current.style.left = `${left + layoutLeft}px`;
    } else {
      widgetRef.current.style.top = `${top}px`;
      widgetRef.current.style.left = `${left}px`;
    }
  }, [isDragEnding, isPlaceholder, widgetRect]);
  // padding
  React.useEffect(() => {
    if (!layoutData || !widgetRef.current) return;
    const { gap } = layoutData;
    widgetRef.current.style.paddingLeft = gap ? `${gap[0] * 0.5}px` : '0';
    widgetRef.current.style.paddingRight = gap ? `${gap[0] * 0.5}px` : '0';
    widgetRef.current.style.paddingTop = gap ? `${gap[1] * 0.5}px` : '0';
    widgetRef.current.style.paddingBottom = gap ? `${gap[1] * 0.5}px` : '0';
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
      {!resizeableHandle && !widget?.static && widget?.isResizeable !== false && (
        <ResizeArrow className="default_resize" ref={resizeElRef as React.Ref<SVGSVGElement>} />
      )}
    </Wrapper>
  );
};

export default Widget;
