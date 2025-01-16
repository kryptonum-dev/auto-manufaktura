export const setCookie = (name: string, value: string, days: number = 1) => {
  const date = new Date(Date.now() + 86400000 * days);
  const expires = days ? `; expires=${date.toUTCString()}` : '';
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; SameSite=Strict`;
};
