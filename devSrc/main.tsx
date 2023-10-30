import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChartDemo from './ChartDemo.tsx';
import Demo1 from './Demo1.tsx';

import '@zeus/react-dragger-layout/style.less';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Demo1 />,
  },
  {
    path: '/chart',
    element: <ChartDemo />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
