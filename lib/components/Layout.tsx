import * as React from 'react';
import type { ILayoutData, IWidget, IWidgetPosition } from '../types';
import styled from 'styled-components';
import { IWidgetProps } from './Widget';
import useSize from '../hooks/useSize';
import Placeholder from './Placeholder';
import { LayoutEngine } from '../engine';

const Wrapper = styled.div`
  position: relative;
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
  const [layoutWidgets, setLayoutWidgets] = React.useState<IWidget[]>(widgets);
  React.useEffect(() => {
    setLayoutWidgets(widgets);
  }, [widgets]);

  // 布局更新与 Placeholder
  const engineRef = React.useRef<LayoutEngine>();
  const [activeWidgetId, setActiveWidgetId] = React.useState<string>('');
  const [activeWidget, setActiveWidget] = React.useState<IWidget>();
  // 根据 widgets 组件数组，实例化布局引擎
  React.useEffect(() => {
    if (widgets) {
      engineRef.current = new LayoutEngine(widgets);
    }
  }, [widgets]);

  const handleActionStart = React.useCallback((widget: IWidget) => {
    setActiveWidgetId(widget.id);
    setActiveWidget(widget);
  }, []);

  const handleActionDoing = React.useCallback(
    (widget: IWidget, newWidgetPos: IWidgetPosition) => {
      if (!engineRef.current) return;
      console.log(`操作 widget === ${widget.id}`, newWidgetPos);
      const tempLayoutWidgets = JSON.parse(JSON.stringify(layoutWidgets)) as IWidget[];
      const curWidget = tempLayoutWidgets.find((w) => w.id === widget.id) as IWidget;
      curWidget.x = newWidgetPos.x;
      curWidget.y = newWidgetPos.y;
      curWidget.w = newWidgetPos.w;
      curWidget.h = newWidgetPos.h;
      setActiveWidget(curWidget);
      const newLayoutWidgets = engineRef.current.batchUpdate(tempLayoutWidgets);
      setLayoutWidgets(newLayoutWidgets);
    },
    [layoutWidgets],
  );

  const handleActionEnd = React.useCallback(
    (widget: IWidget) => {
      console.log('layout handleActionEnd', widget, activeWidgetId);
      if (widget.id === activeWidgetId) {
        setActiveWidgetId('');
        setActiveWidget(undefined);
      }
    },
    [activeWidgetId],
  );

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
  const [layoutData, setLayoutData] = React.useState<ILayoutData>();
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

    const _layoutData = {
      rows: rowCount,
      cols: col,
      width: colWidth * col,
      height: rowHeight * rowCount,
      rowHeight,
      colWidth,
      gap,
    };
    setLayoutData(_layoutData);
    const realChildren = tempList.map((item) =>
      React.cloneElement(item.child, {
        id: item.id,
        widget: item.widget,
        draggableHandle: item.child.props.draggableHandle || draggableHandle,
        resizeableHandle: item.child.props.resizeableHandle || resizeableHandle,
        layoutData: _layoutData,
        onActionStart: handleActionStart,
        onActionDoing: handleActionDoing,
        onActionEnd: handleActionEnd,
      }),
    );
    setClonedChildren(realChildren);
    if (layoutRef.current) {
      layoutRef.current.style.height = `${rowCount * rowHeight}px`;
    }
  }, [
    children,
    col,
    colWidth,
    draggableHandle,
    gap,
    handleActionDoing,
    handleActionEnd,
    handleActionStart,
    layoutWidgets,
    resizeableHandle,
    rowHeight,
    widgets,
  ]);

  return (
    <Wrapper ref={layoutRef} className={className}>
      {clonedChildren}
      <Placeholder show={!!activeWidgetId} widget={activeWidget} layoutData={layoutData} />
    </Wrapper>
  );
};

export default Layout;
