/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Objects from '@/pages/objects.vue'
import Person from '@/pages/person.vue'
import Premise from '@/pages/premise.vue'
import Stat from '@/pages/stat.vue'
import Index from '@/pages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Person,
    },
    {
      path: '/premise',
      component: Premise,
    },
    {
      path: '/objects',
      component: Objects,
    },
    {
      path: '/stat',
      component: Stat,
    },
  ],
})

export default router
