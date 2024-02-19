<script lang="ts">
	import { siteConfig } from '$lib/config/site';
</script>

<footer class="container py-6">
	<div class="space-y-1">
		<p class="text-center text-sm text-muted-foreground">
			&copy; {new Date().getFullYear()} &mdash;
			<a href={siteConfig.links.gitHubProject} target="_blank">{siteConfig.name}</a>
			by <a href={siteConfig.links.gitHubProfile} target="_blank">{siteConfig.author}</a>. Licensed
			GPL-3.0.
		</p>
	</div>
</footer>
