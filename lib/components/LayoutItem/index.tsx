import * as React from 'react';
import { DragUI, Layout } from '../../types';
import useLayout from '../../hooks/useLayout';
import Draggable from '../../core/Draggable';
import { cls } from '../../utils/tool';
import useRefFunction from '../../hooks/useRefFunction';

export interface LayoutItemProps {
  itemKey: string;
  children: React.ReactNode;
  layout?: Layout;
  colCount?: number;
  rowHeight?: number;
  gap?: [number, number];
  className?: string;
  draggableHandle?: string;
  // 拖拽相关事件
  onLayoutDragStart?: (currentLayout: Layout) => void;
  onLayoutDragMove?: (currentLayout: Layout, ui: DragUI) => void;
  onLayoutDragEnd?: (currentLayout: Layout) => void;
}

const LayoutItem: React.FC<LayoutItemProps> = ({
  itemKey,
  children,
  layout,
  className,
  colCount = 12,
  rowHeight,
  gap,
  draggableHandle,
  onLayoutDragStart,
  onLayoutDragMove,
  onLayoutDragEnd,
}) => {
  // ======== Elements Ref ============
  const itemRef = React.useRef<HTMLDivElement>(null);
  const draggableRef = React.useRef<HTMLElement | null>(null);

  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  console.group(itemKey);
  console.log('layout', layout);
  console.groupEnd();

  // 布局
  useLayout(itemRef, {
    layout,
    colCount,
    rowHeight,
    gap,
  });

  // 注册拖拽移动事件
  React.useLayoutEffect(() => {
    if (!draggableHandle || !itemRef.current) return;
    draggableRef.current = itemRef.current.querySelector(draggableHandle);

    if (draggableRef.current) {
      new Draggable(itemRef.current, {
        handle: draggableHandle,
        onStart: handleDragStart,
        onDrag: handleDragMove,
        onStop: handleDragEnd,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ======== Layout Draggable ============
  const handleDragStart = useRefFunction(() => {
    // console.log('==== onDragStart');
    setIsDragging(true);
    if (layout && onLayoutDragStart) {
      onLayoutDragStart(layout);
    }
  }, [layout, onLayoutDragStart]);

  const handleDragMove = useRefFunction(
    (dragUI: DragUI) => {
      if (layout && onLayoutDragMove) {
        onLayoutDragMove(layout, dragUI);
      }
    },
    [layout, onLayoutDragMove],
  );

  const handleDragEnd = useRefFunction(() => {
    setIsDragging(false);
    if (layout && onLayoutDragEnd) {
      onLayoutDragEnd(layout);
    }
  }, [layout, onLayoutDragEnd]);

  return (
    <div ref={itemRef} className={cls('rdl-item', { rdl_draggable__dragging: isDragging })} key={itemKey}>
      <div className={cls('rdl-item-content', className)}>{children}</div>
    </div>
  );
};

export default LayoutItem;
