import createApplication from 'lib/createApplication';
import BlunderTracker from './BlunderTracker';

export default createApplication(BlunderTracker, {
  title: 'Blunder Tracker',
  iconLarge: require('./images/icon-lg.png'),
  iconSmall: require('./images/icon-sm.png'),
  canMaximize: true,
  x: 120,
  y: 120,
  minHeight: 300,
  minWidth: 500
});
