import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutAction } from '../../redux/user/user.actions';

import { FaPlus } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineLogin } from 'react-icons/hi';

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
  const currentUser = useSelector(selectCurrentUser);

  const guestLinks = (
    <>
      <OptionLink to='/sign-in'>Sign In</OptionLink>
      <OptionLinkSmallerScreen to='/sign-in'>
        <OptionLinkSmallerScreenText>Sign In</OptionLinkSmallerScreenText>{' '}
        <HiOutlineLogin />
      </OptionLinkSmallerScreen>
    </>
  );

  const authLinks = (
    <>
      <OptionLink to='/create-report'>Create</OptionLink>
      <OptionLinkSmallerScreen to='/create-report'>
        <FaPlus />
      </OptionLinkSmallerScreen>

      <OptionLink to='/profile'>
        <OptionLinkSmallerScreenImage
          src={currentUser?.photoURL ? currentUser.photoURL : NoDp}
          alt='Profile'
        />{' '}
        <p>Profile</p>
      </OptionLink>
      <OptionLinkSmallerScreen to='/profile'>
        <OptionLinkSmallerScreenImage
          src={currentUser?.photoURL ? currentUser.photoURL : NoDp}
          alt='Profile'
        />{' '}
      </OptionLinkSmallerScreen>

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
