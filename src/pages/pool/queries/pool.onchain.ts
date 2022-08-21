
import { WeightedPool__factory, Vault__factory, Vault } from '@balancer-labs/typechain';

import { getDefaultProvider } from 'ethers';
import { getAddress } from 'ethers/lib/utils';

const provider = getDefaultProvider();

function getPoolAddress(poolId: string) {
  return getAddress(poolId.slice(0, 42));
}

export type OnChainPoolTokens = Awaited<ReturnType<Vault['getPoolTokens']>>

export async function getPoolTokens(poolId: string) {
  const vaultAddress = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';
  const vaultAbi = Vault__factory.connect(vaultAddress, provider);
  return vaultAbi.getPoolTokens(poolId);
}

export async function getPoolWeights(poolId: string) {
  const poolAddress = getPoolAddress(poolId);
  const weightedPoolAbi = WeightedPool__factory.connect(poolAddress, provider);
  return weightedPoolAbi.getNormalizedWeights();
}
