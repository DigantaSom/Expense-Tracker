import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchReportRefs } from '../../redux/report/report.actions';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Spinner from '../../components/spinner/spinner.component';
import ReportTile from '../../components/report-tile/report-tile.component';

import { Profile2Container, Form, Title, ReportTilesContainer } from './profile.styles';

const Profile2Page: FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { reportRefs, loading: reportLoading } = useSelector(
    (state: RootState) => state.report,
  );

  const [year, setYear] = useState(reportRefs.year);
  const [reportRefsTitle, setReportRefsTitle] = useState('');

  useEffect(() => {
    if (reportRefs.year) {
      if (reportRefs.months.length > 1) {
        setReportRefsTitle(`Your Expense Reports for the year ${reportRefs.year}`);
      } else {
        setReportRefsTitle(`Your Expense Report for the year ${reportRefs.year}`);
      }
    }
  }, [reportRefs.year, reportRefs.months, reportRefsTitle]);

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
    if (!year || !currentUser) {
      return;
    }
    dispatch(fetchReportRefs(year, currentUser));
  };

  return (
    <Profile2Container>
      <Form onSubmit={handleSubmit}>
        <FormInput
          type='number'
          min='1900'
          max={new Date().getFullYear()}
          name='year'
          value={year}
          handleChange={handleChange}
          placeholder='Year'
          box
          required
        />

        <CustomButton type='submit' rounded>
          Get Report
        </CustomButton>
      </Form>

      <Title>{reportRefsTitle}</Title>

      {reportLoading ? (
        <Spinner />
      ) : reportRefs.months.length === 0 ? null : (
        <ReportTilesContainer>
          {reportRefs.months.map(reportMonth => (
            <ReportTile key={reportMonth} year={reportRefs.year} month={reportMonth} />
          ))}
        </ReportTilesContainer>
      )}
    </Profile2Container>
  );
};

export default Profile2Page;
