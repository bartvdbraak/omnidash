import type { LayoutServerLoad } from './$types';

// export function load({locals}){
// 	console.log('base token',locals.userPb.authStore.token);
// 	console.log('valid',locals.userPb.authStore.isValid);
// 	if(!locals.userPb.authStore.token) throw redirect(303,'/login');

// 	const user = {
// 			firstname: locals.userPb.authStore.baseModel.firstname
// 	}

// 	return{
// 			user
// 	}
// }

export const load: LayoutServerLoad = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.pocketBase.authStore.token) {
		return {
			authenticated: locals.pocketBase.authStore.isValid,
			user: locals.pocketBase.authStore.model?.baseModel
		};
	} else {
		return {
			authenticated: locals.pocketBase.authStore.isValid,
			user: {}
		};
	}
};
