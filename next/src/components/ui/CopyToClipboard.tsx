'use client';
import { toast } from 'react-toastify';

export default function CopyToClipboard({
  value,
  successMessage,
  errorMessage,
  className = '',
}: {
  value: string;
  successMessage: string;
  errorMessage: string;
  className?: string;
}) {
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast(successMessage);
    } catch {
      toast(errorMessage);
    }
  };

  return (
    <button
      className={className}
      onClick={handleCopyToClipboard}
      aria-label={`Kopiuj: ${value}`}
    >
      {value}
    </button>
  );
}
