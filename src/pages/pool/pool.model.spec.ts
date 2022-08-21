import { OnChainPoolModel, PoolType } from '@/pages/pool/pool.model';
import { anOnchainPoolModel, tokensResponse } from './test-builders/pool.builders';

describe('when creating a weighted OnchainPoolModel instance', () => {
  const onchainPoolModel = anOnchainPoolModel()

  test('generates token uris', () => {
    expect(onchainPoolModel.tokenUris).toEqual([
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png',
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    ]);
  });

  test('formats token weights', () => {
    expect(onchainPoolModel.tokens[0].weight).toEqual('80%');
    expect(onchainPoolModel.tokens[1].weight).toEqual('20%');
  });

  test('formats token balances', () => {
    expect(onchainPoolModel.tokens[0].balance).toEqual('17,368,335.49');
  });
});

describe('when creating a non weighted OnchainPoolModel instance', () => {
  test('formats empty token weights', () => {
    const onchainPoolModel = new OnChainPoolModel(
      PoolType.Investment,
      tokensResponse,
      []
    );

    expect(onchainPoolModel.tokens[0].weight).toEqual('-');
    expect(onchainPoolModel.tokens[1].weight).toEqual('-');
  });
});
