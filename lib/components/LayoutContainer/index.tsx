import * as React from 'react';
import LayoutItem, { LayoutItemProps } from '../LayoutItem';
import type { BreakPoints, Cols, Layout, Layouts, CompactType } from '../../types';
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
  /** 压缩方向 */
  compactType?: CompactType;
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
  compactType = null,
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
  // TODO：调试用
  // React.useEffect(() => {
  //   console.log('memoLayoutList', JSON.stringify(memoLayoutList));
  // }, [memoLayoutList]);

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
  const [placeholderId, setPlaceholderID] = React.useState<string>('');
  const [placeholderLayout, setPlaceholderLayout] = React.useState<Layout>();

  // ======== Layout Draggable ============
  const handleDragStart = React.useCallback((curLayout: Layout) => {
    // console.log('[Container] darg start', curLayout);
    curLayout.moving = true;
    setPlaceholderLayout({ ...curLayout });
    setPlaceholderID(curLayout.id);
  }, []);

  const handleDragMove = React.useCallback(
    (curLayout: Layout, x: number, y: number) => {
      // console.log('[Container] darg move', curLayout, x, y);
      if (!enginRef.current) return;
      const engine = enginRef.current;
      const isUserAction = true;
      const preventCollision = true;
      let newLayoutList = engine.moveElement(
        memoLayoutList,
        curLayout,
        compactType,
        x,
        y,
        isUserAction,
        preventCollision,
        memoColCount,
        false,
      );
      newLayoutList = engine.compactLayout(newLayoutList, memoColCount, compactType);
      const placeLayout = newLayoutList.find((item) => item.id === curLayout.id);
      setPlaceholderLayout(placeLayout);
      changeLayouts(newLayoutList);
    },
    [changeLayouts, compactType, memoColCount, memoLayoutList],
  );

  const handleDragEnd = React.useCallback(
    (curLayout: Layout) => {
      // console.log('[Container] darg end', JSON.stringify(memoLayoutList));
      if (!enginRef.current) return;
      const engine = enginRef.current;
      curLayout.moving = false;
      let newLayoutList = LayoutEngine.cloneLayoutList(memoLayoutList);
      newLayoutList = engine.compactLayout(memoLayoutList, memoColCount, compactType);
      changeLayouts(newLayoutList);
      setPlaceholderLayout(undefined);
      setPlaceholderID('');
    },
    [changeLayouts, compactType, memoColCount, memoLayoutList],
  );

  // ========= 校验子组件是否符合规范 =============
  React.useEffect(() => {
    React.Children.toArray(children).forEach((child) => {
      if (!React.isValidElement(child) || (child as React.ReactElement).type !== LayoutItem) {
        throw new Error('[react-dragger-layout] The children of LayoutContainer can only be LayoutItem components.');
      }
    });
  }, [children]);

  // ======== 更新 LayoutItem 布局 ============
  React.useEffect(() => {
    const tempChildren: React.ReactElement<LayoutItemProps>[] = [];
    let rowCount = 0;

    React.Children.toArray(children).forEach((child) => {
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
    // 设置 LayoutContainer 的高度
    if (containerRef.current) {
      containerRef.current.style.height = `${rowCount * memoRowHeight}px`;
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

  // =========== 初始化 LayoutEngine ===============
  React.useEffect(() => {
    if (!enginRef.current) {
      enginRef.current = new LayoutEngine();
    }
  }, [memoColWidth, memoRowHeight]);

  // ========= TODO: 调试用，记得删除 ===========
  // React.useLayoutEffect(() => {
  //   console.group(`LayoutContainer - ${size?.width}`);
  //   console.log('breakpoint', memoBreakPointKey);
  //   console.log('col', memoColCount);
  //   console.log('rowHeight', memoRowHeight);
  //   console.groupEnd();
  // }, [memoBreakPointKey, memoColCount, memoRowHeight, size]);

  // console.log('container refresh =======');

  return (
    <>
      <div ref={containerRef} className={cls('rdl-container', 'rdl_animate', className)}>
        {clonedChildren}
        <Placeholder
          active={!!placeholderId}
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
