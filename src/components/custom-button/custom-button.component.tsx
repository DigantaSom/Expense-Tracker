import { FC } from 'react';

import { Button } from './custom-button.styles';

export interface CustomButtonProps {
  rounded?: boolean; // border-radius
  [otherProps: string]: any;
}

const CustomButton: FC<CustomButtonProps> = ({ rounded, children, ...otherProps }) => {
  return (
    <Button rounded={!!rounded} {...otherProps}>
      {children}
    </Button>
  );
};

export default CustomButton;
