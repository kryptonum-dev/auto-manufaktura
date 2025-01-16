export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.substring(name.length + 1)) : null;
};
