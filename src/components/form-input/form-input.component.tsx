import { FC, ChangeEvent } from 'react';

import { Group, Input, Label } from './form-input.styles';

interface FormInputProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  [otherProps: string]: any; // work around
}

const FormInput: FC<FormInputProps> = ({ handleChange, label, ...otherProps }) => {
  return (
    <Group>
      <Input onChange={handleChange} {...otherProps} />
      {label && <Label shrink={!!otherProps.value.length}>{label}</Label>}
    </Group>
  );
};

export default FormInput;
