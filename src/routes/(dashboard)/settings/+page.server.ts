import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, type Actions } from '@sveltejs/kit';
import { nameFormSchema } from './(components)/name-form.svelte';
import { emailConfirmFormSchema, emailRequestFormSchema } from './(components)/email-form.svelte';
import { passwordFormSchema } from './(components)/password-form.svelte';
import { avatarFormSchema } from './(components)/avatar-form.svelte';

export const load: PageServerLoad = async () => {
	return {
		forms: {
			name: await superValidate(nameFormSchema),
			emailRequest: await superValidate(emailRequestFormSchema),
			emailConfirm: await superValidate(emailConfirmFormSchema),
			password: await superValidate(passwordFormSchema),
			avatar: await superValidate(avatarFormSchema),
			debug: false
		}
	};
};

export const actions: Actions = {
	name: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
		const form = await superValidate(request, nameFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		await locals.pocketBase.collection('users').update(locals.id, form.data);
		return { form };
	},
	emailRequest: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
		console.log(request);
		const form = await superValidate(request, emailRequestFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		await locals.pocketBase.collection('users').requestEmailChange(form.data.newEmail);
		return { form };
	},
	emailConfirm: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
		const form = await superValidate(request, emailConfirmFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		await locals.pocketBase
			.collection('users')
			.confirmEmailChange(form.data.token, form.data.password);
		return { form };
	},
	password: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
		const form = await superValidate(request, passwordFormSchema);
		console.log(form);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		await locals.pocketBase.collection('users').update(locals.id, form.data);
		return { form };
	},
	avatar: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
		const formData = await request.formData();
		const form = await superValidate(request, avatarFormSchema);

		if (!form.valid) return fail(400, { form });

		const file = formData.get('file');
		if (file instanceof File) {
			await locals.pocketBase.collection('users').update(locals.id, { avatar: file });
		}
		return { form };
	}
};
