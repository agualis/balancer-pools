export function toPercentage(weight?: string | number| null) {
  if (!weight) return '-';
  if (typeof weight === 'string') weight = parseFloat(weight)
  return `${(weight * 100).toFixed(0)}%`
}