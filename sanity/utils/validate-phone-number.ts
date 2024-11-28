export const validatePhoneNumber = (number: string | undefined) => {
  const phoneRegex = /^(?:\+(?:\d{1,3}))?(?:[ -]?\(?\d{1,4}\)?[ -]?\d{1,5}[ -]?\d{1,5}[ -]?\d{1,6})$/;
  if (number && !phoneRegex.test(number)) return 'Nieprawidłowy numer telefonu';
  return true;
};
