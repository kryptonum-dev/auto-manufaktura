import { FieldErrors } from 'react-hook-form';

export type RadioGroupTypes = {
  label: string;
  errors: FieldErrors;
  options: (string | { key: string; value: string })[];
  register: {
    name: string;
  };
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
