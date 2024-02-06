import type { LayoutServerLoad } from './$types';

const fullNameToInitials = (fullName: string) => (
  fullName
    .split(' ')
    .filter(word => word)
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join('')
);

export const load: LayoutServerLoad = async ({ locals }: { locals: App.Locals }) => {
	const user = locals.pb.authStore.model;
	if (user) {
		user.avatarUrl = locals.pb.getFileUrl(user, user.avatar);
		user.initials = fullNameToInitials(user.name || user.username);
	}

	return {
		authenticated: locals.pb.authStore.isValid,
		user,
		authMethods: (await locals.pb.collection('users').listAuthMethods())
	};
};
