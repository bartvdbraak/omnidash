import { redirect } from '@sveltejs/kit';

export const GET = ({ locals }: { locals: App.Locals }) => {
	locals.pb.authStore.clear();
	throw redirect(303, '/');
};
