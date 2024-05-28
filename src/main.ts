import { registerPlugins } from '@/plugins'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import App from './App.vue'

import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);
