import { useQuery } from 'vue-query';
import { queryPoolType } from '../queries/pool.queries';

export function usePoolTypeQuery(poolId: string) {
  return useQuery(
    ['pool', poolId],
    () => queryPoolType(poolId)
  );
}