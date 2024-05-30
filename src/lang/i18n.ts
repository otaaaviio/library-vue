import { createI18n } from 'vue-i18n'
import en from './en.json'
import br from './br.json'

export const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    br
  }
})
