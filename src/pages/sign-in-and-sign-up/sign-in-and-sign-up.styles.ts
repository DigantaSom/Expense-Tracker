import styled from 'styled-components';

export const Container = styled.div`
  width: 850px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;

  h1 {
    margin: 0;
  }

  @media screen and (max-width: 900px) {
    width: 90vw;
  }

  @media screen and (max-width: 880px) {
    flex-direction: column;
    align-items: center;
  }

  /* @media screen and (max-width: 440px) {
    width: 100vw;
    padding: 0 20px;
  } */
  @media screen and (max-width: 400px) {
    width: 90vw;
  }
`;
