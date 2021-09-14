import { FC } from 'react';

import { ConfirmType } from '../../types';

import {
  ButtonsContainer,
  PositiveButton,
  NegativeButton,
} from './edit-confirm-buttons.styles';

interface EditConfirmButtonsProps {
  handleConfirmEdit: (confirmType: ConfirmType) => void;
}

const EditConfirmButtons: FC<EditConfirmButtonsProps> = ({ handleConfirmEdit }) => {
  return (
    <ButtonsContainer>
      <PositiveButton onClick={() => handleConfirmEdit('Confirmed')}>
        &#10003;
      </PositiveButton>
      <NegativeButton onClick={() => handleConfirmEdit('Cancelled')}>
        &#x2717;
      </NegativeButton>
    </ButtonsContainer>
  );
};

export default EditConfirmButtons;
