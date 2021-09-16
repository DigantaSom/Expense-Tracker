import styled from 'styled-components';

export const ProfileContainer = styled.div`
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

export const Form = styled.form`
  display: grid;
  grid-template-columns: 70% 30%;
  align-items: center;
  gap: 20px;

  input {
    height: 50px;

    ::placeholder {
      font-family: 'Open Sans Condensed', sans-serif;
      font-weight: bold;
    }
  }

  button {
    height: 50px;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 100%;

    .input-group {
      margin: 0;
    }
  }
`;

export const Title = styled.h1`
  margin: 10px 0 20px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 400px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 600px) {
    margin-top: 50px;
  }
`;

export const ReportTilesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
