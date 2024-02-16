<script>
	import Separator from '$lib/components/ui/separator/separator.svelte';
</script>

<div class="space-y-6 p-10 pb-16 md:block">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
		<p class="text-muted-foreground">
			Utilize the filtering options and actions to manage your tickets.
		</p>
	</div>
	<Separator class="my-6" />
	<slot />
</div>
