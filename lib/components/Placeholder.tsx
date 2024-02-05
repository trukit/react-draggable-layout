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
  transition: none;
  border-style: solid;
  border-color: transparent;
  &.active {
    display: block;
    opacity: 1;
    transition: left 0.3s, top 0.3s, width 0.3s, height 0.3s;
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
  className?: string;
  show: boolean;
  widget?: IWidget;
  layoutData?: ILayoutData;
}

const Placeholder: React.FC<IPlaceholderProps> = (props) => {
  const { widget, layoutData, show, className } = props;
  const widgetRef = React.useRef<HTMLDivElement>(null);

  const widgetRect = useWidget({
    widget,
    layoutData,
  });

  React.useEffect(() => {
    if (!widgetRect || !widgetRef.current || !layoutData) return;
    const { left, top, width, height } = widgetRect;
    const { gap } = layoutData;
    widgetRef.current.style.width = `${width}px`;
    widgetRef.current.style.height = `${height}px`;
    widgetRef.current.style.top = `${top}px`;
    widgetRef.current.style.left = `${left}px`;
    widgetRef.current.style.borderLeftWidth = gap ? `${gap[0] * 0.5}px` : '0';
    widgetRef.current.style.borderRightWidth = gap ? `${gap[0] * 0.5}px` : '0';
    widgetRef.current.style.borderTopWidth = gap ? `${gap[1] * 0.5}px` : '0';
    widgetRef.current.style.borderBottomWidth = gap ? `${gap[1] * 0.5}px` : '0';
  }, [layoutData, widgetRect]);

  return (
    <Wrapper ref={widgetRef} className={cls({ active: show })}>
      <div className={className} />
    </Wrapper>
  );
};

export default Placeholder;
