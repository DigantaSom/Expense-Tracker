import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  background-color: #111;
  height: 70px;
  padding: 0 10vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(Link)`
  color: white;
  font-size: 1.85rem;
  font-weight: 600;
`;

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const OptionLink = styled(Link)`
  color: white;
  padding: 0 0.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
`;
