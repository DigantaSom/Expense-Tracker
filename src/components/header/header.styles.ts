import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  background-color: #111;
  height: 70px;
  width: 100%;
  padding: 0 10vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 900px) {
    padding: 0 5vw;
  }

  @media screen and (max-width: 440px) {
    padding: 0 20px;
  }
`;

export const LogoContainer = styled(Link)`
  color: white;
  font-size: 1.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const LogoTextSmallScreen = styled.div`
  padding-left: 0.7rem;

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 430px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 360px) {
    display: none;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    width: 40%;
  }

  @media screen and (max-width: 400px) {
    width: 20%;
  }
`;

export const OptionLink = styled(Link)`
  color: white;
  padding: 0 0.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;

  :last-child {
    padding-right: 0;
  }

  img {
    margin-right: 5px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const OptionLinkSmallerScreen = styled(OptionLink)`
  display: none;
  font-weight: normal;
  font-size: 1.3rem;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    padding: 0 1.3rem;
  }

  @media screen and (max-width: 400px) {
    padding: 0 0.8rem;
  }
`;

export const OptionLinkSmallerScreenText = styled.div`
  padding-right: 0.5rem;

  @media screen and (max-width: 400px) {
    display: none;
  }
`;

export const OptionLinkSmallerScreenImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
