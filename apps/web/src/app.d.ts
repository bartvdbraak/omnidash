import PocketBase from 'pocketbase';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			pocketBase: PocketBase;
			user: object;
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
