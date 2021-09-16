import styled from 'styled-components';

export const TileContainer = styled.div`
  margin: 15px;
  transition: 250ms all ease-in-out;

  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media screen and (max-width: 320px) {
    margin: 5px;
  }
`;

export const Icon = styled.div`
  font-size: 100px;
  transition: 250ms all ease-in-out;

  @media screen and (max-width: 400px) {
    font-size: 80px;
  }
`;

export const Info = styled.div`
  text-align: center;
  padding: 7px 0;

  @media screen and (max-width: 400px) {
    font-size: 0.9rem;
  }
`;
