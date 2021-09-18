import { FC } from 'react';

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
  Subtitle,
} from '../../components/error-boundary/error-boundary.styles';
import { HomeLink } from './not-found.styles';

const NotFoundPage: FC = () => {
  return (
    <ErrorImageOverlay>
      <ErrorImageContainer imageUrl='https://i.imgur.com/Q2BAOd2.png' />
      <ErrorImageText>This Page is Not on the Map!</ErrorImageText>
      <Subtitle>
        Lost your way? Go to <HomeLink to='/'>Home</HomeLink>
      </Subtitle>
    </ErrorImageOverlay>
  );
};

export default NotFoundPage;
