import { BigNumber } from 'bignumber.js';
import numeral from 'numeral';

export function toUSD(number: string) {
  const amount = new BigNumber(number).toNumber().toFixed(4);

  const tokenFormat = '0,0';
  const formattedAmount = numeral(amount).format(tokenFormat);
  return '$' + formattedAmount;
}

export function toTokenAmount(number: string | number) {
  if (typeof number === 'string') {
    number = Number(number);
  }
  const formatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2});
  return formatter.format(number)
}
