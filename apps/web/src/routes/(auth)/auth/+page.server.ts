import { error, redirect, type Cookies } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	login: async ({
		request,
		locals,
		cookies
	}: {
		request: Request;
		locals: App.Locals;
		cookies: Cookies;
	}) => {
		const body = Object.fromEntries(await request.formData());
		try {
			const email = body.email.toString();
			const password = body.password.toString();
			await locals.pocketBase.collection('users').authWithPassword(email, password);
			if (!locals.pocketBase?.authStore?.model?.verified) {
				locals.pocketBase.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong logging in');
		}
		cookies.set('pb_auth', JSON.stringify({ token: locals.pocketBase.authStore.token }), {
			path: '/'
		});

		throw redirect(303, '/');
	},
	oauth2: async ({ request, cookies }) => {
		const form = await request.formData();
		const token = form.get('token');
		if (!token || typeof token !== 'string') {
			throw redirect(303, '/auth');
		}
		cookies.set('pb_auth', JSON.stringify({ token: token }), { path: '/' });
		throw redirect(303, '/');
	}
} satisfies Actions;
