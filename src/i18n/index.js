import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import translationsInArabic from "../locales/ar/translation.json"
import translationsInEng from "../locales/en/translation.json"


// the translations
const resources = {
  ar: {
    translation: translationsInArabic
  },
  en: {
    translation: translationsInEng
  },
  it: {
    translation: translationsInArabic
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,  // resources are important to load translations for the languages.
    lng: localStorage.getItem("lang"), // It acts as default language. When the site loads, content is shown in this language.  
    debug: true,
    fallbackLng: "en", // use de if selected language is not available
    interpolation: {
      escapeValue: false
    },
    ns: "translation", // namespaces help to divide huge translations into multiple small files.
    defaultNS: "translation"
  })

export default i18n