<script lang="ts">
	import { Icons } from '$lib/components/site';
	import Particles from '$lib/components/site/particles.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { siteConfig } from '$lib/config/site';
</script>

<div class="absolute inset-0 -z-10">
	<Particles />
</div>
<div class="pb-16 pt-52 md:pb-32 md:pt-60">
	<div class="container mx-auto text-center">
		<h1
			class="bg-gradient-to-r from-zinc-800 via-zinc-800/60 to-zinc-800 bg-clip-text pb-4 text-4xl font-extrabold tracking-tight text-transparent dark:from-zinc-200/60 dark:via-zinc-200 dark:to-zinc-200/60 sm:text-5xl md:text-6xl lg:text-7xl"
		>
			<span class="inline-block text-balance align-top decoration-inherit"> Omnidash </span>
		</h1>
		<p class="mb-8 text-sm text-zinc-800 dark:text-zinc-300 md:text-xl">
			Tame ticket overload and keep your operations teams sane
		</p>
		<div
			class="mx-auto flex max-w-xs flex-col items-center gap-4 sm:inline-flex sm:max-w-none sm:flex-row sm:justify-center"
		>
			<Button
				href="/dashboard"
				class="group flex w-full items-center transition duration-150 ease-in-out"
			>
				Get Started <Icons.arrowRight
					class="text-primary-500 ml-1 h-3 w-3 tracking-normal transition-transform duration-150 ease-in-out group-hover:translate-x-0.5"
				/>
			</Button>
			<Button href={siteConfig.links.gitHubProject} target="_blank" variant="outline"
				>Star on GitHub</Button
			>
		</div>
	</div>
</div>
