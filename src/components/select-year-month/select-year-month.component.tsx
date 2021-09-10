import { FC, useState, ChangeEvent, FormEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchExpenseReport } from '../../redux/report/report.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { Container, Form, SelectInput } from './select-year-month.styles';

const SelectYearMonth: FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    year: '',
    month: '',
  });

  const { year, month } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!year || !month) {
      alert('Please fill all the fields.');
      return;
    }

    if (currentUser) {
      dispatch(fetchExpenseReport(year, month, currentUser));
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormInput
          type='number'
          min='1947'
          max={new Date().getFullYear()}
          name='year'
          value={year}
          handleChange={handleChange}
          placeholder='Year'
          box
          required
        />
        <SelectInput name='month' onChange={handleChange} required>
          <option value=''>Month</option>
          <option value='January'>January</option>
          <option value='February'>February</option>
          <option value='March'>March</option>
          <option value='April'>April</option>
          <option value='May'>May</option>
          <option value='June'>June</option>
          <option value='July'>July</option>
          <option value='August'>August</option>
          <option value='September'>September</option>
          <option value='October'>October</option>
          <option value='November'>November</option>
          <option value='December'>December</option>
        </SelectInput>

        <CustomButton type='submit' rounded>
          Get Report
        </CustomButton>
      </Form>
    </Container>
  );
};

export default SelectYearMonth;
