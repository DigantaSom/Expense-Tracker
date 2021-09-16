import { FC, ChangeEvent } from 'react';

import { InputGroup, Input, Label } from './form-input.styles';

interface FormInputProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  box?: boolean;
  [otherProps: string]: any; // work around
}

const FormInput: FC<FormInputProps> = ({ handleChange, label, box, ...otherProps }) => {
  return (
    <InputGroup className='input-group'>
      <Input onChange={handleChange} box={!!box} {...otherProps} />
      {label && (
        <Label shrink={!!otherProps.value.length} box={!!box}>
          {label}
        </Label>
      )}
    </InputGroup>
  );
};

export default FormInput;
