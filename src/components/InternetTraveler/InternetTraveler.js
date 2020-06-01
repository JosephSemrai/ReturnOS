import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Window from 'components/_ui/Window/Window';
import Text, { TitleText } from 'components/_ui/Text';
import useHover from 'lib/useHover';
import useTaskManager from 'lib/useTaskManager';
import { boxShadow, recessedBoxShadow } from 'components/_ui/Shadow';
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

// TODO: Extract table outside
const TableContainer = styled.div`
  background: white;
  text-align: left;
  padding: 2px;
  box-shadow: ${(props) => recessedBoxShadow(props.theme)};
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeading = styled.th`
  margin: 24px;
  padding: 5px;
  background: ${(props) => props.theme.colors.gray[2]};
  box-shadow: ${(props) => boxShadow(props.theme)};
`;

const TableData = styled.td`
  padding: 5px;
  border-spacing: 0;
`;

const TableRow = styled.tr`
  background: ${(props) =>
    props.isSelected
      ? props.theme.colors.navy
      : 'transparent'}; /* If selected, add navy background */
  border: ${(props) =>
    props.isSelected
      ? '1px dotted black'
      : 'none'}; /* If selected, add dotted border */
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.gray[3]
      : props.theme.colors
          .gray[0]}; /* If selected, change text color to white from black */
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
