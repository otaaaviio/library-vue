import { createRouter, createWebHistory } from 'vue-router'
import Account from '../pages/account.vue'
import ListBook from '../pages/book/list-book.vue'
import ViewBook from '../pages/book/view-book.vue'
import ListToRead from '../pages/list-to-read.vue'
import Login from '../pages/login.vue'
import MyReviews from '../pages/my-reviews.vue'
import NotFound from '../pages/not-found.vue'
import Unauthorized from '../pages/unauthorized.vue'

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
  },
  {
    path: '/books/:id',
    name: 'ViewBook',
    component: ViewBook,
  },
  {
    path: '/to-read',
    name: 'ListToRead',
    component: ListToRead,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/my-reviews',
    name: 'MyReviews',
    component: MyReviews,
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized,
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

  if (user_id) {
    if (to.fullPath === '/login' && user_id !== -1)
      next('/books')

    if((to.fullPath === '/my-reviews' || to.fullPath === '/to-read' || to.fullPath === '/account') && user_id === -1) {
      next('/unauthorized')
    }
  }

  next()
})

export default router
