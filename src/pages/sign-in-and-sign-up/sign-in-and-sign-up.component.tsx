import { FC } from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { Container } from './sign-in-and-sign-up.styles';

const SignInAndSignUp: FC = () => {
  return (
    <Container>
      <SignIn />
      <SignUp />
    </Container>
  );
};

export default SignInAndSignUp;
