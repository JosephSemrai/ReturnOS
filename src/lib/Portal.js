import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ parent = document.body, children }) => {
  const node = useRef(document.createElement('div'));

  useEffect(() => {
    parent && parent.appendChild(node.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      parent && parent.removeChild(node.current);
    };
  }, [parent]);

  return createPortal(children, node.current);
};

export default Portal;
