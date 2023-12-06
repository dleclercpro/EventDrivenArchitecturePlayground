import Button from '@mui/material/Button';
import React from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {

}

const TestButton: React.FC<ButtonProps> = (props) => {
  const { children } = props;
  
  return (
    <Button variant='contained'>
      {children}
    </Button>
  );
}

export default TestButton;