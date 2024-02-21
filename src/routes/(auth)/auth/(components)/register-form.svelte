<script lang="ts">
	import { enhance } from '$app/forms';
	import { Icons } from '$lib/components/site/icons';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	export let isLoading = false;
</script>

<div class="flex flex-col space-y-2 text-center">
	<h1 class="text-2xl font-semibold tracking-tight">Create your account</h1>
	<p class="pb-6 text-sm text-muted-foreground">Enter your details below to create a new account</p>
</div>
<div class={cn('grid gap-6')} {...$$restProps}>
	<form
		method="POST"
		action="?/register"
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
				<Label for="email">Name</Label>
				<Input id="name" name="name" type="name" disabled={isLoading} />
			</div>
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input
					id="email"
					name="email"
					type="email"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password" name="password" type="password" disabled={isLoading} />
			</div>
			<div class="grid gap-2">
				<Label for="passwordConfirm">Confirm password</Label>
				<Input id="passwordConfirm" name="passwordConfirm" type="password" disabled={isLoading} />
			</div>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Register
			</Button>
		</div>
	</form>
</div>
