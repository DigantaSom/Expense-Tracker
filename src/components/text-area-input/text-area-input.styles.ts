import styled from 'styled-components';

import Colors from '../../constants/Colors';
import UI from '../../constants/UI';

export const TextAreaInputContainer = styled.textarea`
  background: none;
  background-color: white;
  margin: 10px 0;
  color: gray;
  font-size: 17px;
  display: block;
  width: 100%;
  border: 1px solid gray;
  border-radius: ${UI.default_borderRadius};
  padding: 10px 15px;

  :focus {
    outline: none;
    box-shadow: 2px 5px 10px ${Colors.primary};
  }

  @media screen and (max-width: 768px) {
    margin: 5px 0;
  }
`;
