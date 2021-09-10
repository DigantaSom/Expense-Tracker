import { FC } from 'react';
import dayjs from 'dayjs';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import SelectYearMonth from '../../components/select-year-month/select-year-month.component';
import Spinner from '../../components/spinner/spinner.component';
import ReportItem from '../../components/report-item/report-item.component';

import { ProfilePageContainer, Title, ReportTitle } from './profile.styles';

const ProfilePage: FC = () => {
  const { report, loading } = useSelector((state: RootState) => state.report);

  if (loading) {
    return <Spinner />;
  }

  return (
    <ProfilePageContainer>
      <Title>Please select the Year and Month of your Expense Report</Title>

      <SelectYearMonth />

      {report.length > 0 && (
        <>
          <hr />

          <ReportTitle>
            Expense Report for {dayjs(report[0].date).format('MMMM[, ]YYYY')}
          </ReportTitle>

          {report.map((reportItem, index) => (
            <ReportItem key={reportItem.id} index={index + 1} reportItem={reportItem} />
          ))}
        </>
      )}
    </ProfilePageContainer>
  );
};

export default ProfilePage;
