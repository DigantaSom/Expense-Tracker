import styled from 'styled-components';

export const SpinnerOverlay = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.img`
  width: 80px;
  height: 80px;
  -webkit-animation: spin 1s ease-in-out infinite;
  animation: spin 1s ease-in-out infinite;

  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const SmallSpinner = styled.img`
  width: 20px;
  height: 20px;
`;
