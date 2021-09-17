import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  selectReportError,
  selectReportLoading,
  selectReportRefs,
} from '../../redux/report/report.selectors';
import { fetchReportRefs } from '../../redux/report/report.actions';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Spinner from '../../components/spinner/spinner.component';
import ReportTile from '../../components/report-tile/report-tile.component';

import {
  ProfileContainer,
  Form,
  Title,
  NoReportText,
  ReportTilesContainer,
} from './profile.styles';

const Profile2Page: FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const reportRefs = useSelector(selectReportRefs);
  const reportLoading = useSelector(selectReportLoading);
  const reportError = useSelector(selectReportError);

  const [year, setYear] = useState(reportRefs.year);
  const [reportRefsTitle, setReportRefsTitle] = useState('');

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (reportRefs.year) {
      if (reportRefs.months.length > 0) {
        setReportRefsTitle(`Your Expense Reports for the year ${reportRefs.year}`);
      } else {
        setReportRefsTitle('');
      }
    }
    if (year.length < 4 || !reportRefs.year) {
      setReportRefsTitle('');
    }
  }, [reportRefs.year, reportRefs.months, reportRefsTitle, year]);

  useEffect(() => {
    if (year.length === 4 && reportRefs.year && currentUser) {
      dispatch(fetchReportRefs(reportRefs.year, currentUser));
    }
  }, [year.length, reportRefs.year, currentUser, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!year || year.length !== 4 || !currentUser) {
      return;
    }
    dispatch(fetchReportRefs(year, currentUser));
  };

  let tilesContent;
  if (reportLoading) {
    tilesContent = <Spinner />;
  } else {
    if (year.length === 4 && reportRefs.months.length === 0) {
      tilesContent = <NoReportText>{reportError}</NoReportText>;
    } else if (year.length === 4 && reportRefs.months.length > 0) {
      tilesContent = (
        <ReportTilesContainer>
          {reportRefs.months.map(reportMonth => (
            <ReportTile key={reportMonth} year={reportRefs.year} month={reportMonth} />
          ))}
        </ReportTilesContainer>
      );
    }
  }

  let buttonContent = 'Get Report';
  if (parseInt(year) >= 1900 && parseInt(year) <= currentYear) {
    buttonContent = `Get Report for ${year}`;
  }

  return (
    <ProfileContainer>
      <Form onSubmit={handleSubmit} data-aos='zoom-out-up'>
        <FormInput
          type='number'
          min='1900'
          max={currentYear}
          name='year'
          value={year}
          handleChange={handleChange}
          placeholder='Year'
          box
          required
        />

        <CustomButton type='submit' rounded>
          {buttonContent}
        </CustomButton>
      </Form>

      <Title data-aos='fade-up'>{reportRefsTitle}</Title>
      {tilesContent}
    </ProfileContainer>
  );
};

export default Profile2Page;
