import * as React from 'react';
import { Layout } from '../../types';
import useLayout from '../../hooks/useLayout';
import Draggable from '../../operation/Draggable';
import { cls } from '../../utils/tool';

export interface LayoutItemProps {
  itemKey: string;
  children: React.ReactNode;
  layout?: Layout;
  colCount?: number;
  rowHeight?: number;
  gap?: [number, number];
  className?: string;
  draggableHandle?: string;
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
}) => {
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
        onStart: onDragStart,
        onStop: onDragStop,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragStart = React.useCallback(() => {
    console.log('==== onDragStart');
    setIsDragging(true);
  }, []);

  const onDragMove = React.useCallback((offset: [number, number]) => {}, []);

  const onDragStop = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div ref={itemRef} className={cls('rdl-layoutItem', { rdl_draggable__dragging: isDragging })} key={itemKey}>
      <div className={cls('rdl-layoutItem-content', className)}>{children}</div>
    </div>
  );
};

export default LayoutItem;
