import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { usernameFormSchema } from './username-form.svelte';
import { emailRequestFormSchema, emailConfirmFormSchema } from './email-form.svelte';
import { passwordFormSchema } from './password-form.svelte';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		usernameForm: await superValidate(zod(usernameFormSchema)),
		emailRequestForm: await superValidate(zod(emailRequestFormSchema)),
		emailConfirmForm: await superValidate(zod(emailConfirmFormSchema)),
		passwordForm: await superValidate(zod(passwordFormSchema))
	};
};

export const actions: Actions = {
	username: async ({ request, locals }) => {
		const form = await superValidate(request, zod(usernameFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		await locals.pocketBase.collection('users').update(locals.id, form.data);
		return {
			form
		};
	},
	emailRequest: async ({ request, locals }) => {
		const form = await superValidate(request, zod(emailRequestFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		await locals.pocketBase.collection('users').requestEmailChange(form.data.newEmail);
		return {
			form
		};
	},
	emailConfirm: async ({ request, locals }) => {
		const form = await superValidate(request, zod(emailConfirmFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		await locals.pocketBase
			.collection('users')
			.confirmEmailChange(form.data.token, form.data.password);
		return {
			form
		};
	},
	password: async ({ request, locals }) => {
		const form = await superValidate(request, zod(passwordFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		await locals.pocketBase.collection('users').update(locals.id, form.data);
		return {
			form
		};
	}
};
