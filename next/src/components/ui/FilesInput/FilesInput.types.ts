import type { FieldError } from 'react-hook-form';

export type FileTypes = {
  size: number;
  name: string;
  type: string;
  bufferBase64: string;
};

export type FilesInputTypes = {
  value: FileTypes[];
  onChange: (files: FileTypes[]) => void;
  fieldState: { invalid?: boolean; error?: FieldError };
  className?: string;
};
