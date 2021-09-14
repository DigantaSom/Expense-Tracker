import { FC } from 'react';

import { SizeType } from '../../types';

import { SpinnerOverlay, SpinnerContainer, SmallSpinner } from './spinner.styles';

import LargeSpinnerImage from '../../img/greedy-loader.png';
import SmallSpinnerImage from '../../img/loading-buffering.gif';

interface SpinnerProps {
  size?: SizeType;
}

const Spinner: FC<SpinnerProps> = ({ size }) => {
  if (size && size === 'small') {
    return <SmallSpinner src={SmallSpinnerImage} alt='Loading...' />;
  }

  return (
    <SpinnerOverlay>
      <SpinnerContainer src={LargeSpinnerImage} alt='Loading...' />
    </SpinnerOverlay>
  );
};

export default Spinner;
