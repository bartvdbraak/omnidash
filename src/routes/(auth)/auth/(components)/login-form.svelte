<script lang="ts">
	import { enhance } from '$app/forms';
	import { Icons } from '$lib/components/site/icons';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Alert from '$lib/components/ui/alert';
	import { cn } from '$lib/utils';
	import type { ActionData } from '../$types';

	export let form: ActionData;
	export let isLoading = false;
</script>

<div class="flex flex-col space-y-2 text-center">
	<h1 class="text-2xl font-semibold tracking-tight">Log into your account</h1>
	<p class="pb-6 text-sm text-muted-foreground">
		Enter your credentials below to log into your account
	</p>
</div>
<div class={cn('grid gap-6')} {...$$restProps}>
	<form
		method="POST"
		action="?/login"
		use:enhance={() => {
			isLoading = true;
			return async ({ update }) => {
				isLoading = false;
				update();
			};
		}}
	>
		<div class="grid gap-2">
			<div class="grid gap-2">
				<Label for="email-username">Email or username</Label>
				<Input
					id="email-login"
					name="email-username"
					type="text"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password-login" name="password" type="password" disabled={isLoading} />
			</div>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Sign In
			</Button>
		</div>
		{#if form?.notVerified}
			<Alert.Root class="mt-4">
				<Alert.Description>You must verify your email before you can log in.</Alert.Description>
			</Alert.Root>
		{/if}
	</form>
</div>
