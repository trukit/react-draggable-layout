import * as React from 'react';
import { Layout } from '../../types';
import { clamp } from '../../utils';

export interface LayoutItemProps {
  itemKey: string;
  children: React.ReactNode;
  layout?: Layout;
  colCount?: number;
  rowHeight?: number;
  gap?: [number, number];
  className?: string;
}

const LayoutItem: React.FC<LayoutItemProps> = ({
  itemKey,
  children,
  layout,
  className,
  colCount = 12,
  rowHeight,
  gap,
}) => {
  const itemRef = React.useRef<HTMLDivElement>(null);

  console.group(itemKey);
  console.log('layout', layout);
  console.groupEnd();

  // 设置布局
  React.useEffect(() => {
    const itemDiv = itemRef.current;
    if (!itemDiv || !layout || !rowHeight) return;
    const uint = 100 / colCount;
    itemDiv.style.width = `${clamp(layout.w, layout.minW ?? layout.w, layout.maxW ?? layout.w) * uint}%`;
    itemDiv.style.height = `${clamp(layout.h, layout.minH ?? layout.h, layout.maxH ?? layout.h) * rowHeight}px`;
    itemDiv.style.left = `${layout.x * uint}%`;
    itemDiv.style.top = layout.y === 0 ? '0px' : `${layout.y * rowHeight}px`;
    itemDiv.style.paddingLeft = gap ? `${gap[0] * 0.5}px` : '0';
    itemDiv.style.paddingRight = gap ? `${gap[0] * 0.5}px` : '0';
    itemDiv.style.paddingTop = gap ? `${gap[1] * 0.5}px` : '0';
    itemDiv.style.paddingBottom = gap ? `${gap[1] * 0.5}px` : '0';
  }, [colCount, gap, layout, rowHeight]);

  return (
    <div ref={itemRef} className={`rdl-layoutItem ${className ?? ''}`} key={itemKey}>
      {children}
    </div>
  );
};

export default LayoutItem;
