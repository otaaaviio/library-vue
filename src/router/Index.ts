import {createRouter, createWebHistory} from 'vue-router/auto'
import {setupLayouts} from 'virtual:generated-layouts'
import notFound from "../pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
})

router.beforeEach((to, from, next) => {
  const app = localStorage.getItem('app')
  const user_id = JSON.parse(app)?.user.id;

  if(!user_id && to.name !== '/login')
    next()

  if (to.name === '/login' && user_id !== -1)
    next('/home')

  next()
})

router.addRoute({
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: notFound,
})

export default router
