<script lang="ts">
	import { Icons, ModeToggle, MainNav, MobileNav } from '$lib/components/site';
</script>

<header
	class="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur"
>
	<div class="container flex h-14 items-center">
		<a href="/" class="mr-6 flex items-center space-x-2">
			<span class="sr-only">Logo (return home)</span>
			<Icons.logo />
		</a>
		<MainNav />
		<div class="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
			<nav class="flex">
				<ModeToggle />
			</nav>
		</div>
		<MobileNav />
	</div>
</header>
