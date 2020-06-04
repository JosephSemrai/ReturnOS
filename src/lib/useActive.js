import { useState, useEffect } from 'react';

export default function useActive(ref) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const onMouseDown = (e) => {
      if (e.button === 0) {
        setIsActive(true);
        document.addEventListener('mouseup', onMouseUp);
      }
    };

    const onMouseUp = (e) => {
      setIsActive(false);
      document.removeEventListener('mouseup', onMouseUp);
    };

    ref.current.addEventListener('mousedown', onMouseDown);

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current.removeEventListener('mousedown', onMouseDown);
      }
    };
    // POTENTIAL ERROR: Dependency previously ref.current, changed to ref
  }, [ref]);

  return isActive;
}
