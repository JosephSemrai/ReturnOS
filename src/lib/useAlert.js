import React, { useRef, useLayoutEffect } from 'react';
import Alert from 'components/Alert/Alert';
import createApplication from 'lib/createApplication';
import useTaskManager from 'lib/useTaskManager';

function useAlert() {
  const { createTask } = useTaskManager();

  return (alertMessage) => {
    // Creates application with extra application metadata (the error message in alertMessage which can be accessed via props.application.alertMessage in the Alert component)
    const application = createApplication(Alert, {
      title: 'Alert',
      iconLarge: require('../components/Alert/images/icon-lg.png'),
      iconSmall: require('../components/Alert/images/icon-sm.png'),
      canMaximize: true,
      x: 120,
      y: 120,
      alertMessage
    });

    createTask({ application });
  };
}

export default useAlert;
