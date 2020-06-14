import React, { useState, useEffect } from 'react';
import { TitleBar } from './TitleBar';
import styled from 'styled-components';
import useBoundingRect from 'lib/useBoundingRect';

const StyledTitleBarTransition = styled(TitleBar)`
  position: fixed;
  top: ${(props) => props.top}px;
  right: ${(props) => props.right}px;
  left: ${(props) => props.left}px;
  transition: 300ms steps(20);
  transition-property: top, right, left;
  will-change: top, right, left;
  z-index: 1;
`;

function getPosition({ top, right, left }) {
  return {
    top,
    right: window.innerWidth - right,
    left
  };
}

const TitleBarTransition = React.forwardRef(
  ({ icon, title, srcRef, destRef }, ref) => {
    const srcBounds = useBoundingRect(srcRef);
    const destBounds = useBoundingRect(destRef);
    const [position, setPosition] = useState(getPosition(srcBounds));
    // TODO: Figure out why bounds is set every time despite staying the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setPosition(getPosition(destBounds)), []);
    console.log('Src ref', srcRef, srcRef.current.getBoundingClientRect());
    console.log('Dest ref', destRef, destRef.current.getBoundingClientRect());

    return (
      <StyledTitleBarTransition
        {...position}
        active={true}
        ref={ref}
        icon={icon}
        title={title}
      />
    );
  }
);

export default TitleBarTransition;
