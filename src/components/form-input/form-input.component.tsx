import { FC, ChangeEvent } from 'react';

import { Group, Input, Label } from './form-input.styles';

interface FormInputProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  box?: boolean;
  [otherProps: string]: any; // work around
}

const FormInput: FC<FormInputProps> = ({ handleChange, label, box, ...otherProps }) => {
  return (
    <Group>
      <Input onChange={handleChange} box={!!box} {...otherProps} />
      {label && (
        <Label shrink={!!otherProps.value.length} box={!!box}>
          {label}
        </Label>
      )}
    </Group>
  );
};

export default FormInput;
