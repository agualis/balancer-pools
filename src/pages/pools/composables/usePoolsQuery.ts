import { useInfiniteQuery } from 'vue-query';
import { PAGE_SIZE, queryPoolsPage } from '../queries/pools.queries';

export function useInfinitePaginatedPoolsQuery() {
  return useInfiniteQuery('paginatedPools', queryPoolsPage, {
    getNextPageParam: (_, allPages) => {
      const totalPagesQueried = allPages?.length || 0;
      return totalPagesQueried * PAGE_SIZE;
    },
  });
}
