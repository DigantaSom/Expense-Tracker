import { FC } from 'react';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import LandingImage from '../../img/landing-image.jpg';
import getFirstName from '../../utils/getFirstName';

import {
  LandingContainer,
  LandingImageContainer,
  LandingInfo,
  LandingTitle,
  ButtonContainer,
} from './landing.styles';

const DefaultLanding: FC = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <LandingContainer>
      <LandingImageContainer imageUrl={LandingImage}>
        <LandingInfo>
          {currentUser && (
            <LandingTitle data-aos='zoom-in-up' data-aos-duration='500'>
              Hi, {getFirstName(currentUser.displayName)}!
            </LandingTitle>
          )}
          <ButtonContainer
            to='/create-report'
            data-aos='zoom-in-up'
            data-aos-duration='800'>
            Create a new Expense Report
          </ButtonContainer>
        </LandingInfo>
      </LandingImageContainer>
    </LandingContainer>
  );
};

export default DefaultLanding;
