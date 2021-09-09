import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import Colors from '../../constants/Colors';
import UI from '../../constants/UI';

interface InputProps {
  box: boolean;
}
interface LabelProps {
  shrink: boolean;
  box: boolean;
}

const [mainColor, subColor] = ['black', 'grey'];

const inputStyles = css`
  border: none;
  border-bottom: 1px solid ${subColor};
  border-radius: 0;
  padding: 10px 10px 10px 5px;

  :focus {
    outline: none;
  }
`;
const boxInputStyles = css`
  border: 1px solid ${subColor};
  border-radius: ${UI.default_borderRadius};
  padding: 10px 15px;

  :focus {
    outline: none;
    box-shadow: 2px 5px 10px ${Colors.primary};
  }
`;

const shrinkLabel = css`
  top: -14px;
  color: ${mainColor};
  font-size: 12px;
  font-weight: normal;
`;
const shrinkLabelBox = css`
  top: -22px;
  left: 5px;
  color: ${mainColor};
  font-size: 16px;
  font-weight: normal;
`;

const getInputStyles = (props: InputProps): FlattenSimpleInterpolation => {
  if (props.box) {
    return boxInputStyles;
  }
  return inputStyles;
};

export const Group = styled.div`
  margin: 45px 0;
  position: relative;
`;

export const Label = styled.label<LabelProps>`
  position: absolute;
  top: 10px;
  left: ${props => (props.box ? '15px' : '5px')};
  color: ${subColor};
  font-size: 16px;
  font-weight: ${props => (props.box ? 'bold' : 'normal')};
  pointer-events: none;
  transition: 300ms all ease;

  ${props => props.shrink && (props.box ? shrinkLabelBox : shrinkLabel)}
`;

export const Input = styled.input<InputProps>`
  ${getInputStyles}
  background: none;
  background-color: white;
  margin: 25px 0;
  color: ${subColor};
  font-size: 18px;
  display: block;
  width: 100%;

  :focus ~ ${Label} {
    ${props => (props.box ? shrinkLabelBox : shrinkLabel)}
  }
`;
