import { redirect } from "@sveltejs/kit";

export const GET = ({locals}: {locals: App.Locals}) => {
  locals.pocketBase.authStore.clear();
  throw redirect(303, '/login');
}