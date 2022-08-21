import { PoolType } from '@/pages/pool/pool.model';
import { RawPool } from '../pools.model';

const defaultRawPool = {
  id: '0x702605f43471183158938c1a3e5f5a359d7b31ba00020000000000000000009f',
  address: '0x702605F43471183158938C1a3e5f5A359d7b31ba',
  poolType: PoolType.Weighted,
  swapFee: '0.0037',
  totalLiquidity: '1203724.083931267693503729',
  tokens: [
    {
      address: '0x3Ec8798B81485A254928B70CDA1cf0A2BB0B74D7',
      balance: '408784.606604112667634055',
      symbol: 'BAL',
      weight: '0.8',
    },
    {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      balance: '95.094102533755196937',
      symbol: 'WETH',
      weight: '0.2',
    },
  ],
};

export const tokensWithoutWeight: RawPool['tokens'] = [
  {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    balance: '3456.12345',
    symbol: 'DAI',
  },
  {
    address: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
    balance: '12345.6789',
    symbol: 'USDC',
  },
];

export const aRawPool = (overwrites: Partial<RawPool> = {}) => ({
  ...defaultRawPool,
  ...overwrites,
});

export const aNonWeightedRawPool = (overwrites: Partial<RawPool> = {}) =>
  aRawPool({
    ...{ poolType: PoolType.Stable, tokens: tokensWithoutWeight },
    ...overwrites,
  });
