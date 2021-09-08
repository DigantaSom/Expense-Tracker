import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import Spinner from '../../components/spinner/spinner.component';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { Container } from './sign-in-and-sign-up.styles';

const SignInAndSignUp: FC = () => {
  const { loading: userLoading } = useSelector((state: RootState) => state.user);

  if (userLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <SignIn />
      <SignUp />
    </Container>
  );
};

export default SignInAndSignUp;
