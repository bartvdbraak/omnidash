import { type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { pb } from '$lib/pocketbase';
import { PUBLIC_CLIENT_PB } from '$env/static/public';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pocketBase = new PocketBase(PUBLIC_CLIENT_PB);

	pb.set(event.locals.pocketBase);

	event.locals.pocketBase.authStore.loadFromCookie(event.request.headers.get('cookie') ?? '');

	const response = await resolve(event);

	response.headers.set(
		'set-cookie',
		event.locals.pocketBase.authStore.exportToCookie({ secure: false })
	);

	return response;
};
