import * as React from 'react';
import LayoutItem, { LayoutItemProps } from '../LayoutItem';
import { BreakPoints, Cols, DragUI, Layout, Layouts } from '../../types';
import useSize from '../../hooks/useSize';
import { cls, getKeyByValue } from '../../utils/tool';
import Placeholder from '../Placeholder';
import LayoutEngine from '../../core/LayoutEngine';

export interface LayoutContainerProps {
  /** 页面适配，例如： { lg: 1920, md: 1680, sm: 1440, xs: 1280 } */
  breakpoints?: BreakPoints;
  /** 页面需要分成多少列，可以为数字，表示无论何种尺寸都分为这么多列，可以为 breakpoints 类型例如 { lg: 22, md: 20, sm: 18, xs: 14 } */
  cols?: number | Cols;
  /** 布局 */
  layouts?: Layouts;
  /** 触发拖拽的元素 css 类名，默认为整个 item */
  draggableHandle?: string;
  /** 拖动改变大小时的对象 */
  resizeableHandle?: string;
  /** item 相邻距离，x 轴与 y 轴 */
  gap?: [number, number];
  /** 当布局切换时触发 */
  onLayoutChange?: (currentLayout: Layout[], allLayouts: Layouts) => void;
  /** 固定每一行的高度，未设置则等于单位列的宽度值 */
  rowHeight?: number;
  /** 如果为真，则只能在网格范围内拖拽 */
  isBounded?: boolean;
  children: React.ReactNode;
  className?: string;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({
  breakpoints,
  layouts,
  children,
  className,
  gap,
  cols,
  rowHeight,
  draggableHandle,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const enginRef = React.useRef<LayoutEngine>();

  const [clonedChildren, setClonedChildren] = React.useState<React.ReactElement<LayoutItemProps>[]>([]);

  // 设置 margin
  React.useEffect(() => {
    if (!gap) return;
    if (gap[0] <= 0 || gap[1] <= 0) return;
    const container = containerRef.current;
    if (!container) return;
    const xMargin = gap[0] * 0.5;
    const yMargin = gap[1] * 0.5;
    container.style.marginLeft = `${-xMargin}px`;
    container.style.marginRight = `${-xMargin}px`;
    container.style.marginTop = `${-yMargin}px`;
    container.style.marginBottom = `${-yMargin}px`;
  }, [gap]);

  const size = useSize(containerRef);
  const [layoutsState, setLayoutsState] = React.useState<Layouts | undefined>(layouts);

  /** 当前页面宽度所触发的布局 */
  const memoBreakPointKey = React.useMemo<string>(() => {
    if (!breakpoints || !size) return '';
    const breakList = Object.values(breakpoints)
      .filter((n) => n > 0)
      .sort((a, b) => b - a);
    const { width } = size;
    let curBreakPoint = breakList[breakList.length - 1];
    for (const num of breakList) {
      if (width >= num) {
        curBreakPoint = num;
        break;
      }
    }
    const key = getKeyByValue<BreakPoints, string>(breakpoints, curBreakPoint);
    return key || '';
  }, [breakpoints, size]);

  const memoLayoutList = React.useMemo<Layout[]>(() => {
    if (!memoBreakPointKey || !layoutsState) return [];
    return layoutsState[memoBreakPointKey];
  }, [layoutsState, memoBreakPointKey]);

  const changeLayouts = React.useCallback(
    (layoutList: Layout[]) => {
      const newLayouts = JSON.parse(JSON.stringify(layoutsState));
      newLayouts[memoBreakPointKey] = layoutList;
      setLayoutsState(newLayouts);
    },
    [layoutsState, memoBreakPointKey],
  );

  /**
   * 获取当前页面一行的列数
   */
  const memoColCount = React.useMemo<number>(() => {
    let count;
    if (cols) {
      typeof cols === 'number' && (count = cols);
      if (typeof cols === 'object') {
        count = cols[memoBreakPointKey];
      }
    }
    return count ?? 12;
  }, [cols, memoBreakPointKey]);

  /** 每一列的像素宽度 */
  const memoColWidth = React.useMemo<number>(() => {
    if (!size) return 0;
    const container = containerRef.current;
    if (!container) return 0;
    return size.width / memoColCount;
  }, [memoColCount, size]);

  /** 获取每一行的高度 */
  const memoRowHeight = React.useMemo<number>(() => {
    if (rowHeight) return gap ? Math.abs(rowHeight) + gap[1] : Math.abs(rowHeight);
    return memoColWidth;
  }, [gap, memoColWidth, rowHeight]);

  /** Placeholder Layout */
  const [showPlaceholder, setShowPlaceholder] = React.useState<boolean>(false);
  const [placeholderLayout, setPlaceholderLayout] = React.useState<Layout>();

  // ======== Layout Draggable ============
  const handleDragStart = React.useCallback((curLayout: Layout) => {
    console.log('[Container] darg start', curLayout);
    setPlaceholderLayout({ ...curLayout });
    setShowPlaceholder(true);
  }, []);

  const handleDragMove = React.useCallback(
    (curLayout: Layout, ui: DragUI) => {
      console.log('[Container] darg move', curLayout, ui);
      if (!enginRef.current) return;
      const engine = enginRef.current;
      const newLayouts = engine.checkLayout(memoLayoutList, curLayout, curLayout.id, curLayout.id, 0);
      const { compacted } = engine.compactLayout(newLayouts, curLayout);
      const placeLayout = compacted.find((item) => item.id === curLayout.id);
      setPlaceholderLayout(placeLayout);
    },
    [memoLayoutList],
  );

  const handleDragEnd = React.useCallback((curLayout: Layout) => {
    console.log('[Container] darg end', curLayout);
    setPlaceholderLayout(undefined);
    setShowPlaceholder(false);
  }, []);

  // ======== Update LayoutItem & LayoutEngine ============
  React.useEffect(() => {
    const tempChildren: React.ReactElement<LayoutItemProps>[] = [];
    let rowCount = 0;

    React.Children.toArray(children).forEach((child) => {
      if (!React.isValidElement(child) || (child as React.ReactElement).type !== LayoutItem) {
        throw new Error('[react-dragger-layout] The children of LayoutContainer can only be LayoutItem components.');
      }
      const curChildren = child as React.ReactElement<LayoutItemProps>;
      const { id } = curChildren.props;
      const ownerLayout = memoLayoutList.find((item: Layout) => item.id === id);
      if (!ownerLayout) return;

      // 找到对应的其对应的 key
      const tempChild = React.cloneElement(curChildren, {
        id,
        layout: ownerLayout,
        gap,
        colCount: memoColCount,
        colWidth: memoColWidth,
        rowHeight: memoRowHeight,
        draggableHandle: draggableHandle,
        onLayoutDragStart: handleDragStart,
        onLayoutDragMove: handleDragMove,
        onLayoutDragEnd: handleDragEnd,
      });
      const bottom = ownerLayout.h + ownerLayout.y;
      rowCount = Math.max(rowCount, bottom);
      tempChildren.push(tempChild);
    });

    setClonedChildren(tempChildren);
    console.log('rowCount', rowCount);
    // 设置 LayoutContainer 的高度
    if (containerRef.current) {
      containerRef.current.style.height = `${rowCount * memoRowHeight}px`;
    }

    if (enginRef.current) {
      console.log('重新初始化LayoutEngine');
      enginRef.current.initOptions({
        cellWidth: memoColWidth,
        cellHeight: memoRowHeight,
        layoutList: memoLayoutList,
      });
    } else {
      console.log('初始化LayoutEngine');
      enginRef.current = new LayoutEngine({
        cellWidth: memoColWidth,
        cellHeight: memoRowHeight,
        layoutList: memoLayoutList,
      });
    }
  }, [
    children,
    gap,
    memoColCount,
    memoBreakPointKey,
    memoRowHeight,
    draggableHandle,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    memoLayoutList,
    memoColWidth,
  ]);

  // ========= TODO: 调试用，记得删除 ===========
  // React.useLayoutEffect(() => {
  //   console.group(`LayoutContainer - ${size?.width}`);
  //   console.log('breakpoint', memoBreakPointKey);
  //   console.log('col', memoColCount);
  //   console.log('rowHeight', memoRowHeight);
  //   console.groupEnd();
  // }, [memoBreakPointKey, memoColCount, memoRowHeight, size]);

  console.log('container refresh =======');

  return (
    <>
      <div ref={containerRef} className={cls('rdl-container', className)}>
        {clonedChildren}
        <Placeholder
          active={showPlaceholder}
          layout={placeholderLayout}
          colCount={memoColCount}
          rowHeight={memoRowHeight}
          gap={gap}
        />
      </div>
    </>
  );
};

export default LayoutContainer;
