import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (async ({ locals }: { locals: App.Locals }) => {
	return {
		authenticated: locals.pocketBase.authStore.isValid
	};
});