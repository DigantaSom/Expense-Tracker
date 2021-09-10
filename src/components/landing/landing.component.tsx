import { FC } from 'react';

import LandingImage from '../../img/landing-image.jpg';
import {
  LandingContainer,
  LandingImageContainer,
  LandingInfo,
  ButtonContainer,
} from './landing.styles';

const DefaultLanding: FC = () => {
  return (
    <LandingContainer>
      <LandingImageContainer imageUrl={LandingImage}>
        <LandingInfo>
          <ButtonContainer to='/create-report'>
            Create a new Expense Report
          </ButtonContainer>
        </LandingInfo>
      </LandingImageContainer>
    </LandingContainer>
  );
};

export default DefaultLanding;
