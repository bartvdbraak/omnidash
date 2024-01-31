<script lang="ts">
	import { dev } from '$app/environment';
	import { Metadata, SiteFooter, SiteNavBar, TailwindIndicator } from '$lib/components/site';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ModeWatcher />

<Metadata />

<div class="relative flex min-h-screen flex-col" id="page">
	<SiteNavBar authenticated={data.authenticated} />
	<main class="container relative mb-4 mt-12 flex-1">
		<div in:fade={{ duration: 200, delay: 100 }} out:fade={{ duration: 100 }}>
			<slot />
		</div>
	</main>
	<SiteFooter />
	{#if dev}
		<TailwindIndicator />
	{/if}
</div>
