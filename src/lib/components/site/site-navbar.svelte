<script lang="ts">
	import { Icons, ModeToggle, UserNav } from '$lib/components/site';
	import { siteConfig } from '$lib/config/site';

	export let authenticated = false;
	export let user: object | null = null;
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 items-center">
		<a href="/" class="mr-6 flex items-center space-x-2">
			<span class="sr-only">Logo (return home)</span>
			<div class="rounded-sm bg-gray-950 p-0.5 dark:bg-transparent">
				<Icons.logo />
			</div>
			<span class="text-xl font-bold tracking-tight">{siteConfig.name}</span>
		</a>
		<div class="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
			{#if !authenticated}
				<ModeToggle />
			{/if}
			<UserNav {authenticated} {user} />
		</div>
	</div>
</header>
