import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface LandingImageContainerProps {
  imageUrl: string;
}

export const LandingContainer = styled.div``;

export const LandingImageContainer = styled.div<LandingImageContainerProps>`
  height: calc(100vh - 70px); // 70px is the height of the header
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LandingInfo = styled.div`
  transition: 500ms all ease-out;

  :hover {
    transform: scale(1.1);
  }
`;

export const ButtonContainer = styled(Link)`
  background-color: #168118;
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.8);
`;
