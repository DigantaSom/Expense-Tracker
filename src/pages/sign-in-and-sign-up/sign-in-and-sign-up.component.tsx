import { FC, useEffect } from 'react';

import AOS from 'aos';

import { useSelector } from 'react-redux';
import { selectUserLoading } from '../../redux/user/user.selectors';

import Spinner from '../../components/spinner/spinner.component';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { Container } from './sign-in-and-sign-up.styles';

const SignInAndSignUp: FC = () => {
  const userLoading = useSelector(selectUserLoading);

  // to avoid getting blank screen, when user comes to this page by changing url
  useEffect(() => {
    AOS.init();
  }, []);

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
