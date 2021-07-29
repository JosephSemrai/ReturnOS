import { useEffect, useRef } from 'react';

export function useEventListener(el, event, callback, options) {
  // const savedCallback = useRef();
  // useEffect(() => {
  //   savedCallback.current = callback;
  // });
  // useEffect(() => {
  //   if ('current' in el) {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     el = el.current;
  //   }
  // });
  // useEffect(() => {
  //   function handler(e) {
  //     savedCallback.current(e);
  //   }
  //   if (el) {
  //     el.addEventListener(event, handler, options);
  //     return () => {
  //       el.removeEventListener(event, handler, options);
  //     };
  //   }
  // }, [el, event, options]);
}

export default useEventListener;
