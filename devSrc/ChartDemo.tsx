import { BreakLayout, Widget } from '../lib';

import styled from 'styled-components';
import { IWidget } from '../lib/types';

const LayoutWrapper = styled(BreakLayout)`
  background-color: #e2e2e2;
  .box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    > div:nth-child(2) {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .draggable {
    top: 6px;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 50px;
    height: 10px;
    cursor: grab;
    hr {
      border: none;
      width: 100%;
      margin-top: 3px;
      border-top: 4px solid #e2e2e2;
      transition: all 0.3s ease-in-out;
    }
    &:hover hr {
      border-color: #00ba3d;
    }
  }
`;

const REACT_GRID_LAYOUT_BEDROCK: Record<string, IWidget[]> = {
  lg: [
    { id: 'infos', x: 0, y: 0, w: 14, h: 2, minW: 8, minH: 2 },
    { id: 'charts', x: 0, y: 3, w: 14, h: 22, minW: 12, minH: 14 },
    { id: 'books', x: 14, y: 0, w: 5, h: 24, minW: 5, minH: 22 },
    { id: 'orders', x: 0, y: 22, w: 19, h: 20, minW: 10, minH: 8 },
    { id: 'panels', x: 19, y: 0, w: 5, h: 24, minW: 5, minH: 18 },
    { id: 'details', x: 19, y: 0, w: 5, h: 20, minW: 5, minH: 10 },
  ],
  md: [
    { id: 'infos', x: 0, y: 0, w: 12, h: 2, minW: 6, minH: 2 },
    { id: 'charts', x: 0, y: 3, w: 12, h: 20, minW: 10, minH: 14 },
    { id: 'books', x: 12, y: 0, w: 4, h: 22, minW: 4, minH: 22 },
    { id: 'orders', x: 0, y: 22, w: 16, h: 18, minW: 8, minH: 6 },
    { id: 'panels', x: 16, y: 0, w: 4, h: 22, minW: 4, minH: 18 },
    { id: 'details', x: 16, y: 0, w: 4, h: 18, minW: 4, minH: 10 },
  ],
  sm: [
    { id: 'infos', x: 0, y: 0, w: 12, h: 2, minW: 6, minH: 2 },
    { id: 'charts', x: 0, y: 3, w: 12, h: 18, minW: 10, minH: 14 },
    { id: 'books', x: 12, y: 0, w: 4, h: 20, minW: 4, minH: 20 },
    { id: 'orders', x: 0, y: 20, w: 16, h: 16, minW: 8, minH: 6 },
    { id: 'panels', x: 16, y: 0, w: 4, h: 20, minW: 4, minH: 18 },
    { id: 'details', x: 16, y: 0, w: 4, h: 16, minW: 4, minH: 10 },
  ],
  xs: [
    { id: 'infos', x: 0, y: 0, w: 12, h: 2, minW: 6, minH: 2 },
    { id: 'charts', x: 0, y: 3, w: 12, h: 18, minW: 10, minH: 14 },
    { id: 'books', x: 12, y: 0, w: 5, h: 20, minW: 5, minH: 20 },
    { id: 'orders', x: 0, y: 20, w: 17, h: 16, minW: 8, minH: 6 },
    { id: 'panels', x: 17, y: 0, w: 5, h: 20, minW: 5, minH: 18 },
    { id: 'details', x: 17, y: 0, w: 5, h: 16, minW: 5, minH: 10 },
  ],
};

function ChartDemo() {
  return (
    <main>
      <h1>ChartLayout Demo</h1>
      <LayoutWrapper
        className="container"
        breakWidgets={REACT_GRID_LAYOUT_BEDROCK}
        breakPoints={{ lg: 1920, md: 1680, sm: 1440, xs: 1280 }}
        breakCols={{ lg: 24, md: 20, sm: 20, xs: 22 }}
        breakGap={[1, 1]}
        breakRowHeight="34px"
        draggableHandle=".draggable"
        initCompact
      >
        <Widget className="box" id="infos">
          <div className="draggable">
            <hr />
          </div>
          <div>infos</div>
        </Widget>
        <Widget className="box" id="charts">
          <div className="draggable">
            <hr />
          </div>
          <div>charts</div>
        </Widget>
        <Widget className="box" id="books">
          <div className="draggable">
            <hr />
          </div>
          <div>books</div>
        </Widget>
        <Widget className="box" id="orders">
          <div className="draggable">
            <hr />
          </div>
          <div>orders</div>
        </Widget>
        <Widget className="box" id="panels">
          <div className="draggable">
            <hr />
          </div>
          <div>panels</div>
        </Widget>
        <Widget className="box" id="details">
          <div className="draggable">
            <hr />
          </div>
          <div>details</div>
        </Widget>
      </LayoutWrapper>
    </main>
  );
}

export default ChartDemo;
