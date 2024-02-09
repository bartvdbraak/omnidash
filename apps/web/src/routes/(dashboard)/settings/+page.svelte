<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import NameForm from './(components)/name-form.svelte';
	import EmailForm from './(components)/email-form.svelte';
	import PasswordForm from './(components)/password-form.svelte';
	import AvatarForm from './(components)/avatar-form.svelte';

	export let data: PageData;
	let { forms, user } = data;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Account</h3>
		<p class="text-sm text-muted-foreground">Update your account and profile settings.</p>
	</div>
	<Separator />
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-[4fr,3fr]">
		<div class="space-y-8">
			<NameForm nameFormSchemaData={forms.name} {user} debug={forms.debug} />
			<EmailForm
				emailRequestFormSchemaData={forms.emailRequest}
				emailConfirmFormSchemaData={forms.emailConfirm}
				{user}
				debug={forms.debug}
			/>
			<PasswordForm passwordFormSchemaData={forms.password} debug={forms.debug} />
		</div>
		<div>
			<AvatarForm avatarFormSchemaData={forms.avatar} {user} debug={forms.debug} />
		</div>
	</div>
</div>
