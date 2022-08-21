<script setup lang="ts">

import { usePoolQuery } from '@/pages/pool/composables/usePoolQuery';

const route = useRoute();

const poolId = route.params.id as string;
const { isLoading, data, error } = usePoolQuery(poolId);

const pool = computed(() => data.value ? data.value : null)

</script>

<template>
  <div class="container relative mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1
          v-if="!isLoading"
          class="text-xl font-semibold text-gray-900 pt-4">{{pool?.poolType}} pool</h1>
        </div>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle">
            <div class="shadow-sm ring-1 ring-black ring-opacity-5">
              <div
                v-if="isLoading"
                class="flex justify-center items-center animate-pulse h-60 min-w-full text-indigo-600 text-lg">
                Loading pool...
              </div>
              <div
                v-else-if="error"
                class="flex justify-center items-center animate-pulse h-60 min-w-full text-red-600 text-lg">
                Unexpected error 😰
              </div>
              <table v-else class="min-w-full divide-y divide-gray-300 w-1/2">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Token</th>
                    <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Weight</th>
                    <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Balance</th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr v-for="token in pool?.tokens" :key="token.symbol">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <div class="flex items-center">
                        <img class="w-8 rounded-full" :src="token.logoURI" />
                        <div class="pl-2">{{ token.symbol }}</div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{{ token.weight }}</td>
                    <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 ">{{ token.balance }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
