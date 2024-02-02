<script lang="ts">
	import { enhance } from '$app/forms';
	import { Icons } from '$lib/components/site/icons';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import { CheckCircled } from 'radix-icons-svelte';
	import * as Alert from '$lib/components/ui/alert';

	let isLoading = false;
	export let form;
</script>

<div class="lg:p-8">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Reset password</h1>
			<p class="text-sm text-muted-foreground">
				We'll send you an email with a link to reset your password.
			</p>
		</div>
		<div class={cn('grid gap-6')} {...$$restProps}>
			<form
				method="POST"
				use:enhance={() => {
					isLoading = true;
					return async ({ update }) => {
						isLoading = false;
						update();
					};
				}}
			>
				<div class="grid gap-2">
					<div class="grid gap-1">
						<Label class="sr-only" for="email">Email</Label>
						<Input
							id="email"
							name="email"
							placeholder="name@example.com"
							type="email"
							autocapitalize="none"
							autocomplete="email"
							autocorrect="off"
							disabled={isLoading}
						/>
					</div>
					<Button type="submit" disabled={isLoading}>
						{#if isLoading}
							<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Sign In
					</Button>
				</div>
				{#if form?.success}
					<Alert.Root variant="default" class="mt-2">
						<CheckCircled class="h-4 w-4" />
						<Alert.Description>An email has been sent to reset your password.</Alert.Description>
					</Alert.Root>
				{/if}
			</form>
		</div>
	</div>
</div>
