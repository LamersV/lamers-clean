export const toCurrency = (value: number | string): string => {
  if (!value) return '';

  const tempValue = Number(value);
  if (isNaN(tempValue)) return '';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(tempValue);
}