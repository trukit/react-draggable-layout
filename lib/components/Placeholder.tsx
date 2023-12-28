import * as React from 'react';
import useWidget from '../hooks/useWidget';
import type { IWidget, ILayoutData } from '../types';
import styled from 'styled-components';
import { cls } from '../utils';

const Wrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  z-index: 0;
  display: none;
  transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;
  &.active {
    display: block;
  }
  > div {
    position: relative;
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface IPlaceholderProps {
  show: boolean;
  widget?: IWidget;
  layoutData?: ILayoutData;
}

const Placeholder: React.FC<IPlaceholderProps> = (props) => {
  const { widget, layoutData, show } = props;
  const widgetRef = React.useRef<HTMLDivElement>(null);

  const widgetRect = useWidget({
    widget,
    layoutData,
  });

  React.useEffect(() => {
    if (!widgetRect || !widgetRef.current) return;
    const { left, top, width, height } = widgetRect;
    widgetRef.current.style.width = `${width}px`;
    widgetRef.current.style.height = `${height}px`;
    widgetRef.current.style.top = `${top}px`;
    widgetRef.current.style.left = `${left}px`;
  }, [widgetRect]);

  return (
    <Wrapper ref={widgetRef} className={cls({ active: show })}>
      <div />
    </Wrapper>
  );
};

export default Placeholder;
