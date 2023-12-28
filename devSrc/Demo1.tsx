import { Layout, Widget } from '../lib';
import type { IWidget } from '../lib/types';
import styled from 'styled-components';
import LayoutContainer from '../oldlib/components/LayoutContainer';
import LayoutItem from '../oldlib/components/LayoutItem';

const Wrapper = styled.main`
  padding: 10px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: #c2c2c2;
  hr {
    border: none;
    border-top: 1px solid #c4cf8c;
  }
  h1 + div {
    padding: -0.5px;
    overflow: hidden;
  }
`;

const LayoutWrapper = styled(Layout)`
  background-color: #c4cf8c;
  .box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    > div:not(.draggable) {
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

const layout: IWidget[] = [
  { id: 'item1', x: 0, y: 0, w: 2, h: 2 },
  { id: 'item2', x: 2, y: 0, w: 2, h: 2 },
  { id: 'item3', x: 4, y: 0, w: 2, h: 2 },
  { id: 'item4', x: 6, y: 0, w: 2, h: 2 },
  { id: 'item5', x: 0, y: 2, w: 4, h: 2 },
  { id: 'item6', x: 4, y: 2, w: 4, h: 2, static: true },
];

function Demo1() {
  return (
    <Wrapper>
      <h1>Demo1</h1>
      {/* <hr /> */}
      <div>
        <LayoutWrapper
          className="container"
          col={16}
          draggableHandle=".draggable"
          widgets={layout}
          gap={[1, 1]}
          // compactType="vertical"
        >
          <Widget className="box" id="item1">
            <div className="draggable" />
            <div>item1</div>
          </Widget>
          <Widget className="box" id="item2">
            <div className="draggable" />
            <div>item2</div>
          </Widget>
          <Widget className="box" id="item3">
            <div className="draggable" />
            <div>item3</div>
          </Widget>
          <Widget className="box" id="item4">
            <div className="draggable" />
            <div>item4</div>
          </Widget>
          <Widget className="box" id="item5">
            <div className="draggable" />
            <div>item5</div>
          </Widget>
          <Widget className="box" id="item6">
            <div>item6 [static]</div>
          </Widget>
        </LayoutWrapper>
        {/* <LayoutWrapper
          className="container"
          col={8}
          draggableHandle=".draggable"
          layouts={layout}
          gap={[8, 8]}
          // compactType="vertical"
        >
          <LayoutItem className="box" id="item1">
            <div className="draggable" />
            <div>item1</div>
          </LayoutItem>
          <LayoutItem className="box" id="item2">
            <div className="draggable" />
            <div>item2</div>
          </LayoutItem>
          <LayoutItem className="box" id="item3">
            <div className="draggable" />
            <div>item3</div>
          </LayoutItem>
          <LayoutItem className="box" id="item4">
            <div className="draggable" />
            <div>item4</div>
          </LayoutItem>
          <LayoutItem className="box" id="item5">
            <div className="draggable" />
            <div>item5</div>
          </LayoutItem>
          <LayoutItem className="box" id="item6">
            <div>item6 [static]</div>
          </LayoutItem>
        </LayoutWrapper> */}
      </div>
    </Wrapper>
  );
}

export default Demo1;
