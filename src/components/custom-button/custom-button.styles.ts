import styled, { css } from 'styled-components';

import Colors from '../../constants/Colors';
import { CustomButtonProps } from './custom-button.component';

const buttonStyles = css`
  background-color: ${Colors.primary};
  color: white;
  border: none;

  :hover {
    border: 1px solid ${Colors.primary};
    background-color: white;
    color: ${Colors.primary};
  }
`;

const googleSignInStyles = css`
  background-color: ${Colors.google};
  color: white;
  border: none;

  :hover {
    background-color: ${Colors.googleDark};
  }
`;

const getButtonStyles = (props: CustomButtonProps) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }
  return buttonStyles;
};

export const Button = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 15px;
  font-weight: bolder;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${getButtonStyles}
`;
