<script lang="ts">
	import { siteConfig } from '$lib/config/site';
</script>

<footer class="container py-6">
	<div class="space-y-1">
		<p class="text-center text-sm text-muted-foreground">
			&copy; {new Date().getFullYear()} &mdash; {siteConfig.name} by {siteConfig.author}. Licensed
			under GPL-3.0.
		</p>
	</div>
</footer>
