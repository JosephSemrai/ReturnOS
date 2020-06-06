import Alert from 'components/Alert/Alert';
import createApplication from 'lib/createApplication';
import useTaskManager from 'lib/useTaskManager';
import { desktopHeight, desktopWidth } from './constants';

function useAlert() {
  const { createTask } = useTaskManager();

  // console.log(createTask);
  // console.log(createApplication);

  // Dependent on the current create task context (createApplication must be updated)
  return (alertMessage) => {
    // Creates application with extra application metadata (the error message in alertMessage which can be accessed via props.application.alertMessage in the Alert component)
    const alertApp = createApplication(Alert, {
      title: 'Alert',
      iconLarge: require('../components/Alert/images/icon-lg.png'),
      iconSmall: require('../components/Alert/images/icon-sm.png'),
      canMaximize: true,
      x: desktopWidth / 2 - 100,
      y: desktopHeight / 2 - 100,
      alertMessage
    });

    createTask({ application: alertApp });
    // console.log(alertApp);
  };
}

export default useAlert;
