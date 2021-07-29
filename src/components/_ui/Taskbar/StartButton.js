import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { TitleText } from 'components/_ui/Text';
import TaskbarButton, { taskActiveBoxShadow } from './TaskbarButton';
import TaskbarIcon from './TaskbarIcon';
import useAudio from 'lib/useAudio';

const StyledStartButton = styled(TaskbarButton)`
  flex: none;
  width: auto;
  margin: 2px;
  padding: 0 4px;

  .isLeftClicking &:active {
    box-shadow: ${(props) => taskActiveBoxShadow(props.theme)};
    padding: 1px 3px 0 5px;
  }

  :focus:after {
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    right: 3px;
    bottom: 3px;
    left: 3px;
    border: 1px dotted ${(props) => props.theme.colors.gray[0]};
  }
`;

const StartButton = () => {
  const startupSound = useAudio(
    require('../../../static/sounds/adam_weird.mp3')
  );
  const onClick = useCallback(
    () => (startupSound.paused ? startupSound.play() : startupSound.load()),
    [startupSound]
  );

  // When the StartButton loads in, play the startup sound
  useEffect(() => {
    startupSound.play();
  }, [startupSound]);

  return (
    <StyledStartButton onClick={onClick}>
      <TaskbarIcon src={require('./start.png')} />
      <TitleText>Start</TitleText>
    </StyledStartButton>
  );
};

export default StartButton;
