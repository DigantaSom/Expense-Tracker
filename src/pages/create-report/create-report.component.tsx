import { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import dayjs from 'dayjs';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { CreateReportContainer, Title, ButtonsContainer } from './create-report.styles';

const CreateReport: FC = () => {
  const [formData, setFormData] = useState({
    item: '',
    description: '', // optional
    recipient: '',
    cost: '',
    medium: '',
    date: '',
  });
  const [dateInHeading, setDateInHeading] = useState('');

  const { item, description, recipient, cost, medium, date } = formData;

  useEffect(() => {
    if (date) {
      setDateInHeading(dayjs(date).format('MMM[, ]YYYY'));
    }
  }, [date]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: submit
    // dispatch(addReportItem({...formData, date: new Date(date).toISOString()}))
  };

  return (
    <CreateReportContainer>
      <Title>
        Item 1 of the Expense Report {dateInHeading && `for ${dateInHeading}`}
      </Title>

      <form onSubmit={handleSubmit} autoComplete='off'>
        <FormInput
          type='text'
          name='item'
          value={item}
          handleChange={handleChange}
          label='* Item'
          required
          box
        />
        <FormInput
          type='text'
          name='description'
          value={description}
          handleChange={handleChange}
          label='Description (optional)'
          box
        />
        <FormInput
          type='text'
          name='recipient'
          value={recipient}
          handleChange={handleChange}
          label='* Recipient'
          required
          box
        />
        <FormInput
          type='number'
          min='0'
          name='cost'
          value={cost}
          handleChange={handleChange}
          label='* Cost'
          required
          box
        />
        <FormInput
          type='text'
          name='medium'
          value={medium}
          handleChange={handleChange}
          label='* Medium'
          required
          box
        />
        {/* <DatePicker selected={date} onChange={date => setDate(date as Date)} /> */}
        <FormInput
          type='date'
          name='date'
          value={date}
          handleChange={handleChange}
          label={''}
          required
          box
        />

        <ButtonsContainer>
          <CustomButton type='button' onClick={() => {}} inverted>
            Save & Add Another
          </CustomButton>
          <CustomButton type='submit'>Save & Finish</CustomButton>
        </ButtonsContainer>
      </form>
    </CreateReportContainer>
  );
};

export default CreateReport;
