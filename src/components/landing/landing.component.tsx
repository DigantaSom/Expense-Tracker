import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  LandingContainer,
  LandingImageContainer,
  LandingInfo,
  ButtonContainer,
} from './landing.styles';
import LandingImage from '../../img/landing-image.jpg';

const DefaultLanding: FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

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
