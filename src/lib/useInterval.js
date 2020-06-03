import { useEffect } from 'react';

// TODO: Address potential errors that arise from the dependency array (static verification issue)
export default function useInterval(callback, time, inputs = []) {
  useEffect(() => {
    const interval = setInterval(callback, time);
    return () => clearInterval(interval);
  }, [callback, time, inputs]);
}
