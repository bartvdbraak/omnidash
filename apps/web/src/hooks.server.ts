import { type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { building, dev } from '$app/environment';
import { SERVER_PB } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.id = '';
	event.locals.email = '';
	event.locals.pocketBase = new PocketBase(SERVER_PB);

	const isAuth: boolean = event.url.pathname === '/auth';
	if (isAuth || building) {
		event.cookies.set('pb_auth', '', { path: '/' });
		return await resolve(event);
	}

	const pb_auth = event.request.headers.get('cookie') ?? '';
	event.locals.pocketBase.authStore.loadFromCookie(pb_auth);
	try {
		const auth = await event.locals.pocketBase
			.collection('users')
			.authRefresh<{ id: string; email: string }>();
		event.locals.id = auth.record.id;
		event.locals.email = auth.record.email;
	} catch (err) {
		console.log('Error: ', err);
	}

	const response = await resolve(event);
	const cookie = event.locals.pocketBase.authStore.exportToCookie({
		secure: !dev,
		sameSite: 'lax'
	});
	response.headers.append('set-cookie', cookie);
	return response;
};
