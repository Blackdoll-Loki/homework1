import type { InitOptions } from "i18next";
import enTranslations from "./translations/en.json";
import uaTranslations from "./translations/ua.json"


export default {
	supportedLngs: ["en", "ua"],
	fallbackLng: "en",
	defaultNS: "common",
  ns: ["common"],
  resources: {
    en: {
      common: enTranslations,
    },
    ua: {
      common: uaTranslations,
    }
  }
} satisfies InitOptions
