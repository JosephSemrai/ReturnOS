import React from 'react';
import styled from 'styled-components';
import { IconWithLabel, ApplicationIcon } from 'components/_ui/DesktopIcon';
import Taskbar from 'components/_ui/Taskbar/Taskbar';
import useEventListener from 'lib/useEventListener';
import useTaskManager from 'lib/useTaskManager';
import useWindowManager from 'lib/useWindowManager';
import useAlert from 'lib/useAlert';
import DaemonLayer from './DaemonLayer';
// Applications
import Minesweeper from 'components/Minesweeper';
import ProcessExplorer from 'components/ProcessExplorer';
import About from 'components/About';
import InternetTraveler from 'components/InternetTraveler';
import Terminal from 'components/Terminal';
import Code from './Code';
import { taskbarHeight } from 'lib/constants';

const StyledDesktop = styled.div`
  display: grid;
  grid-auto-columns: 75px;
  grid-auto-rows: 75px;
  padding: 4px 0;
  flex: 1;
`;

const Desktop = () => {
  const { tasks, activeTask } = useTaskManager();
  const windows = useWindowManager(tasks, activeTask);
  // useHandleZoomLevel(); // Must be placed at this level
  const windowsAlert = useAlert();

  useEventListener(global.document, 'contextmenu', (e) => e.preventDefault());

  const icons = (
    <>
      <DaemonLayer />
      <ApplicationIcon application={Minesweeper} />
      <ApplicationIcon application={ProcessExplorer} />
      <ApplicationIcon application={InternetTraveler} />
      <ApplicationIcon application={Terminal} />
      <ApplicationIcon application={Code} />
      <ApplicationIcon application={About} />
      <IconWithLabel
        icon={require('components/About/images/github.png')}
        title="Alert"
        onOpen={() => windowsAlert('test')}
      />
      <IconWithLabel
        icon={require('components/About/images/github.png')}
        title="GitHub Repo"
        onOpen={() => window.open('https://github.com/josephsemrai/ReturnOS')}
      />
    </>
  );

  return (
    // <Display>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%'
      }}
    >
      <StyledDesktop>
        <DaemonLayer />
        {icons}
        {windows}
      </StyledDesktop>

      <Taskbar tasks={tasks} activeTask={activeTask} />
    </div>
    // </Display>
  );
};

export default Desktop;
