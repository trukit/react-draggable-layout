import * as React from 'react';
import type { DependencyList } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
function useRefFunction<T extends Function>(callback: T, deps: DependencyList): T {
  const fnRef = React.useRef<T>(callback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fn = React.useCallback(callback, deps);

  React.useEffect(() => {
    console.log('函数改变');
    fnRef.current = fn;
  }, [fn]);

  return fnRef.current;
}

export default useRefFunction;
