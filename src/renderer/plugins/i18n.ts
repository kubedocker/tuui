import { createI18n } from 'vue-i18n'
import en from '@/renderer/locales/en.json'
import zh from '@/renderer/locales/zh.json'
// import ko from '@/renderer/locales/ko.json'
// import zhHant from '@/renderer/locales/zh-hant.json'
// import de from '@/renderer/locales/de.json'
// import es from '@/renderer/locales/es.json'
// import ja from '@/renderer/locales/ja.json'
// import fr from '@/renderer/locales/fr.json'
// import ru from '@/renderer/locales/ru.json'
// import pt from '@/renderer/locales/pt.json'
// import nl from '@/renderer/locales/nl.json'
import { getCurrentLocale } from '@/renderer/utils'

export default createI18n({
  legacy: false,
  locale: getCurrentLocale(),
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en,
    zh

    // ko,
    // zhHant,
    // de,
    // es,
    // ja,
    // fr,
    // ru,
    // pt,
    // nl,
    // zhHans,
  }
})
