<script>
	import Badge from '$lib/components/ui/badge/badge.svelte';
</script>

<div class="fixed bottom-1 left-1 z-50 flex font-mono uppercase">
	<Badge variant="outline" class="block sm:hidden">xs</Badge>
	<Badge variant="outline" class="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden"
		>sm</Badge
	>
	<Badge variant="outline" class="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</Badge>
	<Badge variant="outline" class="hidden lg:block xl:hidden 2xl:hidden">lg</Badge>
	<Badge variant="outline" class="hidden xl:block 2xl:hidden">xl</Badge>
	<Badge variant="outline" class="hidden 2xl:block">2xl</Badge>
</div>
