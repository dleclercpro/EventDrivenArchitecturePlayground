import Button, { ButtonProps } from '@mui/material/Button';
import React from 'react';

interface TestButtonProps extends ButtonProps {

}

const TestButton: React.FC<TestButtonProps> = (props) => {
  const { children, ...otherProps } = props;
  
  return (
    <Button variant='contained' {...otherProps}>
      {children}
    </Button>
  );
}

export default TestButton;