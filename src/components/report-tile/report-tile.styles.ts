import styled from 'styled-components';

export const TileContainer = styled.div`
  margin: 15px;
  transition: 250ms all ease-in-out;

  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const Icon = styled.div`
  font-size: 100px;
  transition: 250ms all ease-in-out;
`;

export const Info = styled.div`
  text-align: center;
  padding: 7px 0;
`;
