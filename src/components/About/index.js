import createApplication from 'lib/createApplication';
import About from './About';

export default createApplication(About, {
  title: 'About',
  iconLarge: require('./images/icon-lg.png'),
  iconSmall: require('./images/icon-sm.png'),
  canMaximize: true,
  x: 120,
  y: 120,
  minHeight: 300,
  minWidth: 500
});
