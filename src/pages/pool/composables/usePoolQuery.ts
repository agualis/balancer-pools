import { useQuery } from 'vue-query';
import { queryPool as defaultQueryPool } from '../queries/pool.queries';

export function usePoolQuery(poolId: string, queryPool = defaultQueryPool) {
  return useQuery(['pool', poolId], ()=> queryPool(poolId))
}