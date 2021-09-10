import { FC, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { clearReport } from '../../redux/report/report.actions';

import Landing from '../../components/landing/landing.component';

import { HomeContainer } from './home.styles';

const Home: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearReport());
  }, [dispatch]);

  return (
    <HomeContainer>
      <Landing />
    </HomeContainer>
  );
};

export default Home;
