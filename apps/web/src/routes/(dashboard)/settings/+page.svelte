<script lang="ts">
	import type { PageData } from './$types';
	import ProfileForm from './profile-form.svelte';
	import { Separator } from '$lib/components/ui/separator';

	export let data: PageData;
	export let { form, user } = data;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Account</h3>
		<p class="text-sm text-muted-foreground">Update your account and profile settings.</p>
	</div>
	<Separator />
	<ProfileForm data={form} {user} />
</div>
