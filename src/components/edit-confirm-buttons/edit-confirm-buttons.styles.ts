import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const ConfirmButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

export const PositiveButton = styled(ConfirmButton)`
  background-color: #22bb33;
`;

export const NegativeButton = styled(ConfirmButton)`
  background-color: #bb2124;
`;
