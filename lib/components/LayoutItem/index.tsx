import * as React from 'react';
import { Layout } from '../../types';
import useLayout from '../../hooks/useLayout';

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={itemRef} className="rdl-layoutItem" key={itemKey}>
      <div className={`rdl-layoutItem-content ${className ?? ''}`}>{children}</div>
    </div>
  );
};

export default LayoutItem;
