<script lang="ts">
	import { dev } from '$app/environment';
	import { Metadata, SiteFooter, SiteNavBar, TailwindIndicator } from '$lib/components/site';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import '../app.pcss';
	import type { LayoutData } from './$types';
	import DataIndicator from '$lib/components/site/data-indicator.svelte';
	import { fly } from 'svelte/transition';
	import { Toaster } from 'svelte-sonner';
	import {} from 'mode-watcher';

	export let data: LayoutData;

	if (data.user?.appearanceMode) {
		setMode(data.user.appearanceMode);
	}
</script>

<ModeWatcher defaultMode={data.user?.appearanceMode ?? 'system'} />
<Toaster />
<Metadata />

<div class="relative flex min-h-screen flex-col" id="page">
	<SiteNavBar authenticated={data.authenticated} user={data.user} />
	<main class="container relative flex-1">
		{#key `/${data.url.split('/')[1]}`}
			<div in:fly={{ x: -200, duration: 200, delay: 100 }} out:fly={{ x: 200, duration: 100 }}>
				<slot />
			</div>
		{/key}
	</main>
	<SiteFooter />
	{#if dev}
		<div class="fixed bottom-1 left-1 z-50 flex font-mono uppercase">
			<DataIndicator {data} />
			<TailwindIndicator />
		</div>
	{/if}
</div>
