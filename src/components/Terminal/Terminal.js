import React from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';
import Button from 'components/_ui/Button';
import InputBox from 'components/_ui/InputBox';
import JsDos from './jsDos';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 700px;
  text-align: left;
  color: ${(props) => props.theme.colors.gray[0]};
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
`;

const handleNavigate = () => {};

const Terminal = () => {
  return (
    <Window
      title="Terminal"
      resizable={true}
      icon={require('./images/icon-sm.png')}
      menuItems={['File']}
    >
      <Content>
        <ActionBar>
          <InputBox style={{ height: '100%', flex: 2 }} fontSize="16px" />{' '}
          <Button
            onClick={handleNavigate}
            style={{ height: '100%', flex: 1, marginLeft: 5 }}
          >
            Go
          </Button>
        </ActionBar>
        {/* <IFrame> */}
        {/* <Frame> */}
        <JsDos />
        {/* </Frame> */}
        {/* </IFrame> */}
      </Content>
    </Window>
  );
};

export default Terminal;
