import createApplication from 'lib/createApplication';
import CodeSandbox from './CodeSandbox';

export default createApplication(CodeSandbox, {
  title: 'CodeSandbox',
  iconLarge: require('./images/icon.png'),
  iconSmall: require('./images/icon.png'),
  canMaximize: true,
  x: 50,
  y: 50
});
