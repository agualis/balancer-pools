<script setup lang="ts">

import missingToken from '@/assets/images/missing-token.png'

const props = defineProps<{ tokenUris: string[] }>()

</script>

<template>
  <div class="flex items-center">
    <div v-for="uri in props.tokenUris" :key="uri" class="flex h-10 w-15 flex-shrink-0" >
      <img v-if="uri" class="h-8 w-8 rounded-full" :src="uri" />
      <img v-else class="h-8 w-8 rounded-full" :src="missingToken" />
    </div>
  </div>
</template>