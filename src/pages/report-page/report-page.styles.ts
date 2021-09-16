import styled from 'styled-components';

export const ReportPageContainer = styled.div`
  width: 850px;
  margin: 30px auto;

  @media screen and (max-width: 900px) {
    width: 90vw;
  }

  @media screen and (max-width: 440px) {
    width: 100vw;
    padding: 0 20px;
  }
`;

export const Title = styled.h1`
  margin: 10px 0;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 400px) {
    font-size: 1.3rem;
  }
`;
