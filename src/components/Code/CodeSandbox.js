import React, { useState } from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';

import Button from 'components/_ui/Button';
import InputBox from 'components/_ui/InputBox';

const PageViewContainer = styled.div`
  width: 100%;
  flex: 1;
`;

const PageView = styled.iframe`
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
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

const CodeSandbox = () => {
  const viewerURL = 'https://codesandbox.io/s/github/josephsemrai/returnos';

  return (
    <Window
      title="CodeSandbox"
      resizable={true}
      icon={require('./images/icon.png')}
    >
      <Container>
        {/* <ActionBar>
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
          </ActionBar> */}

        <PageViewContainer>
          <PageView src={viewerURL} />
        </PageViewContainer>
      </Container>
    </Window>
  );
};

export default CodeSandbox;
