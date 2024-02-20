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
			const emailUsername = body.emailUsername.toString();
			const password = body.password.toString();
			await locals.pocketBase.collection('users').authWithPassword(emailUsername, password);
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
	register: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
		if (locals.pocketBase.authStore.isValid) {
			return;
		}

		const formData = await request.formData();

		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');
		const passwordConfirm = formData.get('passwordConfirm');

		try {
			if (typeof name !== 'string') {
				throw new Error('Name must be a string');
			}

			if (name.length === 0) {
				throw new Error('Please enter a valid name');
			}

			if (typeof email !== 'string') {
				throw new Error('Email must be a string');
			}

			if (email.length < 5) {
				throw new Error('Please enter a valid e-mail address');
			}

			if (typeof password !== 'string') {
				throw new Error('Password must be a string');
			}

			if (password.length < 8) {
				throw new Error('Password must be at least 8 characters in length');
			}

			if (password !== passwordConfirm) {
				throw new Error('Passwords do not match');
			}

			await locals.pocketBase.collection('users').create({
				name,
				email,
				password,
				passwordConfirm
			});

			await locals.pocketBase.collection('users').authWithPassword(email, password);
			if (!locals.pocketBase?.authStore?.model?.verified) {
				locals.pocketBase.authStore.clear();
				return {
					showLogin: true,
					isLoading: false,
					notVerified: true
				};
			}
		} catch (error) {
			console.error(error);

			if (!(error instanceof Error)) {
				return {
					name,
					email,
					password,
					error: 'Unknown error occured when signing up user'
				};
			}

			return { error: error.message, name, email, password };
		}

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
