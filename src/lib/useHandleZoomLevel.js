import { useEffect, useState } from 'react';

// Handles the changing Zoom level of the document (listens to it) and alerts if at a non-optimal level

const useCheckZoomLevel = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const viewportHandler = (event) => {
      // var viewport = event.target;
      if (show) {
        // eslint-disable-next-line no-restricted-globals
        let confirmResponse = confirm(
          'Please note that you may experience some blurriness if your zoom level is not at 100% PRESS CANCEL TO NEVER SHOW THIS MESSAGE AGAIN' +
            show
        );

        setShow(confirmResponse);
      }
    };
    window.visualViewport.addEventListener('scroll', viewportHandler);
    window.visualViewport.addEventListener('resize', viewportHandler);
  }, [show]);
};

export default useCheckZoomLevel;
