import type { LayoutServerLoad } from './$types';

const fullNameToInitials = (fullName: string) =>
	fullName
		.split(' ')
		.filter((word) => word)
		.map((word) => word[0].toUpperCase())
		.slice(0, 2)
		.join('');

export const load: LayoutServerLoad = async ({
	locals,
	url
}: {
	locals: App.Locals;
	url: { pathname: string };
}) => {
	const user = locals.pocketBase.authStore.model;
	if (user) {
		user.avatarUrl = locals.pocketBase.getFileUrl(user, user.avatar);
		user.initials = fullNameToInitials(user.name || user.username);
	}

	return {
		url: url.pathname,
		authenticated: locals.pocketBase.authStore.isValid,
		user,
		providers: (await locals.pocketBase.collection('users').listAuthMethods()).authProviders
	};
};
