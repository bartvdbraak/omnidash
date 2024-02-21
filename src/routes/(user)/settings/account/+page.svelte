<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import type { PageData } from './$types';
	import UsernameForm from './username-form.svelte';
	import EmailForm from './email-form.svelte';
	import PasswordForm from './password-form.svelte';

	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Account</h3>
		<p class="text-sm text-muted-foreground">Update your account settings.</p>
	</div>
	<Separator />
	<UsernameForm user={data.user} data={data.usernameForm} />
	<EmailForm
		user={data.user}
		requestData={data.emailRequestForm}
		confirmData={data.emailConfirmForm}
	/>
	<PasswordForm data={data.passwordForm} />
</div>
