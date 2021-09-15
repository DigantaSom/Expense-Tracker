import { FC, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchExpenseReport } from '../../redux/report/report.actions';

import Spinner from '../../components/spinner/spinner.component';
import ReportItem from '../../components/report-item/report-item.component';

import { ReportPageContainer, Title } from './report-page.styles';

const ReportPage: FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const {
    reportRefs,
    report,
    loading: reportLoading,
  } = useSelector((state: RootState) => state.report);

  const [reportPageTitle, setReportPageTitle] = useState('');

  useEffect(() => {
    if (currentUser) {
      dispatch(
        fetchExpenseReport(reportRefs.year, reportRefs.selectedMonth, currentUser),
      );
    }
  }, [currentUser, dispatch, reportRefs.year, reportRefs.selectedMonth]);

  useEffect(() => {
    if (reportRefs.year && reportRefs.selectedMonth) {
      setReportPageTitle(
        `You Expense Report for ${reportRefs.selectedMonth}, ${reportRefs.year}`,
      );
    }
  }, [reportRefs.year, reportRefs.selectedMonth]);

  if (reportLoading) {
    return <Spinner />;
  }

  return (
    <ReportPageContainer>
      <Title>{reportPageTitle}</Title>

      {report.map((reportItem, index) => (
        <ReportItem key={reportItem.id} index={index + 1} reportItem={reportItem} />
      ))}
    </ReportPageContainer>
  );
};

export default ReportPage;
