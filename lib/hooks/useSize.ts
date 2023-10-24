import ResizeObserver from 'resize-observer-polyfill';
import * as React from 'react';

type Size = { width: number; height: number };

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
