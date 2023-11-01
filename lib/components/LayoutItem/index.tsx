import * as React from 'react';
import { DragUI, Layout } from '../../types';
import useLayout from '../../hooks/useLayout';
import Draggable from '../../core/Draggable';
import { cls } from '../../utils/tool';
import useRefFunction from '../../hooks/useRefFunction';
import LayoutEngine from '../../core/LayoutEngine';

export interface LayoutItemProps {
  id: string;
  children: React.ReactNode;
  layout?: Layout;
  colCount?: number;
  colWidth?: number;
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
  id,
  children,
  layout,
  className,
  colCount = 12,
  colWidth,
  rowHeight,
  gap,
  draggableHandle,
  onLayoutDragStart,
  onLayoutDragMove,
  onLayoutDragEnd,
}) => {
  // ======== Elements Ref ============
  const itemRef = React.useRef<HTMLDivElement>(null);
  const draggableElRef = React.useRef<HTMLElement | null>(null);
  const draggableRef = React.useRef<Draggable>();

  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  console.group(id);
  console.log('layout', layout);
  console.groupEnd();

  // 布局
  useLayout(itemRef, {
    layout,
    colCount,
    rowHeight,
    gap,
  });

  const calcLayoutXY = React.useCallback(
    (offsetX: number, offsetY: number): [number, number] | undefined => {
      if (!colWidth || !rowHeight || !layout) return;
      const layoutX = Math.round(offsetX / colWidth);
      const layoutY = Math.round(offsetY / rowHeight);
      return LayoutEngine.checkInContainer(layoutX, layoutY, colCount, layout.w);
    },
    [colCount, colWidth, layout, rowHeight],
  );

  // ======== Layout Draggable ============
  const handleDragStart = useRefFunction(() => {
    // console.log('==== onDragStart');
    setIsDragging(true);
    if (layout && onLayoutDragStart) {
      const newLayout = { ...layout };
      onLayoutDragStart(newLayout);
    }
  }, [layout, onLayoutDragStart]);

  const handleDragMove = useRefFunction(
    (dragUI: DragUI) => {
      console.log(' ========== onLayoutDragMove,,,,,,', onLayoutDragMove);
      if (!dragUI.position) return;
      const { left, top } = dragUI.position;
      if (layout && onLayoutDragMove) {
        const newLayout = { ...layout };
        const calcXY = calcLayoutXY(left, top);
        if (calcXY) {
          newLayout.x = calcXY[0];
          newLayout.y = calcXY[1];
        }
        onLayoutDragMove(newLayout, dragUI);
      }
    },
    [calcLayoutXY, layout, onLayoutDragMove],
  );

  const handleDragEnd = useRefFunction(() => {
    setIsDragging(false);
    if (layout && onLayoutDragEnd) {
      const newLayout = { ...layout };
      onLayoutDragEnd(newLayout);
    }
  }, [layout, onLayoutDragEnd]);

  // 注册拖拽移动事件
  React.useEffect(() => {
    if (!draggableHandle || !itemRef.current) return;
    draggableElRef.current = itemRef.current.querySelector(draggableHandle);

    if (draggableElRef.current && !draggableRef.current) {
      draggableRef.current = new Draggable(itemRef.current, {
        handle: draggableHandle,
        onStart: handleDragStart,
        onDrag: handleDragMove,
        onStop: handleDragEnd,
      });
    } else if (draggableRef.current) {
      draggableRef.current.updateOptions({
        onStart: handleDragStart,
        onDrag: handleDragMove,
        onStop: handleDragEnd,
      });
    }
  }, [draggableHandle, handleDragEnd, handleDragMove, handleDragStart]);

  return (
    <div ref={itemRef} className={cls('rdl-item', { rdl_draggable__dragging: isDragging })} key={id}>
      <div className={cls('rdl-item-content', className)}>{children}</div>
    </div>
  );
};

export default LayoutItem;
