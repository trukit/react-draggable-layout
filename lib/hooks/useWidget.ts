import * as React from 'react';
import type { ILayoutData, IWidget } from '../types';
import { clamp } from '../utils';

interface Options {
  widget?: IWidget;
  layoutData?: ILayoutData;
}

interface IWidgetRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * 位置布局 Hook，用于 Widget 和 Placeholder 组件
 * @param layoutRef 需要设置 DOM 布局结构的元素
 * @param options 配置项
 */
function useWidget(options: Options) {
  const { widget, layoutData } = options;

  const [widgetRect, setWidgetRect] = React.useState<IWidgetRect>();

  const clampW = React.useMemo<number>(() => {
    if (!widget || !layoutData) return 0;
    return clamp(widget.w ?? 1, widget.minW ?? widget.w ?? 1, widget.maxW ?? widget.w ?? layoutData.cols);
  }, [layoutData, widget]);

  const clampH = React.useMemo<number>(() => {
    if (!widget) return 0;
    return clamp(widget.h ?? 1, widget.minH ?? widget.h ?? 1, widget.maxH ?? widget.h ?? Infinity);
  }, [widget]);

  React.useEffect(() => {
    if (!widget || !layoutData) return;
    const { rowHeight, colWidth } = layoutData;
    setWidgetRect({
      left: (widget.x ?? 0) * colWidth,
      top: (widget.y ?? 0) * rowHeight,
      width: clampW * colWidth,
      height: clampH * rowHeight,
    });
  }, [clampH, clampW, widget, layoutData]);

  return widgetRect;
}

export default useWidget;
