export const formatPhoneNumberWithoutPrefix = (value: string) => {
  const cleaned = value.replace(/[^\d]/g, '');
  let formatted = cleaned.replace(/^(\d{3})(\d{3})(\d{3}).*/, '$1 $2 $3');
  if (formatted === cleaned) {
    formatted = cleaned.replace(/(.{3})(?=.)/g, '$1 ').trim();
  }
  return formatted;
};

export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/[^\d+]/g, '');
  let formatted = cleaned.replace(/^(\+\d{2})(\d{3})(\d{3})(\d{3}).*/, '$1 $2 $3 $4');
  if (formatted === cleaned) {
    formatted = cleaned.replace(/(.{3})(?=.)/g, '$1 ').trim();
  }
  return formatted;
};

export const formatPhoneNumberForHref = (value: string): string => {
  const cleaned = value.replace(/[^\d+]/g, '');

  if (cleaned.startsWith('+48')) {
    const withoutPrefix = cleaned.slice(3);
    if (/^\d{9}$/.test(withoutPrefix)) return `+48${withoutPrefix}`;
  }

  if (/^\d{9}$/.test(cleaned)) return `+48${cleaned}`;

  return formatPhoneNumber(value);
};
