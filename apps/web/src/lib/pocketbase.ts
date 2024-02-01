import PocketBase from 'pocketbase';
import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { PUBLIC_CLIENT_PB } from '$env/static/public';

export const pb = writable<PocketBase | undefined>(undefined, (set) => {
	if (!browser) {
		return;
	}

	const pocketbaseInstance = new PocketBase(PUBLIC_CLIENT_PB);

	set(pocketbaseInstance);
});

// export function isAdmin(model: RecordModel | AdminModel | null): model is AdminModel {
//   return !!model && !(model as RecordModel)?.collectionId;
// }

// export function getAvatarUrl(
//   pocketbase: Pocketbase,
//   model: RecordModel | AdminModel | null
// ) {
//   if (!model) return undefined;
//   if (isAdmin(model)) return undefined;
//   if (typeof model.avatar !== 'string' || !model.avatar) return undefined;

//   return pocketbase.getFileUrl(model, model.avatar);
// }