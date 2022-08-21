<script setup lang="ts">

import { useInfinitePaginatedPoolsQuery } from '@/pages/pools/composables/usePoolsQuery';
import { generateRowsFromPages } from './pools.model';

const router = useRouter()
const { isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfinitePaginatedPoolsQuery()

const pools = computed(() => {
  if (!data.value?.pages) return [];
  return generateRowsFromPages(data.value.pages);
});

const loadMore = () => fetchNextPage.value();

</script>

<template>
  <div class="container relative mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900 pt-4">Investment pools</h1>
          <p class="mt-2 text-sm text-gray-700">A list of pools in the mainnet.</p>
        </div>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle">
            <div class="shadow-sm ring-1 ring-black ring-opacity-5">
              <div
                v-if="isLoading"
                class="flex justify-center items-center animate-pulse h-60 min-w-full text-indigo-600 text-lg">
                Loading pools...
              </div>
              <table v-else class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Tokens</th>
                    <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Composition</th>
                    <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Pool Value</th>
                    <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Volume (24h)
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr
                    v-for="(pool, poolIdx) in pools" :key="pool.id" class="hover:bg-gray-100 cursor-pointer"
                    :class="poolIdx % 2 === 0 ? undefined : 'bg-gray-50'"
                    @click="router.push({ name: 'pool', params: { id: pool.id } })">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <div class="flex items-center">
                        <TokenIcons :token-uris="pool.tokenUris"></TokenIcons>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 ">{{ pool.composition }}</td>
                    <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{{ pool.totalLiquidityUSD }}</td>
                    <!-- TODO: fetch pool history to calculate 24hours volume -->
                    <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">-</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="!isLoading && !isFetchingNextPage && hasNextPage" class="load-more-btn" @click="loadMore">
                <button>Load more</button>
              </div>
              <div v-if="isFetchingNextPage" class="flex items-center justify-center h-16 text-gray-800">
                <div class="animate-pulse">
                  Loading more...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.load-more-btn {
  @apply flex items-center justify-center h-16;
  @apply text-indigo-500 font-medium hover:text-indigo-800;
  @apply hover:bg-indigo-50 cursor-pointer;
}
</style>