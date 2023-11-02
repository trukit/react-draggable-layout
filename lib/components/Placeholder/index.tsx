import * as React from 'react';
import { Layout } from '../../types';
import { cls } from '../../utils/tool';
import useLayout from '../../hooks/useLayout';

interface PlaceholerProps {
  active: boolean;
  layout?: Layout;
  colCount?: number;
  rowHeight?: number;
  gap?: [number, number];
}

const Placeholder: React.FC<PlaceholerProps> = ({ active, layout, colCount, rowHeight, gap }) => {
  const elRef = React.useRef<HTMLDivElement>(null);

  useLayout(elRef, {
    layout: layout
      ? {
          ...layout,
          moving: false, // placeholder 不需要判断是否处于 moving 状态
        }
      : undefined,
    colCount,
    rowHeight,
    gap,
  });

  // console.log('placeholder ========', JSON.stringify(layout));

  return (
    <div ref={elRef} className={cls('rdl-placeholder', 'rdl_animate', { 'rdl-placeholder__active': active })}>
      <div className="rdl-placeholder-content" />
    </div>
  );
};

export default React.memo(Placeholder);
