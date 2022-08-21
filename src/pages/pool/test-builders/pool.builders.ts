import { OnChainPoolModel, PoolType } from '@/pages/pool/pool.model';
import { PoolByIdQuery } from '@/generated/subgraph-types';
import { BigNumber } from 'ethers';
import { OnChainPoolTokens } from '@/pages/pool/queries/pool.onchain';

export const defaultPoolById: PoolByIdQuery = {
  pool: {
    poolType: PoolType.Stable,
  },
};

export const aPoolById = (overwrites: Partial<PoolByIdQuery> = {}) => ({
  ...defaultPoolById,
  ...overwrites,
});

const weight80 = BigNumber.from('0x0b1a2bc2ec500000')
const weight20 = BigNumber.from('0x02c68af0bb140000')

const defaultWeights = [weight80, weight20];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const tokensResponse: OnChainPoolTokens = {
  tokens: [
    '0xba100000625a3754423978a60c9317c58a424e3D',
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  ],
  balances: [
    BigNumber.from('0x0e5de35a8ade404cccf515'),
    BigNumber.from('0x0333fd66361742e7d5e5'),
  ],
  lastChangeBlock: BigNumber.from('0xeaa30e'),
};

export const anOnchainPoolModel = ()=> {
  return new OnChainPoolModel(PoolType.Weighted, tokensResponse, defaultWeights)
}
