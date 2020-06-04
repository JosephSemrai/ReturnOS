import styled from 'styled-components';
import { recessedBoxShadow } from 'components/_ui/Shadow';

const InputBox = styled.input`
  background: white;
  text-align: left;
  padding: 6px;
  border: none;
  outline: none;
  box-shadow: ${(props) => recessedBoxShadow(props.theme)};
  font-size: ${(props) => props.fontSize || props.theme.fontSizes[1]};
  font-family: ${(props) => props.theme.fontFamilies.default};

  textarea:focus,
  input:focus {
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  ::selection {
    color: none;
    background: none;
    border: none;
    outline: none;
  }
`;

export default InputBox;
