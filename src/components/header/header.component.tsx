import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { signOutAction } from '../../redux/user/user.actions';

import { HeaderContainer, Logo, OptionsContainer, OptionLink } from './header.styles';

const Header: FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const guestLinks = <OptionLink to='/sign-in'>Sign In</OptionLink>;

  const authLinks = (
    <>
      <OptionLink to='/create-report'>Create</OptionLink>
      <OptionLink to='/profile'>My Profile</OptionLink>
      <OptionLink as='div' onClick={() => dispatch(signOutAction())}>
        Sign Out
      </OptionLink>
    </>
  );

  return (
    <HeaderContainer>
      <Logo to='/'>💰 Expense Tracker</Logo>
      <OptionsContainer>{currentUser ? authLinks : guestLinks}</OptionsContainer>
    </HeaderContainer>
  );
};

export default Header;
