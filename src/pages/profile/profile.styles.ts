import styled from 'styled-components';

export const ProfileContainer = styled.div`
  width: 850px;
  margin: 30px auto;
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
`;

export const Title = styled.h1`
  margin: 10px 0 20px;
  text-align: center;
`;

export const ReportTilesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
