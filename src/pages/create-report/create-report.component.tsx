import { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addReportItem } from '../../redux/report/report.actions';

import { RedirectToType } from '../../types';

import Spinner from '../../components/spinner/spinner.component';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { CreateReportContainer, Title, ButtonsContainer } from './create-report.styles';

const CreateReport: FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { loading: reportLoading } = useSelector((state: RootState) => state.report);

  const history = useHistory();

  const [formData, setFormData] = useState({
    item: '',
    description: '', // optional
    recipient: '',
    cost: '',
    medium: '',
    date: '',
  });
  const [time, setTime] = useState('00:00');
  const [dateInHeading, setDateInHeading] = useState('');

  const { item, description, recipient, cost, medium, date } = formData;

  useEffect(() => {
    if (date) {
      setDateInHeading(dayjs(date).format('MMMM[, ]YYYY'));
    }
  }, [date]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, redirectTo: RedirectToType) => {
    e.preventDefault();

    if (!item || !recipient || !cost || !medium || !date) {
      alert('Please fill the required fields.');
      return;
    }

    if (currentUser) {
      dispatch(
        addReportItem(
          {
            ...formData,
            cost: parseFloat(cost),
            date: new Date(`${date}T${time}`).toISOString(),
          },
          currentUser,
          redirectTo,
          history,
        ),
      );
    }

    setFormData({
      ...formData,
      item: '',
      description: '',
      recipient: '',
      cost: '',
      medium: '',
      date: '',
    });
    setDateInHeading('');
  };

  if (reportLoading) {
    return <Spinner />;
  }

  return (
    <CreateReportContainer>
      <Title>
        New item for the Expense Report {dateInHeading && `of ${dateInHeading}`}
      </Title>

      <form autoComplete='off'>
        <FormInput
          type='date'
          name='date'
          value={date}
          handleChange={handleChange}
          required
          box
        />
        <FormInput
          type='time'
          name='time'
          value={time}
          handleChange={(e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
          box
        />
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

        <ButtonsContainer>
          <CustomButton
            type='button'
            onClick={(e: FormEvent<HTMLFormElement>) => handleSubmit(e, 'Same')}
            inverted
            disabled={reportLoading}>
            Save & Add Another
          </CustomButton>
          <CustomButton
            type='button'
            onClick={(e: FormEvent<HTMLFormElement>) => handleSubmit(e, 'Home')}
            disabled={reportLoading}>
            Save & Finish
          </CustomButton>
        </ButtonsContainer>
      </form>
    </CreateReportContainer>
  );
};

export default CreateReport;
