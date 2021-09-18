import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import { CustomButtonProps } from './custom-button.component';

import Colors from '../../constants/Colors';
import UI from '../../constants/UI';

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
const googleButtonStyles = css`
  background-color: ${Colors.google};
  color: white;
  border: none;

  :hover {
    background-color: ${Colors.googleDark};
  }
`;
const invertedButtonStyles = css`
  background-color: white;
  color: ${Colors.primary};
  border: 1px solid ${Colors.primary};

  :hover {
    background-color: ${Colors.primary};
    color: white;
    border: none;
  }
`;

const getButtonStyles = (props: CustomButtonProps): FlattenSimpleInterpolation => {
  if (props.isGoogleSignIn) {
    return googleButtonStyles;
  }
  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const Button = styled.button<CustomButtonProps>`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  padding: 0 35px;
  border-radius: ${props => (props.rounded ? UI.default_borderRadius : 0)};
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 15px;
  font-weight: bolder;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  ${getButtonStyles}

  @media screen and (max-width: 400px) {
    min-width: 120px;
    height: 40px;
    padding: 0 20px;
  }

  @media screen and (max-width: 315px) {
    min-width: 100px;
    padding: 0 5px;
  }
`;
