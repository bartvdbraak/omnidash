<script lang="ts">
	import { dev } from '$app/environment';
	import { Metadata, SiteFooter, SiteNavBar, TailwindIndicator } from '$lib/components/site';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import { fade } from 'svelte/transition';
	import type { LayoutData } from './$types';
	import DataIndicator from '$lib/components/site/data-indicator.svelte';

	export let data: LayoutData;
</script>

<ModeWatcher />

<Metadata />

<div class="relative flex min-h-screen flex-col" id="page">
	<SiteNavBar authenticated={data.authenticated} user={data.user} />
	<main class="container relative flex-1">
		<div in:fade={{ duration: 200, delay: 100 }} out:fade={{ duration: 100 }}>
			<slot />
		</div>
	</main>
	<SiteFooter />
	{#if dev}
		<div class="fixed bottom-1 left-1 z-50 flex font-mono uppercase">
			<DataIndicator {data} />
			<TailwindIndicator />
		</div>
	{/if}
</div>
