import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from '../$types';
import { appearanceFormSchema } from './appearance-form.svelte';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(appearanceFormSchema)
	};
};

export const actions: Actions = {
	default: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
		const form = await superValidate(request, appearanceFormSchema);
		console.log('form: ', form);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		await locals.pocketBase
			.collection('users')
			.update(locals.id, { appearanceMode: form.data.theme });
	}
};
