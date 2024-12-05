export const formatDate = (date: string): string => {
  const dateObject = new Date(date);
  if (!dateObject) return date;

  const now = new Date();
  const diffInMilliseconds = dateObject.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (Math.abs(diffInDays) <= 7) {
    const relativeTimeFormat = new Intl.RelativeTimeFormat('pl', { numeric: 'auto' });
    if (diffInDays === 0) return 'Dzisiaj';
    return relativeTimeFormat.format(diffInDays, 'day').replace(/^./, match => match.toUpperCase());
  }

  const dateTimeFormat = new Intl.DateTimeFormat('pl', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return dateTimeFormat.format(dateObject);
};
