import * as React from 'react';
import { Layout } from '../../types';

interface PlaceholerProps {
  layout: Layout;
}

const Placeholder: React.FC<PlaceholerProps> = ({}) => {
  const placeholderRef = React.useRef<HTMLDivElement>(null);

  return <div ref={placeholderRef} className="rdl-placeholder" />;
};

export default Placeholder;
