import createApplication from 'lib/createApplication';
import ProcessExplorer from './ProcessExplorer';

export default createApplication(ProcessExplorer, {
  title: 'Process Explorer',
  iconLarge: require('./images/icon.png'),
  iconSmall: require('./images/icon.png'),
  canMaximize: false,
  x: 120,
  y: 120
});
