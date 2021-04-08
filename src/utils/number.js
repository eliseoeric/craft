export const currencyFormat = (number) => {
  return number.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
}