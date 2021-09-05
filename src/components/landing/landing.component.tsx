import { FC } from 'react';

import {
  LandingContainer,
  LandingImageContainer,
  LandingInfo,
  ButtonContainer,
} from './landing.styles';
import LandingImage from '../../img/landing-image.jpg';

const DefaultLanding: FC = () => {
  const currentUser = 'currentUser object from redux';

  return (
    <LandingContainer>
      <LandingImageContainer imageUrl={LandingImage}>
        <LandingInfo>
          <ButtonContainer to={currentUser ? '/create-report' : '/sign-in'}>
            Create a new Expense Report
          </ButtonContainer>
        </LandingInfo>
      </LandingImageContainer>
    </LandingContainer>
  );
};

export default DefaultLanding;
