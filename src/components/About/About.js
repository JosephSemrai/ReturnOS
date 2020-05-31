import React, { useRef } from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';
import Text, { TitleText } from 'components/_ui/Text';
import useHover from 'lib/useHover';

const CINA = require('./images/cina.png');
const CINA_KID = require('./images/cina-kid.png');

const Picture = styled.img`
  align-self: flex-start;
  width: 300px;
  height: 300px;
  -webkit-touch-callout: none;
`;

const Container = styled.div`
  margin: 20px;
  display: flex;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
`;

const Subheading = styled.h1`
  font-size: 18px;
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

const Link = styled.a`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.colors.blue};
  text-decoration: underline;
  cursor: ${(props) => props.theme.cursors.pointer};
  cursor: ${(props) => props.theme.cursors.webkitPointer};
`;

const Logo = styled.img`
  width: 32px;
`;

const SocialLink = ({ icon, alt, href, children }) => {
  return (
    <Link href={href} target="_blank">
      <Logo alt={alt} src={icon} />
      <Text>{children}</Text>
    </Link>
  );
};

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const About = () => {
  const hoverRef = useRef();
  const isHovering = useHover(hoverRef);

  return (
    <Window
      title="Test"
      resizable={true}
      icon={require('./images/icon-sm.png')}
    >
      <Container>
        <Content>
          <Text>
            This is a test
            {/* Built in an effort to return to{' '}
            <Link ref={hoverRef}>simpler times</Link> by */}
          </Text>
          <TitleText as={Heading}>ReturnOS</TitleText>
          {/* <SocialLinksContainer>
            <SocialLink
              alt="Github Logo"
              icon={require('./images/github.png')}
              href="https://github.com/josephsemrai"
            />
          </SocialLinksContainer>
          <TitleText as={Subheading}>@josephsemrai</TitleText> */}
        </Content>
        {/* <Picture alt="Cina Saffary" src={isHovering ? CINA_KID : CINA} /> */}
      </Container>

      <TitleText as={Heading}>Dynamic Window Sizing Test</TitleText>
    </Window>
  );
};

export default About;
