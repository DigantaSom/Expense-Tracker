import { HeaderContainer, Logo, OptionsContainer, OptionLink } from './header.styles';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo to='/'>💰 Expense Tracker</Logo>

      <OptionsContainer>
        <OptionLink to='/create-report'>Create</OptionLink>
        <OptionLink to='/sign-in'>Sign In</OptionLink>
      </OptionsContainer>
    </HeaderContainer>
  );
};

export default Header;
