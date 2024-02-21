import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from '../$types';
import { appearanceFormSchema } from './appearance-form.svelte';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(appearanceFormSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(appearanceFormSchema));
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
