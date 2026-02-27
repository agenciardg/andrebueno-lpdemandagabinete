/**
 * Remove all non-digit characters from a string.
 */
export function unmask(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * Format a phone number as (99) 99999-9999.
 */
export function maskPhone(value: string): string {
  const digits = unmask(value).slice(0, 11)

  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

/**
 * Format a CEP as 99999-999.
 */
export function maskCep(value: string): string {
  const digits = unmask(value).slice(0, 8)

  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

/**
 * Format a date as DD/MM/YYYY.
 */
export function maskDate(value: string): string {
  const digits = unmask(value).slice(0, 8)

  if (digits.length === 0) return ''
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}
