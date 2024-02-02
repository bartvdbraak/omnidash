import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }: { locals: App.Locals }) => {
	const user = locals.pocketBase.authStore.model;
	if (user) user.avatarUrl = locals.pocketBase.getFileUrl(user, user.avatar);

	return {
		authenticated: locals.pocketBase.authStore.isValid,
		user
	};
};
