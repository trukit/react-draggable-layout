import type { BreakPoints } from '../../types';
import { LayoutContainerProps } from '../LayoutContainer';

interface LayoutBreakPoint extends LayoutContainerProps {
  /** 页面适配，例如： { lg: 1920, md: 1680, sm: 1440, xs: 1280 } */
  breakpoints?: BreakPoints;
}
