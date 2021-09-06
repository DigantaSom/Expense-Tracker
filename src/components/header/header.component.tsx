import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { signOutAction } from '../../redux/user/user.actions';

import { HeaderContainer, Logo, OptionsContainer, OptionLink } from './header.styles';

const Header: FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <HeaderContainer>
      <Logo to='/'>💰 Expense Tracker</Logo>

      <OptionsContainer>
        <OptionLink to='/create-report'>Create</OptionLink>
        {currentUser ? (
          <OptionLink as='div' onClick={() => dispatch(signOutAction())}>
            Sign Out
          </OptionLink>
        ) : (
          <OptionLink to='/sign-in'>Sign In</OptionLink>
        )}
      </OptionsContainer>
    </HeaderContainer>
  );
};

export default Header;
