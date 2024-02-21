import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginFormSchema } from './(components)/login-form.svelte';
import { registerFormSchema } from './(components)/register-form.svelte';
import { ssoFormSchema } from './(components)/sso-form.svelte';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		loginForm: await superValidate(zod(loginFormSchema)),
		registerForm: await superValidate(zod(registerFormSchema)),
		ssoForm: await superValidate(zod(ssoFormSchema))
	};
};

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const form = await superValidate(request, zod(loginFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		try {
			await locals.pocketBase
				.collection('users')
				.authWithPassword(form.data.usernameEmail, form.data.password);
		} catch (err) {
			return fail(500, {
				form
			});
		}
		cookies.set('pb_auth', JSON.stringify({ token: locals.pocketBase.authStore.token }), {
			path: '/'
		});
		throw redirect(303, '/');
	},
	register: async ({ request, locals }) => {
		const form = await superValidate(request, zod(registerFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		try {
			await locals.pocketBase.collection('users').create(form.data);
			return {
				form
			};
		} catch (err) {
			return fail(500, {
				form
			});
		}
	},
	sso: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(ssoFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const token = form.data.token;
		try {
			if (!token || typeof token !== 'string') {
				throw redirect(303, '/auth');
			}
			cookies.set('pb_auth', JSON.stringify({ token: token }), { path: '/' });
			return {
				form
			};
		} catch (err) {
			return fail(500, {
				form
			});
		}
	}
};
