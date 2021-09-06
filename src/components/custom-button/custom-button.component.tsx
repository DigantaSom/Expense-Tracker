import { FC } from 'react';

import { Button } from './custom-button.styles';

export interface CustomButtonProps {
  [otherProps: string]: any;
}

const CustomButton: FC<CustomButtonProps> = ({ children, ...otherProps }) => {
  return <Button {...otherProps}>{children}</Button>;
};

export default CustomButton;
