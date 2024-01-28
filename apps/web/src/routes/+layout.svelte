<script lang="ts">
	import { dev } from '$app/environment';
	import { Metadata, SiteFooter, SiteNavBar, TailwindIndicator } from '$lib/components/site';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import { fade } from 'svelte/transition';
</script>

<ModeWatcher />

<Metadata />

<div class="relative flex min-h-screen flex-col" id="page">
	<SiteNavBar />
	<main class="container relative mb-4 max-w-[980px] flex-1">
		<!-- {#key data.url} -->
			<div in:fade={{ duration: 200, delay: 100 }} out:fade={{ duration: 100 }}>
				<slot />
			</div>
		<!-- {/key} -->
	</main>
	<SiteFooter />
	{#if dev}
		<TailwindIndicator />
	{/if}
</div>
