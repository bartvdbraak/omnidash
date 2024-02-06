import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/register');
	}

	return {};
};
