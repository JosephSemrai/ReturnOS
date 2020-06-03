import createApplication from 'lib/createApplication';
import Terminal from './Terminal';

export default createApplication(Terminal, {
  title: 'Terminal',
  iconLarge: require('./images/icon-lg.png'),
  iconSmall: require('./images/icon-sm.png'),
  canMaximize: true,
  x: 50,
  y: 50
});
