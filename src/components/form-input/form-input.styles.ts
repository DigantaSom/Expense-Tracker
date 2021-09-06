import styled, { css } from 'styled-components';

interface LabelProps {
  shrink: boolean;
}

const [mainColor, subColor] = ['black', 'grey'];

const shrinkLabel = css`
  color: ${mainColor};
  font-size: 12px;
  top: -14px;
`;

export const Group = styled.div`
  margin: 45px 0;
  position: relative;
`;

export const Label = styled.label<LabelProps>`
  position: absolute;
  top: 10px;
  left: 5px;
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  pointer-events: none;
  transition: 300ms all ease;

  ${props => props.shrink && shrinkLabel}
`;

export const Input = styled.input`
  background: none;
  background-color: white;
  border: none;
  border-bottom: 1px solid ${subColor};
  border-radius: 0;
  margin: 25px 0;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;

  :focus {
    outline: none;
  }

  :focus ~ ${Label} {
    ${shrinkLabel}
  }
`;
