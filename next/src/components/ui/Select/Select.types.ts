import type { FieldErrors } from 'react-hook-form';

export type SelectTypes = {
  label: string;
  register: {
    name: string;
  };
  options: (string | { key: string; value: string })[];
  errors: FieldErrors;
  className?: string;
  placeholderOption?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;
