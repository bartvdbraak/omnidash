import { error } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			const email = body.email.toString();
			await locals.pocketBase.collection('users').requestPasswordReset(email);
			return {
				success: true
			};
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong');
		}
	}
};