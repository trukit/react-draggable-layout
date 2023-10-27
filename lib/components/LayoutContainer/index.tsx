import * as React from 'react';
import LayoutItem, { LayoutItemProps } from '../LayoutItem';
import { BreakPoints, Cols, Layout, Layouts } from '../../types';
import useSize from '../../hooks/useSize';
import { cls, getKeyByValue } from '../../utils/tool';

export interface LayoutContainerProps {
  /** 页面适配，例如： { lg: 1920, md: 1680, sm: 1440, xs: 1280 } */
  breakpoints?: BreakPoints;
  /** 页面需要分成多少列，可以为数字，表示无论何种尺寸都分为这么多列，可以为 breakpoints 类型例如 { lg: 1920, md: 1680, sm: 1440, xs: 1280 } */
  cols?: number | Cols;
  /** 布局 */
  layouts?: Layouts;
  /** 拖拽时的对象 */
  draggableHandle?: string;
  /** 拖动改变大小时的对象 */
  resizeableHandle?: string;
  /** 相邻距离，x 轴与 y 轴 */
  gap?: [number, number];
  /** 当布局切换 */
  onLayoutChange?: (currentLayout: Layout[], allLayouts: Layouts) => void;
  /** 固定每一行的高度，未设置则为每一列的宽度值 */
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

  /** 获取每一行的高度 */
  const memoRowHeight = React.useMemo<number>(() => {
    if (rowHeight) return gap ? Math.abs(rowHeight) + gap[1] : Math.abs(rowHeight);
    const container = containerRef.current;
    if (!container || !size) return 0;
    return size.width / memoColCount;
  }, [gap, memoColCount, rowHeight, size]);

  // clone LayoutItem
  React.useEffect(() => {
    const tempChildren: React.ReactElement<LayoutItemProps>[] = [];
    let rowCount = 0;
    React.Children.toArray(children).forEach((child) => {
      if (!React.isValidElement(child) || (child as React.ReactElement).type !== LayoutItem) {
        throw new Error('[react-dragger-layout] The children of LayoutContainer can only be LayoutItem components.');
      }
      const curChildren = child as React.ReactElement<LayoutItemProps>;
      const key = curChildren.props.itemKey;
      let ownerLayout = curChildren.props.layout;

      // 若 LayoutItem 没有显示设置 layout 属性，且 LayoutContainer 有设置 layouts 属性，则从 layouts 内寻找
      // 有的话替换没有的话仍旧是 LayoutItem 的 layout 属性
      if (!ownerLayout && layouts) {
        const layoutList = layouts[memoBreakPointKey];
        ownerLayout = layoutList?.find((item: Layout) => item.key === key) ?? ownerLayout;
      }

      if (!ownerLayout) return;
      // 找到对应的其对应的 key
      const tempChild = React.cloneElement(curChildren, {
        itemKey: key,
        layout: ownerLayout,
        gap,
        colCount: memoColCount,
        rowHeight: memoRowHeight,
        draggableHandle: curChildren.props.draggableHandle ?? draggableHandle,
      });
      const bottom = ownerLayout.h + ownerLayout.y;
      rowCount = Math.max(rowCount, bottom);
      tempChildren.push(tempChild);
      setClonedChildren(tempChildren);
    });

    console.log('rowCount', rowCount);
    // 设置 LayoutContainer 的高度
    if (containerRef.current) {
      containerRef.current.style.height = `${rowCount * memoRowHeight}px`;
    }
  }, [children, layouts, gap, memoColCount, memoBreakPointKey, memoRowHeight, draggableHandle]);

  // ========= TODO: 调试用，记得删除 ===========
  // React.useLayoutEffect(() => {
  //   console.group(`LayoutContainer - ${size?.width}`);
  //   console.log('breakpoint', memoBreakPointKey);
  //   console.log('col', memoColCount);
  //   console.log('rowHeight', memoRowHeight);
  //   console.groupEnd();
  // }, [memoBreakPointKey, memoColCount, memoRowHeight, size]);

  return (
    <div ref={containerRef} className={cls('rdl-layoutContainer', className)}>
      {clonedChildren}
      {/* TODO：在最后面添加占位块 */}
    </div>
  );
};

export default LayoutContainer;
