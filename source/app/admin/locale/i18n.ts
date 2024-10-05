import { $Enums } from "@prisma/client";
import type { InitOptions } from "i18next";
import enTranslations from "./translations/en.json";
import uaTranslations from "./translations/uk.json"

export const EN_LANG = $Enums.Language.EN.toLowerCase();
export const UK_LANG = $Enums.Language.UK.toLowerCase();

export const LANGUAGES = [EN_LANG, UK_LANG];


export default {
	supportedLngs: LANGUAGES,
	fallbackLng: EN_LANG,
	defaultNS: "common",
  ns: ["common"],
  resources: {
    [EN_LANG]: {
      common: enTranslations,
    },
    [UK_LANG]: {
      common: uaTranslations,
    }
  }
} satisfies InitOptions
