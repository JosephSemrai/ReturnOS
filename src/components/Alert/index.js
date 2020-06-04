import createApplication from 'lib/createApplication';
import Alert from './Alert';

export default createApplication(Alert, {
  title: 'Alert',
  iconLarge: require('./images/icon-lg.png'),
  iconSmall: require('./images/icon-sm.png'),
  canMaximize: true,
  x: 120,
  y: 120
});

// See useAlert for custom logic
