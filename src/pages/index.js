import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import win95Theme from 'lib/win95Theme';
import cursorLoadAnimation from 'lib/cursorLoadAnimation';
import Desktop from 'components/Desktop';
import TaskManager from 'components/TaskManager';
import useMouseButtonIdentifier from 'lib/useMouseButtonIdentifier';
import usePreventImageDrag from 'lib/usePreventImageDrag';
// import oceanBackground from 'static/images/retroOcean.jpg';
import ufo from 'static/images/adam2.png';

const Windows95 = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url(${ufo});
  background-size: cover;
  /* background: ${win95Theme.colors.teal}; */
  color: ${win95Theme.colors.gray[3]};
  overflow: hidden;
  font-family: ${win95Theme.fontFamilies.default};
  font-size: ${win95Theme.fontSizes[0]};
  user-select: none;
  cursor: ${win95Theme.cursors.default};
  cursor: ${win95Theme.cursors.webkitDefault};
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;

  * {
    cursor: inherit;
  }

  img {
    image-rendering: pixelated;
  }

  .isLoadingApplication & {
    animation: ${cursorLoadAnimation} 2s;
  }
`;

const Index = () => {
  useMouseButtonIdentifier();
  usePreventImageDrag();

  return (
    <Windows95>
      <ThemeProvider theme={win95Theme}>
        <TaskManager>
          <Desktop />
        </TaskManager>
      </ThemeProvider>
    </Windows95>
  );
};

export default Index;
