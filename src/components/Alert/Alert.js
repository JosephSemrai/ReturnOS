import React, { useEffect } from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';
import useAudio from 'lib/useAudio';
import Text, { TitleText } from 'components/_ui/Text';
import alertImage from './images/icon-lg.png';
import Button from 'components/_ui/Button';
import { ResizableBox } from 'react-resizable';
import useTaskManager from 'lib/useTaskManager';

// const Picture = styled.img`
//   align-self: flex-start;
//   width: 300px;
//   height: 300px;
//   -webkit-touch-callout: none;
// `;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
  padding: 30px;
  color: ${(props) => props.theme.colors.gray[0]};
  font-size: 14px;
`;

const AlertIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;

const ConfirmButton = styled(Button)`
  width: 80px;
`;

const Alert = (props) => {
  const alertSound = useAudio(require('../../static/sounds/alert.wav'));
  const { tasks, activeTask, endTask } = useTaskManager();

  useEffect(() => {
    alertSound.play();
  }, [alertSound]);

  return (
    <Window
      title="Alert"
      resizable={true}
      icon={require('./images/icon-sm.png')}
    >
      <Container>
        <Content>
          <AlertIcon src={alertImage} />

          {props.application.alertMessage
            ? props.application.alertMessage
            : 'Alert. Something happened. Try repeating your action.'}
        </Content>
        <ConfirmButton onClick={() => endTask(activeTask)}>OK</ConfirmButton>
      </Container>
    </Window>
  );
};

export default Alert;
