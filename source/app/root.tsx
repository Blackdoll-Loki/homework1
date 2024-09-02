import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";
import { i18nCookie } from './cookie'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'

export async function loader({ request }: LoaderArgs) {
	let locale = await i18next.getLocale(request);
   const t = await i18next.getFixedT('common')
  const title = t('headTitle')
  return json({ locale , title}, {
    headers: {"Set-Cookie": await i18nCookie.serialize(locale)}
  })
}

export const handle = {
  // In the handle export, we could add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: ['common']
};

/*export function meta({ data }) {
  return { title: data.title }
}

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }]
}*/

export function Layout({children}: { children: React.ReactNode }) {

  let {locale} = useLoaderData<typeof loader>();
  console.log('locale',locale)
	let { i18n } = useTranslation();
	useChangeLanguage(locale);

  return (
    <html lang={i18n.language} dir={i18n.dir()}>
    <head>
      <Meta/>
      <Links/>
    </head>
    <body>
    {children}
    <ScrollRestoration/>
    <Scripts/>
    <LiveReload />
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

