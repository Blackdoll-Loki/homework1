import {Links, Meta, Outlet, Scripts, ScrollRestoration,} from '@remix-run/react';
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";
import { json } from '@remix-run/node';
//import './tailwind.css';
export async function loader({ request }: LoaderArgs) {
	let locale = await i18next.getLocale(request);
	return json({ locale });
}

export let handle = {
	// In the handle export, we can add a i18n key with namespaces our route
	// will need to load. This key can be a single string or an array of strings.
	// TIP: In most cases, you should set this to your defaultNS from your i18n config
	// or if you did not set one, set it to the i18next default namespace "translation"
	i18n: "common",
};

export function Layout({children}: { children: React.ReactNode }) {
  let { locale } = useLoaderData<typeof loader>();

	let { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
    </head>
    <body>
    {children}
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
  );
}

export default function App() {
  return <Outlet/>;
}
function useLoaderData<T>(): { locale: any; } {
  throw new Error('Function not implemented.');
}

