import { createRouter, createWebHashHistory } from 'vue-router'
import Objects from '@/pages/objects.vue'
import Premise from '@/pages/premise.vue'
import Stat from '@/pages/stat.vue'
import Person from '@/pages/person.vue'
import Transformations from '@/pages/transformations.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/person',
      component: Person,
    },
    {
      path: '/',
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
    {
      path: '/tansformations',
      component: Transformations,
    },
  ],
})

export default router
