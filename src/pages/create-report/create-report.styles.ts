import styled from 'styled-components';

export const CreateReportContainer = styled.div`
  width: 850px;
  margin: 30px auto;

  @media screen and (max-width: 900px) {
    width: 90vw;
  }

  @media screen and (max-width: 440px) {
    width: 100vw;
    padding: 0 20px;
    margin: 15px 0;
  }
`;

export const Title = styled.h1`
  margin: 10px 0;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: -10px;
  }

  @media screen and (max-width: 400px) {
    font-size: 1.3rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 400px) {
    flex-direction: column;
    align-items: unset;

    button {
      margin-bottom: 20px;
    }
  }
`;
