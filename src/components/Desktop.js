import React from 'react';
import styled from 'styled-components';
import { IconWithLabel, ApplicationIcon } from 'components/_ui/DesktopIcon';
import Taskbar from 'components/_ui/Taskbar/Taskbar';
import useEventListener from 'lib/useEventListener';
import useTaskManager from 'lib/useTaskManager';
import useWindowManager from 'lib/useWindowManager';
import useAlert from 'lib/useAlert';

// Applications
import Minesweeper from 'components/Minesweeper';
import ProcessExplorer from 'components/ProcessExplorer';
import About from 'components/About';
import InternetTraveler from 'components/InternetTraveler';
import Terminal from 'components/Terminal';
import Alert from 'components/Alert';

const StyledDesktop = styled.div`
  display: grid;
  grid-auto-columns: 75px;
  grid-auto-rows: 75px;
  padding: 4px 0;
`;

const Desktop = () => {
  const { tasks, activeTask } = useTaskManager();
  const windows = useWindowManager(tasks, activeTask);

  useEventListener(global.document, 'contextmenu', (e) => e.preventDefault());

  const windowsAlert = useAlert();

  const icons = (
    <>
      <ApplicationIcon application={Minesweeper} />
      <ApplicationIcon application={ProcessExplorer} />
      <ApplicationIcon application={InternetTraveler} />
      <ApplicationIcon application={Terminal} />
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
    <>
      <StyledDesktop>
        {icons}
        {windows}
      </StyledDesktop>
      <Taskbar tasks={tasks} activeTask={activeTask} />
    </>
  );
};

export default Desktop;
