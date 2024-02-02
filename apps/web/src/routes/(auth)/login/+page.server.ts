import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
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

		throw redirect(303, '/');
	}
	// TODO: Implement MS Auth
	// msauth: async ({ request, cookies }) => {
	// 	const form = await request.formData();
	// 	const token = form.get('token');
	// 	if (!token || typeof token !== 'string') {
	// 		throw redirect(303, '/login');
	// 	}
	// 	cookies.set('pb_auth', JSON.stringify({ token: token }), { path: '/' });
	// 	throw redirect(303, '/');
	// }
} satisfies Actions;
