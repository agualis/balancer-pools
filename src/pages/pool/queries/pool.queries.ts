import { getPoolTokens, getPoolWeights } from '@/pages/pool/queries/pool.onchain';
import { queryBalancerSubgraph } from '@/shared/graphql'
import { PoolByIdQuery, PoolByIdQueryVariables } from '@/generated/subgraph-types'
import { poolById } from './pool.graphql'
import { isWeightedLike, OnChainPoolModel } from '@/pages/pool/pool.model';

export async function queryPoolType(poolId: string) {
  const response: PoolByIdQuery = await queryBalancerSubgraph(poolById, {poolId} as PoolByIdQueryVariables)
  return response.pool?.poolType
}

export async function queryPool(poolId: string) {
  const poolType = await queryPoolType(poolId) || '';
  const tokensResponse = await getPoolTokens(poolId);
  const weights = isWeightedLike(poolType)
    ? await getPoolWeights(poolId)
    : [];

  return new OnChainPoolModel(poolType, tokensResponse, weights)
}