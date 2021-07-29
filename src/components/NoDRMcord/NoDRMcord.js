import React, { useState } from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';

import Button from 'components/_ui/Button';
import InputBox from 'components/_ui/InputBox';
import CatalystChat from 'catalyst-vc-react';

const ActionBar = styled.div`
  display: flex;
  flex-direction: row;
`;

const PageViewContainer = styled.div`
  width: 100%;
  flex: 1;
`;

const PageView = styled.iframe`
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  margin: 5px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const formatURL = (url) => {
  if (!/^(https?:)?\/\//i.test(url)) {
    url = 'http://' + url;
  }

  return url;
};

const InternetTraveler = () => {
  const homeURL = 'https://us15.proxysite.com';
  const proxyURL = 'https://stream.myedapp.com/?fwd=';

  const [inputURL, setInputURL] = useState();
  const [statefulURL, setStatefulURL] = useState(homeURL);

  const handleAddressChange = (e) => setInputURL(e.target.value);

  // Called when "Go" button is pressed, setting the iframe URL with the proxy URL + the input URL
  const handleUpdateStatefulURL = () => {
    setStatefulURL(proxyURL + inputURL);
  };

  return (
    <Window
      title="NoDRMCord"
      resizable={true}
      icon={require('./images/icon.png')}
      menuItems={['File', 'Edit', 'View', 'Favorites', 'Help']}
    >
      <Container>
        <ActionBar>
          <InputBox
            style={{ height: '100%', flex: 2 }}
            value={inputURL}
            onChange={handleAddressChange}
            fontSize="16px"
          />
          <Button
            onClick={handleUpdateStatefulURL}
            style={{ height: '100%', flex: 1, marginLeft: 5 }}
          >
            Go
          </Button>
        </ActionBar>

        <PageViewContainer>
          {/* <PageView src={statefulURL} /> */}
          <CatalystChat room="ARCHING_OUT" appId="ARCHING_OUT" />
        </PageViewContainer>
      </Container>
    </Window>
  );
};

export default InternetTraveler;
