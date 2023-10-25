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
    { key: 'infos', x: 0, y: 0, w: 16, h: 2, minW: 6, minH: 2 },
    { key: 'charts', x: 0, y: 2, w: 12, h: 20, minW: 10, minH: 14 },
    { key: 'books', x: 12, y: 2, w: 4, h: 20, minW: 4, minH: 20 },
    { key: 'orders', x: 0, y: 22, w: 16, h: 18, minW: 8, minH: 6 },
    { key: 'panels', x: 16, y: 0, w: 4, h: 22, minW: 4, minH: 18 },
    { key: 'details', x: 16, y: 22, w: 4, h: 18, minW: 4, minH: 10 },
  ],
};

function App() {
  return (
    <main>
      <LayoutContainer
        className="container"
        breakpoints={{ lg: 1200, md: 780 }}
        cols={{ lg: 24, md: 20 }}
        draggableHandle=".draggable"
        layouts={REACT_GRID_LAYOUT_BEDROCK}
        gap={[1, 1]}
        rowHeight={34}
        isBounded
      >
        <LayoutItem className="box" itemKey="infos">
          <div className="draggable">
            <hr />
          </div>
          <div>infos</div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="charts">
          <div className="draggable">
            <hr />
          </div>
          <div>charts</div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="books">
          <div className="draggable">
            <hr />
          </div>
          <div>books</div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="orders">
          <div className="draggable">
            <hr />
          </div>
          <div>orders</div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="panels">
          <div className="draggable">
            <hr />
          </div>
          <div>panels</div>
        </LayoutItem>
        <LayoutItem className="box" itemKey="details">
          <div className="draggable">
            <hr />
          </div>
          <div>details</div>
        </LayoutItem>
      </LayoutContainer>
    </main>
  );
}

export default App;
