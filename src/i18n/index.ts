import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import zh from './locale/zh.json'
import en from './locale/en.json'

const lng = window.localStorage.getItem('language') || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
    },
    debug: import.meta.env.DEV,
    lng,
    fallbackLng: lng,
    interpolation: {
      escapeValue: false,
    },
  })
  .then()
