import '@zeus/react-dragger-layout/style.less';
import { LayoutContainer, LayoutItem } from '../lib';
import { Layouts } from '../lib/types';

import './App.less';

const REACT_GRID_LAYOUT_BEDROCK: Layouts = {
  lg: [
    { key: 'infos', x: 0, y: 0, w: 14, h: 2, minW: 8, minH: 2 },
    { key: 'charts', x: 0, y: 2, w: 14, h: 22, minW: 12, minH: 14 },
    { key: 'books', x: 14, y: 0, w: 5, h: 24, minW: 5, minH: 22 },
    { key: 'orders', x: 0, y: 24, w: 19, h: 20, minW: 10, minH: 8 },
    { key: 'panels', x: 19, y: 0, w: 5, h: 24, minW: 5, minH: 18 },
    { key: 'details', x: 19, y: 24, w: 5, h: 20, minW: 5, minH: 10 },
  ],
  md: [
    { key: 'infos', x: 0, y: 0, w: 12, h: 2, minW: 6, minH: 2 },
    { key: 'charts', x: 0, y: 3, w: 12, h: 20, minW: 10, minH: 14 },
    { key: 'books', x: 12, y: 0, w: 4, h: 22, minW: 4, minH: 22 },
    { key: 'orders', x: 0, y: 22, w: 16, h: 18, minW: 8, minH: 6 },
    { key: 'panels', x: 16, y: 0, w: 4, h: 22, minW: 4, minH: 18 },
    { key: 'details', x: 16, y: 0, w: 4, h: 18, minW: 4, minH: 10 },
  ],
  sm: [
    { key: 'infos', x: 0, y: 0, w: 12, h: 2, minW: 6, minH: 2 },
    { key: 'charts', x: 0, y: 3, w: 12, h: 18, minW: 10, minH: 14 },
    { key: 'books', x: 12, y: 0, w: 4, h: 20, minW: 4, minH: 20 },
    { key: 'orders', x: 0, y: 20, w: 16, h: 16, minW: 8, minH: 6 },
    { key: 'panels', x: 16, y: 0, w: 4, h: 20, minW: 4, minH: 18 },
    { key: 'details', x: 16, y: 0, w: 4, h: 16, minW: 4, minH: 10 },
  ],
  xs: [
    { key: 'infos', x: 0, y: 0, w: 12, h: 2, minW: 6, minH: 2 },
    { key: 'charts', x: 0, y: 3, w: 12, h: 18, minW: 10, minH: 14 },
    { key: 'books', x: 12, y: 0, w: 5, h: 20, minW: 5, minH: 20 },
    { key: 'orders', x: 0, y: 20, w: 17, h: 16, minW: 8, minH: 6 },
    { key: 'panels', x: 17, y: 0, w: 5, h: 20, minW: 5, minH: 18 },
    { key: 'details', x: 17, y: 0, w: 5, h: 16, minW: 5, minH: 10 },
  ],
};

function App() {
  return (
    <main>
      <LayoutContainer
        className="container"
        breakpoints={{ lg: 1920, md: 1680, sm: 1440, xs: 1280 }}
        cols={{ lg: 24, md: 20, sm: 20, xs: 22 }}
        draggableHandle=".draggable"
        layouts={REACT_GRID_LAYOUT_BEDROCK}
        gap={[1, 1]}
        rowHeight={34}
        isBounded
      >
        <LayoutItem className="box" itemKey="infos">
          <div>
            <div className="draggable">
              <hr />
            </div>
            <div>infos</div>
          </div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="charts">
          <div>
            <div className="draggable">
              <hr />
            </div>
            <div>charts</div>
          </div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="books">
          <div>
            <div className="draggable">
              <hr />
            </div>
            <div>books</div>
          </div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="orders">
          <div>
            <div className="draggable">
              <hr />
            </div>
            <div>orders</div>
          </div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="panels">
          <div>
            <div className="draggable">
              <hr />
            </div>
            <div>panels</div>
          </div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="details">
          <div>
            <div className="draggable">
              <hr />
            </div>
            <div>details</div>
          </div>
        </LayoutItem>
      </LayoutContainer>
    </main>
  );
}

export default App;
