import { FC, ChangeEvent } from 'react';

import { TextAreaInputContainer } from './text-area-input.styles';

interface TextAreaInputProps {
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  [otherProps: string]: any; // work around
}

const TextAreaInput: FC<TextAreaInputProps> = ({
  handleChange,
  children,
  ...otherProps
}) => {
  return (
    <TextAreaInputContainer onChange={handleChange} {...otherProps}>
      {children}
    </TextAreaInputContainer>
  );
};

export default TextAreaInput;
