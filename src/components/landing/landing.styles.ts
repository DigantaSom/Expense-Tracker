import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Colors from '../../constants/Colors';

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

  @media screen and (max-width: 440px) {
    padding: 0 20px;
  }
`;

export const ButtonContainer = styled(Link)`
  background-color: ${Colors.primary};
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.8);
  display: flex;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
    padding: 0.6rem 1.2rem;
  }

  @media screen and (max-width: 360px) {
    font-size: 1.2rem;
    padding: 0.5rem;
  }
`;
