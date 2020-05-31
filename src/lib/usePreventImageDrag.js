import { useEffect } from 'react';

// Stops default drag behavior if the mousedown target is an image
function usePreventImageDragGhost() {
  useEffect(() => {
    console.log('Preventing image drag...');
    const mousedown = (e) => e.target instanceof Image && e.preventDefault();
    document.addEventListener('mousedown', mousedown);
    return () => document.removeEventListener('mousedown', mousedown);
  }, []);
}

export default usePreventImageDragGhost;
