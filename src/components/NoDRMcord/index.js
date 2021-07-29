import createApplication from 'lib/createApplication';
import NoDRMcord from './NoDRMcord';

export default createApplication(NoDRMcord, {
  title: 'NoDRMcord',
  iconLarge: require('./images/icon.png'),
  iconSmall: require('./images/icon.png'),
  canMaximize: true,
  x: 0,
  y: 0,
  height: 500,
  width: 800
});
