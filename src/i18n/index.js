import { createI18n } from "vue-i18n";
import pluralRules from "./rules/pluralization"
import numberFormats from "./rules/numbers.js"
import datetimeFormats from "./rules/datetime.js"
import en from "./locales/en.json"

//usage
/* <h1>{{ $t("home.header") }}</h1>
    <p>{{ $t("home.created_by", {company: "Lokalise"}) }}</p>
    <p>{{ $t("home.num_visits", 1) }}</p>
    <p>{{ $d(new Date(), "longFormat") }}</p>
    <p>{{ $t("about.donations", { donations: $n(1456, "currencyFormat") }) }}</p>
     */

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages: { en },
    //pluralRules,
    //numberFormats,
    //datetimeFormats,
})