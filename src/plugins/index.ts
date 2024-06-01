import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import type { App } from 'vue'
import {i18n} from "./i18n";
import Vue3Toastify, {ToastContainerOptions} from "vue3-toastify";

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(i18n)
    .use(Vue3Toastify, {
      autoClose: 3000,
    } as ToastContainerOptions)
}
