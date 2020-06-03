import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Frame from 'react-frame-component';

import { DosFactory } from 'js-dos';
require('js-dos');
const Dos = (window as any).Dos as DosFactory;

const FullCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const JsDos: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref !== null) {
      const ciPromise = Dos(ref.current as HTMLCanvasElement, {
        wdosboxUrl: 'https://js-dos.com/6.22/current/wdosbox.js',
        cycles: 1000
      }).then((runtime) => {
        return runtime.fs
          .extract('https://js-dos.com/6.22/current/test/digger.zip')
          .then(() => {
            return runtime.main(['-c', 'HELP']);
          });
      });

      return () => {
        ciPromise.then((ci) => ci.exit());
      };
    }
  }, [ref]);

  return (
    // <Frame>
    <FullCanvas ref={ref} />
    // </Frame>
  );
};

export default JsDos;
