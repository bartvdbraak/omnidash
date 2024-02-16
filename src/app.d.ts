import PocketBase from 'pocketbase';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			pocketBase: PocketBase;
			id: string;
			email: string;
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
