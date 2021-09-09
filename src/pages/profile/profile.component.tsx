import SelectYearMonth from '../../components/select-year-month/select-year-month.component';

import { ProfilePageContainer, Title } from './profile.styles';

const ProfilePage = () => {
  return (
    <ProfilePageContainer>
      <Title>Please select the Year and Month of your Expense Report</Title>

      <SelectYearMonth />
    </ProfilePageContainer>
  );
};

export default ProfilePage;
