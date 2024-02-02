import type { LayoutServerLoad } from './$types';

const fullNameToInitials = (fullName: string) =>
	fullName
		.split(' ')
		.map((word) => word[0].toUpperCase())
		.slice(0, 2)
		.join('');

export const load: LayoutServerLoad = async ({ locals }: { locals: App.Locals }) => {
	const user = locals.pocketBase.authStore.model;
	if (user) {
		user.avatarUrl = locals.pocketBase.getFileUrl(user, user.avatar);
		user.initials = fullNameToInitials(user.name);
	}

	return {
		authenticated: locals.pocketBase.authStore.isValid,
		user
	};
};
