import { queryBalancerSubgraph } from '@/shared/graphql';
import { PaginatedPoolsQuery, PaginatedPoolsQueryVariables } from '@/generated/subgraph-types';
import { paginatedPoolsQuery } from './pools.graphql';

// This should be configurable
export const PAGE_SIZE = 10;

export async function queryPoolsPage({ pageParam = 0 }) {
  const skip = pageParam;
  return queryBalancerSubgraph(paginatedPoolsQuery, {
    skip,
    pageSize: PAGE_SIZE,
  } as PaginatedPoolsQueryVariables) as Promise<PaginatedPoolsQuery>;
}