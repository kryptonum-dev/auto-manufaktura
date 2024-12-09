import { FieldErrors } from 'react-hook-form';

export type CheckboxTypes = {
  errors: FieldErrors;
  register: {
    name: string;
  };
  children: React.ReactNode;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
