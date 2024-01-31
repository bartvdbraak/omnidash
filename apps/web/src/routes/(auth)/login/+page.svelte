<script lang="ts">
	import { enhance } from '$app/forms';
	import { Icons } from '$lib/components/site/icons';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Alert from '$lib/components/ui/alert';
	import { cn } from '$lib/utils';

	export let form;
	let isLoading = false;
</script>

<div class="lg:p-8">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Log into your account</h1>
			<p class="text-muted-foreground text-sm">
				Enter your email and password below to log into your account
			</p>
		</div>
		<div class={cn('grid gap-6')} {...$$restProps}>
			<form method="POST" use:enhance={() => { isLoading = true; }}>
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
					<div class="grid gap-1">
						<Label class="sr-only" for="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							disabled={isLoading}
							placeholder="Password"
						/>
					</div>
					<Button type="submit" disabled={isLoading}>
						{#if isLoading}
							<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Sign In
					</Button>
				</div>
				{#if form?.notVerified}
					<Alert.Root>
						<Alert.Title></Alert.Title>
						<Alert.Description>You must verify your email before you can login.</Alert.Description>
					</Alert.Root>
				{/if}
			</form>
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t" />
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background text-muted-foreground px-2"> Or continue with </span>
				</div>
			</div>
			<form action="/?msauth" method="POST">
				<Button type="submit" variant="outline" disabled={true} class="w-full">
					{#if isLoading}
						<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
					{:else}
						<Icons.microsoft class="mr-2 h-4 w-4" />
					{/if}
					{' '}
					Microsoft
				</Button>
			</form>
		</div>
		<p class="text-muted-foreground px-8 text-center text-sm">
			Don't have an account? <a class="text-primary underline" href="/register">Sign up.</a> <br />
			Forgot password? <a class="text-primary underline" href="/reset-password">Reset password.</a>
		</p>
	</div>
</div>
