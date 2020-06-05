import { useEffect, useState } from 'react';
import useAlert from 'lib/useAlert';

// Handles the changing Zoom level of the document (listens to it) and alerts if at a non-optimal level

const useCheckZoomLevel = () => {
  // const [show, setShow] = useState(true);
  const alertMessage = useAlert();

  useEffect(() => {
    const viewportHandler = (event) => {
      alertMessage(
        'Please note that you may experience some blurriness if your zoom level is not at 100% PRESS CANCEL TO NEVER SHOW THIS MESSAGE AGAIN'
      );
    };
    window.visualViewport.addEventListener('scroll', viewportHandler);
    window.visualViewport.addEventListener('resize', viewportHandler);
  }, []);
};

export default useCheckZoomLevel;
