import ResizeObserver from 'resize-observer-polyfill';
import * as React from 'react';

type Size = { width: number; height: number };

/**
 * 监听 DOM 元素大小变化，返回变化后的 Size
 * @param ref 需监听大小变化的 DOM 元素
 * @returns
 */
function useSize(ref: React.RefObject<HTMLElement>): Size | undefined {
  const [state, setState] = React.useState<Size | undefined>(() => {
    return ref.current ? { width: ref.current?.clientWidth, height: ref.current.clientHeight } : undefined;
  });

  React.useLayoutEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { clientWidth, clientHeight } = entry.target;
        setState({ width: clientWidth, height: clientHeight });
      });
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return state;
}

export default useSize;
