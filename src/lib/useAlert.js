import Alert from 'components/Alert/Alert';
import createApplication from 'lib/createApplication';
import useTaskManager from 'lib/useTaskManager';

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
      x: 120,
      y: 120,
      alertMessage
    });

    createTask({ application: alertApp });
    // console.log(alertApp);
  };
}

export default useAlert;
