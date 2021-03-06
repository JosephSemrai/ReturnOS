import React from 'react';
import styled from 'styled-components';
import StartButton from './StartButton';
import SystemTray from './SystemTray';
import Task from './Task';
import { taskbarHeight } from 'lib/constants';

const StyledTaskbar = styled.div`
  display: flex;
  left: 0;
  right: 0;
  height: ${taskbarHeight}px;
  min-height: ${taskbarHeight}px;
  flex-basis: ${taskbarHeight}px;
  padding-top: 2px;
  display: flex;
  background: ${(props) => props.theme.colors.gray[2]};
  box-shadow: inset 0 1px ${(props) => props.theme.colors.gray[2]},
    inset 0 2px ${(props) => props.theme.colors.gray[3]};
  color: ${(props) => props.theme.colors.gray[0]};
`;

const Taskbar = ({ tasks, activeTask }) => (
  <StyledTaskbar>
    <StartButton />
    {Object.values(tasks)
      .filter((task) => task.application.canMinimize)
      .map((task) => (
        <Task
          key={task.id}
          id={task.id}
          ref={task.taskbarRef}
          title={task.application.title}
          icon={task.application.iconSmall}
          isActive={task.id === activeTask}
        />
      ))}
    <SystemTray />
  </StyledTaskbar>
);

export default Taskbar;
