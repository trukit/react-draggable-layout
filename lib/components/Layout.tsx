import * as React from 'react';
import type { IWidget } from '../types';
import styled from 'styled-components';
import { IWidgetProps } from './Widget';
import useSize from '../hooks/useSize';

const Wrapper = styled.div`
  position: relative;
  transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;
`;

export interface ILayoutProps {
  col: number;
  widgets: IWidget[];
  children: React.ReactNode;
  draggableHandle?: string;
  resizeableHandle?: string;
  /** [x, y] 方向上每个 widget 的边距，px 数值 */
  gap?: [number, number];
  /** 像素值传字符串例如：40px，传 number 表示为几个 col 宽度 */
  rowHeight?: string | number;
  className?: string;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  const {
    className,
    col,
    rowHeight: propsRowHieght,
    gap,
    widgets,
    children,
    draggableHandle,
    resizeableHandle,
  } = props;
  const layoutRef = React.useRef<HTMLDivElement>(null);

  const size = useSize(layoutRef);
  const colWidth = React.useMemo<number>(() => {
    if (!size || !layoutRef.current) return 0;
    return size.width / col;
  }, [col, size]);
  const rowHeight = React.useMemo<number>(() => {
    if (!propsRowHieght) return colWidth;
    if (typeof propsRowHieght === 'number') return gap ? propsRowHieght * colWidth + gap[1] : propsRowHieght * colWidth;
    if (typeof propsRowHieght === 'string') {
      const height = parseFloat(propsRowHieght);
      return gap ? height + gap[1] : height;
    }
    return 0;
  }, [colWidth, gap, propsRowHieght]);
  /**
   * 设置 margin
   */
  React.useEffect(() => {
    if (!gap) return;
    if (gap[0] <= 0 || gap[1] <= 0) return;
    const container = layoutRef.current;
    if (!container) return;
    const xMargin = gap[0] * 0.5;
    const yMargin = gap[1] * 0.5;
    container.style.marginLeft = `${-xMargin}px`;
    container.style.marginRight = `${-xMargin}px`;
    container.style.marginTop = `${-yMargin}px`;
    container.style.marginBottom = `${-yMargin}px`;
  }, [gap]);

  /**
   * 根据 props 和布局框架 size 变动，更新子节点
   */
  const [clonedChildren, setClonedChildren] = React.useState<React.ReactElement<IWidgetProps>[]>([]);
  const [layoutWidgets, setLayoutWidgets] = React.useState<IWidget[]>(widgets);
  React.useEffect(() => {
    const tempList: Array<{
      id: string;
      widget: IWidget;
      child: React.ReactElement<IWidgetProps>;
    }> = [];
    let rowCount = 0;

    React.Children.toArray(children).forEach((child) => {
      const curChild = child as React.ReactElement<IWidgetProps>;
      const { id } = curChild.props;
      const widgetConfig = layoutWidgets.find((w) => w.id === id);
      if (!widgetConfig) return;

      const bottom = widgetConfig.h + widgetConfig.y;
      rowCount = Math.max(rowCount, bottom);
      tempList.push({
        id,
        widget: widgetConfig,
        child: curChild,
      });
    });

    const realChildren = tempList.map((item) =>
      React.cloneElement(item.child, {
        id: item.id,
        widget: item.widget,
        draggableHandle: item.child.props.draggableHandle || draggableHandle,
        resizeableHandle: item.child.props.resizeableHandle || resizeableHandle,
        layoutData: {
          rows: rowCount,
          cols: col,
          width: colWidth * col,
          height: rowHeight * rowCount,
          rowHeight,
          colWidth,
          gap,
        },
      }),
    );
    setClonedChildren(realChildren);
    if (layoutRef.current) {
      layoutRef.current.style.height = `${rowCount * rowHeight}px`;
    }
  }, [children, col, colWidth, draggableHandle, gap, layoutWidgets, resizeableHandle, rowHeight, widgets]);

  return (
    <Wrapper ref={layoutRef} className={className}>
      {clonedChildren}
    </Wrapper>
  );
};

export default Layout;
