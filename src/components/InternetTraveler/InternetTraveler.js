import React, { useState } from 'react';
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
  color: ${(props) => props.theme.colors.gray[0]};
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
`;

const PageView = styled.iframe`
  height: 60vh;
  width: 80vw;
`;

const formatURL = (url) => {
  if (!/^(https?:)?\/\//i.test(url)) {
    url = 'http://' + url;
  }

  return url;
};

const InternetTraveler = () => {
  const proxyURL = 'https://us15.proxysite.com/process.php?d=';
  const homeURL = 'https://google.com';

  const [inputURL, setInputURL] = useState();
  const [statefulURL, setStatefulURL] = useState(proxyURL + homeURL);

  const handleAddressChange = (e) => setInputURL(e.target.value);

  // Called when "Go" button is pressed, setting the iframe URL with the proxy URL + the input URL
  const handleUpdateStatefulURL = () => {
    setStatefulURL(proxyURL + inputURL);
  };

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
            <InputBox
              style={{ height: '100%', flex: 2 }}
              value={inputURL}
              onChange={handleAddressChange}
              fontSize="16px"
            />{' '}
            <Button
              onClick={handleUpdateStatefulURL}
              style={{ height: '100%', flex: 1, marginLeft: 5 }}
            >
              Go
            </Button>
          </ActionBar>

          <PageView src={statefulURL} />
        </Content>
      </Container>
    </Window>
  );
};

export default InternetTraveler;
