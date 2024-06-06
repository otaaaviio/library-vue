import { createRouter, createWebHistory } from 'vue-router'
import Account from '../pages/account.vue'
import ListBook from '../pages/book/list-book.vue'
import ViewBook from '../pages/book/view-book.vue'
import ListToRead from '../pages/list-to-read.vue'
import Login from '../pages/login.vue'
import MyReviews from '../pages/my-reviews.vue'
import NotFound from '../pages/not-found.vue'

const routes = [
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { layout: 'DefaultLayout'}
  },
  {
    path: '/books',
    name: 'ListBook',
    component: ListBook,
    meta: { layout: 'DefaultLayout'}
  },
  {
    path: '/books/:id',
    name: 'ViewBook',
    component: ViewBook,
    meta: { layout: 'DefaultLayout'}
  },
  {
    path: '/to-read',
    name: 'ListToRead',
    component: ListToRead,
    meta: { layout: 'DefaultLayout'}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'DefaultLayout'}
  },
  {
    path: '/my-reviews',
    name: 'MyReviews',
    component: MyReviews,
    meta: { layout: 'DefaultLayout'}
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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

export default router
