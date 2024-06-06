import {createRouter, createWebHistory} from 'vue-router/auto'
import {setupLayouts} from 'virtual:generated-layouts'
import notFound from "../pages/not-found.vue";
import ViewBook from "../pages/book/view-book.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
})

router.beforeEach((to, from, next) => {
  const app = localStorage.getItem('app')
  const user_id = JSON.parse(app)?.user.id;

  if (to.fullPath === '/')
    next('/books')

  if (user_id)
    if (to.fullPath === '/login' && user_id !== -1)
      next('/books')

  next()
})

router.addRoute({
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: notFound,
})

router.addRoute({
  path: '/books/:id',
  name: 'ViewBook',
  component: ViewBook,
})

export default router
