import React, { useEffect } from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';
import useAudio from 'lib/useAudio';
import Text, { TitleText } from 'components/_ui/Text';
import alertImage from './images/icon-lg.png';
import Button from 'components/_ui/Button';
import { ResizableBox } from 'react-resizable';

// const Picture = styled.img`
//   align-self: flex-start;
//   width: 300px;
//   height: 300px;
//   -webkit-touch-callout: none;
// `;

const Container = styled.div`
  margin: 20px;
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 220px;
  color: ${(props) => props.theme.colors.gray[0]};
`;

const AlertIcon = styled.img``;

const Alert = (props) => {
  const alertSound = useAudio(require('../../static/sounds/alert.wav'));

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
        <AlertIcon src={alertImage} />
        <Content>
          {props.application.alertMessage
            ? props.application.alertMessage
            : 'Alert. Something happened.'}
          <Button>Ok.</Button>
        </Content>

        <div>
          <ResizableBox
            className="custom-box box"
            width={200}
            height={200}
            handleSize={[10, 10]}
            resizeHandles={['se', 'sw', 'ne', 'nw']}
          >
            <span className="text">Test</span>
          </ResizableBox>
        </div>
      </Container>
    </Window>
  );
};

export default Alert;
