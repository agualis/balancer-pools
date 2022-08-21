import mainnetTokens from '@/assets/data/mainnet-tokens.json';
import { getAddress } from 'ethers/lib/utils';

export interface Token {
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
}

function unknownToken(address: string): Token {
  return {
    address,
    name: '???',
    symbol: '???',
    chainId: 0,
    decimals: 10,
    logoURI: undefined,
  };
}

export function tokenByAddress(rawAddress: string): Token {
  const address = getAddress(rawAddress);
  const token = mainnetTokens.find(token => token.address === address);
  if (!token) {
    console.warn(address + ' was not found in the token list');
    return unknownToken(address);
  }
  return token;
}
