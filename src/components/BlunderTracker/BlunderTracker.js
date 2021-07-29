import React, { useState } from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';
import Text, { TitleText } from 'components/_ui/Text';
import Button from 'components/_ui/Button';
import useAlert from 'lib/useAlert';
import retroOcean from 'static/images/tropicalGif.gif';
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
  margin-bottom: 0;
`;

const SubHeading = styled.h2`
  font-size: 18px;
  color: white;
  font-weight: normal;
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
  margin: 20px;
  text-align: left;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InfoText = styled.p`
  margin: 0px;
  margin-left: 20px;
  font-size: 13px;
  color: black;
`;

const InfoCategory = styled.p`
  font-size: 13px;
  margin-bottom: 4px;
  font-weight: bold;
  color: black;
`;

const About = () => {
  // const hoverRef = useRef();
  // const isHovering = useHover(hoverRef);
  const windowsAlert = useAlert();

  const [jakeBlunder, setJakeBlunder] = useState(0);
  const [kaiBlunder, setKaiBlunder] = useState(0);
  const [adamBlunder, setAdamBlunder] = useState(0);
  const [tristanBlunder, setTristanBlunder] = useState(0);
  const [joeBlunder, setJoeBlunder] = useState(0);

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
          <Heading>ArchOS</Heading>
          <SubHeading>Alpha Build</SubHeading>
        </LogoContainer>
        {/* <Picture alt="Cina Saffary" src={isHovering ? CINA_KID : CINA} /> */}
        <SystemInfoContainer>
          <Button onClick={() => windowsAlert('Test')}>Test Alert</Button>
          <InfoCategory>System Information:</InfoCategory>
          <InfoText>OS Version 1.2.0</InfoText>
          <InfoText>Running Windowing System v4</InfoText>

          <InfoCategory>Enabled Experimental Features:</InfoCategory>
          <InfoText>Minimize Hotfix</InfoText>
          <InfoText>Window Maximization Beta</InfoText>
        </SystemInfoContainer>
      </Container>
    </Window>
  );
};

export default About;
