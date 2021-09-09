import styled from 'styled-components';

import Colors from '../../constants/Colors';

export const Container = styled.div``;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input,
  select,
  button {
    height: 50px;
  }

  input {
    width: 150px;

    ::placeholder {
      font-family: 'Open Sans Condensed', sans-serif;
      font-weight: bold;
    }
  }

  select {
    margin: 0 20px;
  }
`;

export const SelectInput = styled.select`
  background: none;
  background-color: white;
  margin: 25px 0;
  color: grey;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Open Sans Condensed', sans-serif;
  display: block;
  width: 100%;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px 15px;

  :focus {
    outline: none;
    box-shadow: 2px 5px 10px ${Colors.primary};
  }
`;
