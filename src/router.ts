import { createRouter, createWebHistory } from 'vue-router'

import Pools from '@/pages/pools/Pools.vue'
import Pool from '@/pages/pool/Pool.vue'

export const routes = [
  {
    path: '/',
    component: Pools,
    meta: {
      title: 'Pool list',
    },
  },
  {
    name: 'pool',
    path: '/pool/:id',
    component: Pool,
    meta: {
      title: 'Pool detail',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
