import React from 'react';

const DEFAULT_APPLICATION_PROPS = {
  title: null,
  iconSmall: null,
  iconLarge: null,
  canMinimize: true,
  canMaximize: true,
  canClose: true,
  canResize: true,
  singleton: false,
  x: 50,
  y: 50,
  width: 200,
  height: 200,
  minWidth: 200,
  minHeight: 200
};

export const ApplicationContext = React.createContext(null);

// Creates application from a component
// ApplicationContext provides the system information to the component being rendered inside
// First parameter is the component to be rendered, the second parameter is the application props/options
// Returns the application props/options and theactual app component wrapped inside an object (application accessed by .AppComponent)
function createApplication(
  Component,
  applicationProps = DEFAULT_APPLICATION_PROPS
) {
  applicationProps = { ...DEFAULT_APPLICATION_PROPS, ...applicationProps };

  // Rounds the pixel/position values to avoid rendering issues when rendering in between a pixel
  applicationProps.x = Math.round(applicationProps.x);
  applicationProps.y = Math.round(applicationProps.y);
  const AppComponent = (runtimeProps = {}) => {
    // Usually is given runtimeProps by the task manager
    return (
      <ApplicationContext.Provider
        value={{ ...applicationProps, ...runtimeProps, ApplicationContext }}
      >
        <Component {...runtimeProps} />
      </ApplicationContext.Provider>
    );
  };

  return {
    ...applicationProps,
    AppComponent
  };
}

export default createApplication;
