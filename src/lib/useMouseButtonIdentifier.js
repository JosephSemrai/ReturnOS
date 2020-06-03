import { useState, useLayoutEffect } from 'react';

function useMouseButtonIdentifier() {
  const [button, setButton] = useState(null);
  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      const mousedown = (e) => {
        setButton(e.button);

        // Shifted logic to add event listeners to determine what kind of click the user is performing
        const checkRight = (e) =>
          e.button === 2
            ? document.body.classList.add('isRightClicking')
            : null;
        const checkOthers = (e) =>
          e.button === 1
            ? document.body.classList.add('isMiddleClicking')
            : checkRight(e);
        e.button === 0
          ? document.body.classList.add('isLeftClicking')
          : checkOthers(e);
      };

      const mouseup = (e) => {
        setButton(null);
        document.body.classList.remove(
          'isLeftClicking',
          'isMiddleClicking',
          'isRightClicking'
        );
      };

      document.addEventListener('mousedown', mousedown);
      document.addEventListener('mouseup', mouseup);

      return () => {
        document.addEventListener('mousedown', mousedown);
        document.addEventListener('mouseup', mouseup);
        document.body.classList.remove(
          'isLeftClicking',
          'isMiddleClicking',
          'isRightClicking'
        );
      };
    }
  }, []);

  return button;
}

export default useMouseButtonIdentifier;
