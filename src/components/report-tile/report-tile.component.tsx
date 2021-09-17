import { FC } from 'react';
import { useHistory } from 'react-router';

import { useDispatch } from 'react-redux';
import { setSelectedMonth } from '../../redux/report/report.actions';

import { MonthType } from '../../types';

import { TileContainer, Icon, Info } from './report-tile.styles';

interface ReportTileProps {
  year: string;
  month: MonthType;
}

const ReportTile: FC<ReportTileProps> = ({ year, month }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickTile = () => {
    dispatch(setSelectedMonth(month));
    history.push('/report');
  };

  return (
    <TileContainer onClick={handleClickTile} data-aos='flip-left' data-aos-duration='500'>
      <Icon>📁</Icon>
      <Info>
        {month}, {year}
      </Info>
    </TileContainer>
  );
};

export default ReportTile;
