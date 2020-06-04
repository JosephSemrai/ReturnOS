import React from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';

import Button from 'components/_ui/Button';
import InputBox from 'components/_ui/InputBox';

const Container = styled.div`
  margin: 5px;
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  width: 220px;
  color: ${(props) => props.theme.colors.gray[0]};
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
`;

const PageView = styled.div`
  height: 60vh;
  width: 80vw;
`;

const handleNavigate = () => {};

const InternetTraveler = () => {
  return (
    <Window
      title="Internet Traveler"
      resizable={true}
      icon={require('./images/icon.png')}
      menuItems={['File', 'Edit', 'View', 'Favorites', 'Help']}
    >
      <Container>
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

          <PageView />
        </Content>
      </Container>
    </Window>
  );
};

export default InternetTraveler;
