import { LayoutContainer, LayoutItem } from '../lib';
import { Layouts } from '../lib/types';
import styled from 'styled-components';

const LayoutWrapper = styled(LayoutContainer)`
  background-color: #c4cf8c;
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
    width: 40px;
    height: 4px;
    background-color: #eee;
    border-radius: 2px;
    cursor: grab;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #00ba3d;
    }
  }
`;

const REACT_GRID_LAYOUT_BEDROCK: Layouts = {
  xs: [
    { key: 'item1', x: 0, y: 0, w: 2, h: 2 },
    { key: 'item2', x: 2, y: 0, w: 2, h: 2 },
    { key: 'item3', x: 4, y: 0, w: 2, h: 2 },
    { key: 'item4', x: 6, y: 0, w: 2, h: 2 },
    { key: 'item5', x: 0, y: 2, w: 4, h: 2 },
    { key: 'item6', x: 4, y: 2, w: 4, h: 2 },
  ],
};

function Demo1() {
  console.log('demo1 ===========');

  return (
    <main>
      <h1>Demo1</h1>
      <LayoutWrapper
        className="container"
        breakpoints={{ xs: 780 }}
        cols={{ xs: 12 }}
        draggableHandle=".draggable"
        layouts={REACT_GRID_LAYOUT_BEDROCK}
        gap={[8, 8]}
        isBounded
      >
        <LayoutItem className="box" itemKey="item1">
          <div className="draggable" />
          <div>item1</div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="item2">
          <div className="draggable" />
          <div>item2</div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="item3">
          <div className="draggable" />
          <div>item3</div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="item4">
          <div className="draggable" />
          <div>item4</div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="item5">
          <div className="draggable" />
          <div>item5</div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="item6">
          <div className="draggable" />
          <div>item6</div>
        </LayoutItem>
      </LayoutWrapper>
    </main>
  );
}

export default Demo1;
