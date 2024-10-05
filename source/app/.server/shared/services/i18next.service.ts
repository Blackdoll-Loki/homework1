import { resolve } from "node:path";
import { RemixI18Next } from "remix-i18next/server";
import i18n from "~/admin/locale/i18n"; // your i18n configuration file
//import { i18nCookie } from '~/public/cookie'
import {createCookie} from  '@remix-run/node';
import { sessionStorage } from "~/.server/admin/utils/session.util";

export const LOCALE_SESSION_KEY = 'locale';

const i18nextServer = new RemixI18Next({
	detection: {
		supportedLanguages: i18n.supportedLngs,
		fallbackLanguage: i18n.fallbackLng,
    sessionStorage,
    sessionKey: LOCALE_SESSION_KEY
	},
	// This is the configuration for i18next used
	// when translating messages server-side only
	i18next: {
		...i18n,
	},
});

export default i18nextServer;
