import {createI18n} from 'vue-i18n'
import en from '../locales/en.json'
import pt from '../locales/pt.json'
import es from '../locales/es.json'

export const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    pt,
    es
  }
})
