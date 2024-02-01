<script lang="ts">
	import { Icons, ModeToggle, MainNav, MobileNav } from '$lib/components/site';
	import { siteConfig } from '$lib/config/site';
	import UserNav from './nav/user-nav.svelte';

	export let authenticated = false;
	export let user = {};
</script>

<header
	class="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur"
>
	<div class="container flex h-14 items-center">
		<a href="/" class="mr-6 flex items-center space-x-2">
			<span class="sr-only">Logo (return home)</span>
			<Icons.logo />
			<span class="text-xl font-bold tracking-tight">{siteConfig.name}</span>
		</a>
		<MainNav {authenticated} />
		<div class="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
			<nav class="flex">
				<ModeToggle />
			</nav>
			<MobileNav {authenticated} />
			<UserNav {authenticated} {user}/>
		</div>
	</div>
</header>
