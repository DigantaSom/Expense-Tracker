import styled from 'styled-components';

export const SignUpContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 380px) {
    width: 90vw;

    button {
      width: 100%;
    }
  }
`;

export const Title = styled.h2`
  margin: 10px 0;
`;
