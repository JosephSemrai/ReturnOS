import createApplication from 'lib/createApplication';
import InternetTraveler from './InternetTraveler';

export default createApplication(InternetTraveler, {
  title: 'Internet Traveler',
  iconLarge: require('./images/icon.png'),
  iconSmall: require('./images/icon.png'),
  canMaximize: true,
  x: 0,
  y: 0,
  height: 500,
  width: 800
});
