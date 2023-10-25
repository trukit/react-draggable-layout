import * as React from 'react';
import { Layout } from '../types';
import { clamp } from '../utils';

interface Options {
  layout?: Layout;
  colCount?: number;
  rowHeight?: number;
  gap?: [number, number];
}

/**
 * 布局 Hook，用于 LayoutItem 和 Placeholder 组件
 * @param layoutRef 需要设置 DOM 布局结构的元素
 * @param options 配置项
 */
function useLayout(layoutRef: React.RefObject<HTMLElement> | null, options: Options) {
  const { layout, colCount = 12, rowHeight, gap } = options;

  const clampW = React.useMemo<number>(() => {
    if (!layout) return 0;
    return clamp(layout.w, layout.minW ?? layout.w, layout.maxW ?? layout.w);
  }, [layout]);

  const clampH = React.useMemo<number>(() => {
    if (!layout) return 0;
    return clamp(layout.h, layout.minH ?? layout.h, layout.maxH ?? layout.h);
  }, [layout]);

  React.useLayoutEffect(() => {
    const layoutEl = layoutRef?.current;
    if (!layoutEl || !layout || !rowHeight) return;
    const uint = 100 / colCount;
    layoutEl.style.width = `${clampW * uint}%`;
    layoutEl.style.height = `${clampH * rowHeight}px`;
    layoutEl.style.left = `${layout.x * uint}%`;
    layoutEl.style.top = layout.y === 0 ? '0px' : `${layout.y * rowHeight}px`;
    layoutEl.style.paddingLeft = gap ? `${gap[0] * 0.5}px` : '0';
    layoutEl.style.paddingRight = gap ? `${gap[0] * 0.5}px` : '0';
    layoutEl.style.paddingTop = gap ? `${gap[1] * 0.5}px` : '0';
    layoutEl.style.paddingBottom = gap ? `${gap[1] * 0.5}px` : '0';
  }, [clampH, clampW, colCount, gap, layout, layoutRef, rowHeight]);
}

export default useLayout;
