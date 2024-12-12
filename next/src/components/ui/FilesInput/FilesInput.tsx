'use client';
import { ErrorIcon } from '@/components/icons';
import type { FileTypes, FilesInputTypes } from './FilesInput.types';
import styles from './FilesInput.module.scss';

export default function FIlesInput({ onChange, fieldState, value, className = '' }: FilesInputTypes) {
  const uploadFiles = async (files: File[]) => {
    const newFiles: FileTypes[] = [];
    const currentFiles = [...value];

    for (const item of files) {
      if (currentFiles.some(({ file: { name, size } }) => item.name === name && item.size === size)) continue;
      try {
        const base64 = await convertFileToBase64(item);
        newFiles.push({ file: item, bufferBase64: base64 });
      } catch {
        newFiles.push({ file: item, bufferBase64: '' });
      }
    }

    onChange([...currentFiles, ...newFiles]);
  };

  const changeFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    uploadFiles(Array.from(e.target.files));
  };

  const dropFiles = (e: React.DragEvent) => {
    e.preventDefault();
    uploadFiles(Array.from(e.dataTransfer.files));
  };

  const deleteFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, file: FileTypes) => {
    e.preventDefault();
    onChange(value.filter(item => item.bufferBase64 !== file.bufferBase64));
  };

  return (
    <div
      className={`${styles['FilesInput']} text-m light ${className}`}
      aria-invalid={!!fieldState.invalid}
    >
      <div className={styles.info}>
        <p>Załącz CV</p>
        <ul>
          <li>
            Akceptowalne formaty <span>JPG</span> <span>PDF</span> <span>DOCX</span> <span>DOC</span>
          </li>
          <li>Max 15 mb</li>
        </ul>
      </div>
      <div
        className={styles.box}
        onDrop={dropFiles}
        onDragOver={e => e.preventDefault()}
      >
        {value.length > 0 ? (
          <ul className={styles.files}>
            {value.map((item, i) => {
              const progress = item.bufferBase64 === '' ? 0 : 100;
              return (
                <li key={`file-${i}`}>
                  <span className={styles.icon}>
                    <FileIcon />
                  </span>
                  <div className={styles.content}>
                    <div
                      className={styles.progress}
                      role='progressbar'
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={progress}
                      aria-label={`Postęp załadawania pliku ${item.file.name}: ${progress}%`}
                    >
                      <div style={{ width: `${progress}%` }} />
                    </div>
                    <p>
                      {progress < 100 ? (
                        <span>{progress}%</span>
                      ) : (
                        <span>
                          <SuccessIcon />
                          Przesłano
                        </span>
                      )}
                      <span>{shortenFileName(item.file.name)}</span>
                    </p>
                  </div>
                  <button
                    className={styles.delete}
                    onClick={e => deleteFile(e, item)}
                    aria-label={`Usuń plik ${item.file.name} z listy załadowanych plików`}
                  >
                    <CloseIcon />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.empty}>
            <UploadIcon />
            <p>Przeciągnij z komputera</p>
            <span>lub</span>
          </div>
        )}
        <label className={styles.label}>
          <input
            type='file'
            multiple
            accept='.doc,.docx,.pdf,.jpg'
            onChange={changeFiles}
          />
          <p className='link'>{value.length > 0 ? 'Dodaj więcej plików' : 'Dodaj plik'}</p>
        </label>
      </div>
      {fieldState.error?.message?.toString() && (
        <p
          role='alert'
          className={styles.error}
        >
          <ErrorIcon /> {fieldState.error?.message?.toString()}
        </p>
      )}
    </div>
  );
}

function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);

    reader.readAsDataURL(file);
  });
}

function shortenFileName(fileName: string, maxBaseLength = 10): string {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) return fileName;
  const baseName = fileName.slice(0, lastDotIndex);
  const extension = fileName.slice(lastDotIndex);
  return baseName.length <= maxBaseLength ? fileName : `${baseName.slice(0, maxBaseLength - 3)}...${extension}`;
}

const CloseIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      stroke='#CBD0D0'
      strokeLinecap='round'
      d='M18 6 6 18M6 6l12 12'
    />
  </svg>
);

const FileIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    viewBox='0 0 16 16'
    fill='none'
    {...props}
  >
    <path
      fill='#CBD0D0'
      fillRule='evenodd'
      d='M9.334 14.666H6.667c-2.514 0-3.77 0-4.552-.78-.781-.782-.781-2.039-.781-4.553V6.666c0-2.514 0-3.77.781-4.552.781-.781 2.045-.781 4.572-.781.404 0 .728 0 1 .011a1.001 1.001 0 0 0-.014.163l-.006 1.89c0 .73 0 1.377.07 1.898.076.565.25 1.13.711 1.59.461.461 1.026.636 1.59.711.522.07 1.168.07 1.9.07h2.701c.028.357.028.794.028 1.376v.291c0 2.514 0 3.771-.78 4.552-.782.781-2.039.781-4.553.781Zm-5.833-5a.5.5 0 0 1 .5-.5h5.333a.5.5 0 1 1 0 1H4.001a.5.5 0 0 1-.5-.5ZM3.5 12a.5.5 0 0 1 .5-.5h3.666a.5.5 0 1 1 0 1H4.001a.5.5 0 0 1-.5-.5Z'
      clipRule='evenodd'
    />
    <path
      fill='#CBD0D0'
      d='m12.902 5.077-2.64-2.375c-.751-.677-1.127-1.015-1.589-1.192l-.006 1.823c0 1.571 0 2.357.488 2.845.489.488 1.274.488 2.846.488h2.386c-.241-.47-.674-.859-1.485-1.589Z'
    />
  </svg>
);

const UploadIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={25}
    height={24}
    viewBox='0 0 25 24'
    fill='none'
    {...props}
  >
    <path
      fill='#545966'
      d='M7 18v-.09c0-.865 0-1.659.087-2.304.095-.711.32-1.463.938-2.08.618-.619 1.37-.844 2.08-.94.646-.086 1.44-.086 2.306-.086h.178c.866 0 1.66 0 2.305.087.711.095 1.463.32 2.08.938.619.618.844 1.37.94 2.08.085.637.086 1.416.086 2.267 2.573-.55 4.5-2.812 4.5-5.52 0-2.47-1.607-4.572-3.845-5.337C18.337 4.194 15.915 2 12.976 2 9.82 2 7.262 4.528 7.262 7.647c0 .69.125 1.35.354 1.962a4.356 4.356 0 0 0-.83-.08c-2.367 0-4.286 1.897-4.286 4.236C2.5 16.104 4.419 18 6.786 18H7Z'
    />
    <path
      fill='#545966'
      fillRule='evenodd'
      d='M12.5 14c-1.886 0-2.828 0-3.414.586C8.5 15.172 8.5 16.114 8.5 18c0 1.886 0 2.828.586 3.414C9.672 22 10.614 22 12.5 22c1.886 0 2.828 0 3.414-.586.586-.586.586-1.528.586-3.414 0-1.886 0-2.828-.586-3.414C15.328 14 14.386 14 12.5 14Zm1.805 3.084-1.334-1.333a.667.667 0 0 0-.942 0l-1.334 1.333a.667.667 0 1 0 .943.943l.195-.195v1.946a.667.667 0 0 0 1.334 0v-1.946l.195.195a.667.667 0 0 0 .943-.943Z'
      clipRule='evenodd'
    />
  </svg>
);

const SuccessIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    viewBox='0 0 16 16'
    fill='none'
    {...props}
  >
    <path
      stroke='#75C69F'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M4.666 8.6 6.761 11 12 5'
    />
  </svg>
);
