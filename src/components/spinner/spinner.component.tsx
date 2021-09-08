import { FC } from 'react';

import { SpinnerOverlay, SpinnerContainer } from './spinner.styles';

import SpinnerImage from '../../img/greedy-loader.png';

const Spinner: FC = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer src={SpinnerImage} alt='Loading...' />
    </SpinnerOverlay>
  );
};

export default Spinner;
