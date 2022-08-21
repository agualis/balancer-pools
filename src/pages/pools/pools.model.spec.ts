import { PoolModel } from './pools.model';
import { aNonWeightedRawPool, aRawPool } from './test-builders/pools.builders';

describe('when creating a weighted PoolModel instance', () => {
  const poolModel = new PoolModel(aRawPool());

  test('generates token uris', () => {
    expect(poolModel.tokenUris).toEqual([
      'https://raw.githubusercontent.com/balancer-labs/assets/master/assets/0x3ec8798b81485a254928b70cda1cf0a2bb0b74d7.png',
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    ]);
  });

  test('formats token composition', () => {
    expect(poolModel.composition).toEqual('BAL 80% WETH 20%');
  });

  test('formats token Liquidity', () => {
    expect(poolModel.totalLiquidityUSD).toEqual('$1,203,724');
  });
});

describe('when creating a non weighted PoolModel instance', () => {
  test('shows pool type instead of token composition', () => {
    const poolModel = new PoolModel(aNonWeightedRawPool());

    expect(poolModel.composition).toEqual('Stable');
  });
});
