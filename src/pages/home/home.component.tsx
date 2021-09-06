import { FC } from 'react';

import Landing from '../../components/landing/landing.component';

import { HomeContainer } from './home.styles';

const Home: FC = () => {
  return (
    <HomeContainer>
      <Landing />
    </HomeContainer>
  );
};

export default Home;
