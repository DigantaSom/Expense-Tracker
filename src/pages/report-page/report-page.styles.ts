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

  @media screen and (max-width: 310px) {
    padding: 0 10px;
  }

  @media screen and (max-width: 290px) {
    padding: 0 5px;
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

export const Info = styled.div`
  margin-top: 25px;
  text-align: center;
`;

export const SubTitle = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;

  @media screen and (max-width: 400px) {
    font-size: 1.1rem;
    margin: 5px 0;
  }
`;
