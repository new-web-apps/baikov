import { createRouter, createWebHistory } from 'vue-router'
import Objects from '@/pages/objects.vue'
import Premise from '@/pages/premise.vue'
import Stat from '@/pages/stat.vue'
import Person from '@/pages/person.vue'
import Transformations from '@/pages/transformations.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/person',
      component: Person,
    },
    {
      path: '/premise',
      component: Premise,
    },
    {
      path: '/',
      component: Objects,
    },
    {
      path: '/stat',
      component: Stat,
    },
    {
      path: '/tansformations',
      component: Transformations,
    },
  ],
})

export default router
