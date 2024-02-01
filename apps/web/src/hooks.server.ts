import { redirect, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { pb } from '$lib/pocketbase';
import { PUBLIC_CLIENT_PB } from '$env/static/public';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pocketBase = new PocketBase(PUBLIC_CLIENT_PB);

	pb.set(event.locals.pocketBase);

	event.locals.pocketBase.authStore.loadFromCookie(event.request.headers.get('cookie') ?? '');
	// try {
	// 	//refresh the auth if it is valid
	// 	if (!event.locals.pocketBase.authStore.isValid)
	// 		await event.locals.pocketBase
	// 			.collection('users')
	// 			.authRefresh<{ id: string; email: string }>();
	// 	//spread the model to locals.user to be available in all pages
	// 	event.locals.user = { ...event.locals.pocketBase.authStore.model };
	// } catch (err) {
	// 	console.log(err, 'error in hooks');
	// 	event.locals.pocketBase.authStore.clear();
	// }
	const response = await resolve(event);

	response.headers.set(
		'set-cookie',
		event.locals.pocketBase.authStore.exportToCookie({ secure: false })
	);

	return response;
};
