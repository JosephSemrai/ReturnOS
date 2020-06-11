import React from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';
import Text, { TitleText } from 'components/_ui/Text';
import Button from 'components/_ui/Button';
import useAlert from 'lib/useAlert';
import retroOcean from 'static/images/retroOcean.jpg';
import ditherBackground from 'lib/ditherBackground';

// const Picture = styled.img`
//   align-self: flex-start;
//   width: 300px;
//   height: 300px;
//   -webkit-touch-callout: none;
// `;

const Container = styled.div`
  margin: 5px;
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: white;
`;

const SubHeading = styled.h2`
  font-size: 18px;
  color: white;
`;

const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-content: center;
  padding: 20px;
  color: ${(props) => props.theme.colors.gray[0]};
  box-shadow: inset -1px 0 ${(props) => props.theme.colors.gray[3]},
    inset -2px 0 ${(props) => props.theme.colors.gray[1]};

  background: url(${retroOcean});
  background-size: cover;
  background-repeat: no-repeat;
`;

const SystemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const About = () => {
  // const hoverRef = useRef();
  // const isHovering = useHover(hoverRef);
  const windowsAlert = useAlert();

  return (
    <Window
      title="About"
      resizable={true}
      icon={require('./images/icon-sm.png')}
    >
      <Container>
        <LogoContainer>
          {/* Built in an effort to return to{' '}
            <Link ref={hoverRef}>simpler times</Link> by */}
          <TitleText as={Heading}>ReturnOS</TitleText>
          <SubHeading>Alpha Build</SubHeading>
        </LogoContainer>
        {/* <Picture alt="Cina Saffary" src={isHovering ? CINA_KID : CINA} /> */}
        <SystemInfoContainer>
          <Button onClick={() => windowsAlert('Test')}>Test Alert</Button>
          <Text style={{ color: 'black' }}>Version 0.0.1</Text>
          <Text style={{ color: 'black' }}>Running Windowing System v2</Text>
        </SystemInfoContainer>
      </Container>
    </Window>
  );
};

export default About;
