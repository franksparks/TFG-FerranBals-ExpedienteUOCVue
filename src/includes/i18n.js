import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import cat from "@/locales/cat.json";
export default createI18n({
  legacy: false,
  locale: "es",
  fallbackLocale: "es",
  messages: {
    en,
    es,
    cat,
  },
});
