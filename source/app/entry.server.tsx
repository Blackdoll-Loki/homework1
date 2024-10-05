import { PassThrough } from "stream";
import {
	createReadableStreamFromReadable,
	type EntryContext,
} from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createInstance } from "i18next";
import i18nextServer from "~/.server/shared/services/i18next.service";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";
import i18n from "./admin/locale/i18n"; // your i18n configuration file
import { resolve } from "node:path";
import { containsInsensitive } from "./.server/shared/utils/prisma.util";

const ABORT_DELAY = 5000;

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
) {
	let callbackName = isbot(request.headers.get("user-agent"))
		? "onAllReady"
		: "onShellReady";

	let instance = createInstance();
	let lng = await i18nextServer.getLocale(request);
	let ns = i18nextServer.getRouteNamespaces(remixContext);
	await instance
		.use(initReactI18next) // Tell our instance to use react-i18next
		.init({
			...i18n, // spread the configuration
			lng, // The locale we detected above
			ns, // The namespaces the routes about to render wants to use
		});

	return new Promise((resolve, reject) => {
		let didError = false;

		let { pipe, abort } = renderToPipeableStream(
			<I18nextProvider i18n={instance}>
				<RemixServer context={remixContext} url={request.url} />
			</I18nextProvider>,
			{
				[callbackName]: () => {
					let body = new PassThrough();
					const stream = createReadableStreamFromReadable(body);
					responseHeaders.set("Content-Type", "text/html");

					resolve(
						new Response(stream, {
							headers: responseHeaders,
							status: didError ? 500 : responseStatusCode,
						}),
					);

					pipe(body);
				},
				onShellError(error: unknown) {
					reject(error);
				},
				onError(error: unknown) {
					didError = true;

					console.error(error);
				},
			},
		);

		setTimeout(abort, ABORT_DELAY);
	});
}
