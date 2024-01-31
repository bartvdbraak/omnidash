<script lang="ts">
	import { Icons } from '$lib/components/site';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { siteConfig } from '$lib/config/site';
</script>

<div class="pb-16 pt-32 md:pb-32 md:pt-52">
	<div class="container mx-auto text-center">
		<h1
			class="bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60 bg-clip-text pb-4 text-6xl font-extrabold tracking-tight text-transparent lg:text-7xl"
		>
			<span class="inline-block align-top decoration-inherit text-balance">One Dashboard, Countless Solutions</span
			>
		</h1>
		<p class="mb-8 text-lg text-zinc-300">
			Tame ticket overload and keep your operations teams sane
		</p>
		<div
			class="mx-auto flex max-w-xs flex-col items-center gap-4 sm:inline-flex sm:max-w-none sm:flex-row sm:justify-center"
		>

			<Button href="/dashboard" class="group flex w-full items-center transition duration-150 ease-in-out">
				Get Started <Icons.arrowRight class="text-primary-500 ml-1 h-3 w-3 tracking-normal transition-transform duration-150 ease-in-out group-hover:translate-x-0.5"/>
			</Button>
			<Button href={siteConfig.links.gitHubProject} variant="outline">
				Star on GitHub
			</Button>
		</div>
	</div>
</div>
