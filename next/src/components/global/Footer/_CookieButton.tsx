'use client';
import { setCookie } from '@/utils/set-cookie';

export default function CookieButton() {
  return (
    <button
      className='text-m light'
      onClick={() => {
        setCookie('cookie-consent', '', -1);
        window.location.reload();
      }}
    >
      Zarządzaj plikami cookies
    </button>
  );
}
