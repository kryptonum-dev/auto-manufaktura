export function formatPrice(price: number): string {
  return (
    new Intl.NumberFormat('pl-PL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price) + ' zł'
  );
}
