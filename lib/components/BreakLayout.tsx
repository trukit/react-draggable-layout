import * as React from 'react';
import type { ISize, IWidget } from '../types';
import Layout, { ILayoutProps } from './Layout';

export interface IBreakLayoutProps extends Omit<ILayoutProps, 'col' | 'widgets' | 'gap' | 'rowHeight'> {
  breakPoints: Record<string, number>;
  breakWidgets: Record<string, IWidget[]>;
  breakCols: Record<string, number> | number;
  breakGap?: Record<string, [number, number]> | [number, number];
  breakRowHeight?: Record<string, number | string> | number | string;
}

const BreakLayout: React.FC<IBreakLayoutProps> = (props) => {
  const { children, breakPoints, breakCols, breakWidgets, breakGap, breakRowHeight, ...ret } = props;

  const [breakSign, setBreakSign] = React.useState<string>();
  const breakPointList = React.useMemo<[string, number][]>(() => {
    const entries: [string, number][] = [];
    for (const key in breakPoints) {
      entries.push([key, breakPoints[key]]);
    }
    entries.sort((a, b) => b[1] - a[1]);
    return entries;
  }, [breakPoints]);

  const cols = React.useMemo<number>(() => {
    if (typeof breakCols === 'number') return breakCols;
    if (!breakSign) return 12;
    const res = breakCols[breakSign];
    return res || 12;
  }, [breakCols, breakSign]);

  const widgets = React.useMemo<IWidget[]>(() => {
    if (!breakSign) return [];
    const widgets = breakWidgets[breakSign];
    return widgets || [];
  }, [breakSign, breakWidgets]);

  const gap = React.useMemo<[number, number] | undefined>(() => {
    if (Array.isArray(breakGap) && breakGap.length === 2) return breakGap;
    if (!breakGap || !breakSign) return;
    if (typeof breakGap === 'object' && !Array.isArray(breakGap)) {
      return breakGap[breakSign];
    }
  }, [breakGap, breakSign]);

  const rowHeight = React.useMemo<number | string | undefined>(() => {
    if (typeof breakRowHeight === 'number' || typeof breakRowHeight === 'string') return breakRowHeight;
    if (!breakRowHeight || !breakSign) return;
    return breakRowHeight[breakSign];
  }, [breakRowHeight, breakSign]);

  const handleLayoutResize = React.useCallback(
    (size: ISize) => {
      const { width } = size;
      console.log('width', width, breakPointList);
      const breakPoint = breakPointList.find((item) => item[1] <= width);
      if (breakPoint) {
        setBreakSign(breakPoint[0]);
        return;
      }
      setBreakSign(breakPointList[breakPointList.length - 1][0]);
    },
    [breakPointList],
  );

  return (
    <>
      <Layout {...ret} col={cols} widgets={widgets} gap={gap} rowHeight={rowHeight} onSizeChange={handleLayoutResize}>
        {children}
      </Layout>
    </>
  );
};

export default BreakLayout;
