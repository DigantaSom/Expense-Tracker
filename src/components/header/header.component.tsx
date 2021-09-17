import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { signOutAction } from '../../redux/user/user.actions';

import { FaPlus } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

import NoDp from '../../img/no-dp.jpg';

import {
  HeaderContainer,
  LogoContainer,
  LogoTextSmallScreen,
  OptionsContainer,
  OptionLink,
  OptionLinkSmallerScreen,
  OptionLinkSmallerScreenText,
  OptionLinkSmallerScreenImage,
} from './header.styles';

const Header: FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const guestLinks = (
    <>
      <OptionLink to='/sign-in'>Sign In</OptionLink>
      <OptionLinkSmallerScreen to='/sign-in'>
        <OptionLinkSmallerScreenText>Sign In</OptionLinkSmallerScreenText> <FiLogIn />
      </OptionLinkSmallerScreen>
    </>
  );

  const authLinks = (
    <>
      <OptionLink to='/create-report'>Create</OptionLink>
      <OptionLinkSmallerScreen to='/create-report'>
        <FaPlus />
      </OptionLinkSmallerScreen>

      <OptionLink to='/profile'>My Profile</OptionLink>
      <OptionLinkSmallerScreenImage to='/profile'>
        <img src={currentUser?.photoURL ? currentUser.photoURL : NoDp} alt='Profile' />
      </OptionLinkSmallerScreenImage>

      <OptionLink as='div' onClick={() => dispatch(signOutAction())}>
        Sign Out
      </OptionLink>
      <OptionLinkSmallerScreen as='div' onClick={() => dispatch(signOutAction())}>
        <FiLogOut />
      </OptionLinkSmallerScreen>
    </>
  );

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        💰 <LogoTextSmallScreen>Expense Tracker</LogoTextSmallScreen>
      </LogoContainer>
      <OptionsContainer>{currentUser ? authLinks : guestLinks}</OptionsContainer>
    </HeaderContainer>
  );
};

export default Header;
