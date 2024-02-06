import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.pocketBase.authStore.isValid) {
		throw redirect(303, '/auth');
	}

	return {};
};
