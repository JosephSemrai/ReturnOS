import React from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';
import Text, { TitleText } from 'components/_ui/Text';

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

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 220px;
  margin-right: 20px;
  padding-right: 20px;
  color: ${(props) => props.theme.colors.gray[0]};
  box-shadow: inset -1px 0 ${(props) => props.theme.colors.gray[3]},
    inset -2px 0 ${(props) => props.theme.colors.gray[1]};
`;

const Alert = (props) => {
  return (
    <Window
      title="Alert"
      resizable={true}
      icon={require('./images/icon-sm.png')}
    >
      <Container>
        <Content>
          <TitleText as={Heading}>ReturnOS</TitleText>
          {props.application.alertMessage
            ? props.application.alertMessage
            : 'Alert. Something happened.'}
        </Content>
        <Text style={{ color: 'black' }}>Version 0.0.1</Text>
      </Container>
    </Window>
  );
};

export default Alert;