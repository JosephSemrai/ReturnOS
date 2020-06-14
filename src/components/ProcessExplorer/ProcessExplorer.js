import React, { useState } from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';
import useTaskManager from 'lib/useTaskManager';
import { boxShadow, recessedBoxShadow } from 'components/_ui/Shadow';
import Button from 'components/_ui/Button';

const Container = styled.div`
  margin: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  color: ${(props) => props.theme.colors.gray[0]};
`;

// TODO: Extract table outside
const TableContainer = styled.div`
  background: white;
  text-align: left;
  padding: 2px;
  box-shadow: ${(props) => recessedBoxShadow(props.theme)};
  overflow: auto;
  flex: 1;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeading = styled.th`
  margin: 24px;
  padding: 5px;
  background: ${(props) => props.theme.colors.gray[2]};
  box-shadow: ${(props) => boxShadow(props.theme)};
`;

const TableData = styled.td`
  padding: 5px;
  border-spacing: 0;
`;

const TableRow = styled.tr`
  background: ${(props) =>
    props.isSelected
      ? props.theme.colors.navy
      : 'transparent'}; /* If selected, add navy background */
  border: ${(props) =>
    props.isSelected
      ? '1px dotted black'
      : 'none'}; /* If selected, add dotted border */
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.gray[3]
      : props.theme.colors
          .gray[0]}; /* If selected, change text color to white from black */
`;

const ProcessExplorer = () => {
  // const hoverRef = useRef();
  // const isHovering = useHover(hoverRef);

  const { tasks, activeTask, endTask } = useTaskManager();
  const [selectedTask, setSelectedTask] = useState();

  const ProcessTable = (tasks) => {
    return (
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeading>Process Name</TableHeading>
              <TableHeading>PID</TableHeading>
              <TableHeading>Priority</TableHeading>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tasks).map((taskId) => (
              <TableRow
                isSelected={selectedTask === taskId} // Table row is selected if the row ID matches the selected ID
                onClick={() => setSelectedTask(taskId)}
                key={taskId}
              >
                <TableData>{tasks[taskId].application.title}</TableData>
                <TableData>{taskId}</TableData>
                <TableData>Normal</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Window
      title="Process Explorer"
      resizable={true}
      icon={require('./images/icon.png')}
      menuItems={['File', 'Edit', 'View', 'Help']}
    >
      <Container>
        <Content>
          {ProcessTable(tasks)}
          <p>
            <b>Active Task:</b> {tasks[activeTask]?.application.title} (
            {activeTask})
          </p>

          <p>
            WARNING: Pressing CTRL + W or Shutdown will shutdown your computer.
            You will lose unsaved information in all programs that are running.
          </p>
          <div
            style={{
              width: '100%',
              display: 'flex',
              textAlign: 'center'
            }}
          >
            <Button
              disabled={
                !selectedTask
              } /* If there is not a task selected, this button will be disabled */
              onClick={() => endTask(selectedTask)}
              style={{ flex: 1, textAlign: 'center' }}
            >
              End Task
            </Button>
            <Button
              onClick={() => alert('It is now safe to close this tab.')}
              style={{ flex: 1 }}
            >
              Shutdown
            </Button>
            <Button onClick={() => endTask(activeTask)} style={{ flex: 1 }}>
              Cancel
            </Button>
          </div>
        </Content>
      </Container>
    </Window>
  );
};

export default ProcessExplorer;
