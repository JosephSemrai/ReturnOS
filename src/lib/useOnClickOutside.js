import { useEffect } from 'react';
import useEventListener from 'lib/useEventListener';

export function useOnMouseEventOutside(el, event, callback, options) {
  useEffect(() => {
    if ('current' in el) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      el = el.current;
    }
  });

  function handler(e) {
    if (el == null || el.contains(e.target)) return;
    callback(e);
  }

  useEventListener(document, event, handler, options);
}

export function useOnClickOutside(el, callback, options) {
  useOnMouseEventOutside(el, 'click', callback, options);
  useOnMouseEventOutside(el, 'touchend', callback, {
    passive: true,
    ...options
  });
}

export function useOnMousedownOutside(el, callback, options) {
  useOnMouseEventOutside(el, 'mousedown', callback, options);
  useOnMouseEventOutside(el, 'touchstart', callback, {
    passive: true,
    ...options
  });
}

export default useOnClickOutside;
