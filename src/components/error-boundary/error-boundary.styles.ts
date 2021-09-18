import styled, { css } from 'styled-components';

interface ErrorImageContainerProps {
  imageUrl: string;
}

export const ErrorImageOverlay = styled.div`
  /* height: calc(60vh + 70px); // 70px for the header */
  height: calc(90vh - 70px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorImageContainer = styled.div<ErrorImageContainerProps>`
  display: inline-block;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 40vh;
  height: 40vh;

  @media screen and (max-width: 400px) {
    width: 30vh;
    height: 30vh;
  }

  @media screen and (max-width: 340px) {
    width: 25vh;
    height: 25vh;
  }
`;

export const ErrorImageText = styled.h2`
  font-size: 28px;
  color: #2f8e89;
  text-align: center;

  @media screen and (max-width: 400px) {
    font-size: 22px;
  }

  @media screen and (max-width: 340px) {
    font-size: 20px;
  }
`;

export const Subtitle = styled.h3`
  color: #2f948e;
  margin: 0;
`;

// Shared with not-found.styles.ts
export const getHomeLinkStyles = css`
  background-color: #236965;
  color: white;
  padding: 7px;
  border-radius: 7px;

  :hover {
    opacity: 0.9;
  }
`;

export const HomeLink = styled.a`
  ${getHomeLinkStyles}
`;
