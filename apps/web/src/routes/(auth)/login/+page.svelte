<script lang="ts">
	import { enhance } from '$app/forms';
	import { Icons } from '$lib/components/site/icons';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Alert from '$lib/components/ui/alert';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils';
	import { ChevronDown } from 'radix-icons-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	export let form;
	let isLoading = false;

	// TODO: Implement Microsoft OAuth2 login
	// import { PUBLIC_CLIENT_PB } from '$env/static/public';
	// import PocketBase from 'pocketbase';
	// const pb = new PocketBase(PUBLIC_CLIENT_PB);
	// async function msLogin() {
	// 	try {
	// 		await pb.collection('users').authWithOAuth2({ provider: 'microsoft' });
	// 		const input = document.createElement('input');
	// 		input.type = 'hidden';
	// 		input.name = 'token';
	// 		input.value = pb.authStore.token;
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// }

	import type { PageData } from './$types';
	import { PUBLIC_CLIENT_PB } from '$env/static/public';

	export let data: PageData;
	export let { providers } = data;
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
			<form
				method="POST"
				use:enhance={() => {
					isLoading = true;
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
			{#if providers.length}
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t" />
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background text-muted-foreground px-2"> Or continue with </span>
				</div>
			</div>
			<form action="/?oauth2" method="POST">
				<div class="bg-secondary text-secondary-foreground flex items-center justify-between rounded-md">
					<!-- Centered Button -->
					<div class="flex items-center space-x-2 w-full justify-center">
						<Button type="submit" variant="secondary" class="px-3" disabled={isLoading}>
							<img
								src={`${PUBLIC_CLIENT_PB}/_/images/oauth2/${providers[0].name}.svg`}
								alt={providers[0].name}
								class="mr-2 h-4 w-4"
							/>
							{providers[0].displayName}
						</Button>
					</div>
					
					<!-- Separator and Dropdown Menu on the right -->
					{#if providers.length > 1}
					<div class="flex items-center space-x-2">
						<Separator orientation="vertical" class="h-[20px] bg-gray-400 dark:bg-gray-500" />
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button builders={[builder]} variant="secondary" class="px-2 shadow-none">
									<ChevronDown class="text-secondary-foreground h-4 w-4" />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content class="w-80" align="end">
								<DropdownMenu.Label class="sr-only">Login Providers</DropdownMenu.Label>
								{#each providers as provider, index (provider.name)}
									{#if index > 0}
									<DropdownMenu.Item>
										<img
											src={`${PUBLIC_CLIENT_PB}/_/images/oauth2/${provider.name}.svg`}
											alt={provider.name}
											class="mr-2 h-4 w-4"
										/>
										{provider.displayName}
									</DropdownMenu.Item>
									{/if}
								{/each}
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</div>
					{/if}
				</div>
			</form>
			{/if}
		</div>
		<p class="text-muted-foreground px-8 text-center text-sm">
			Don't have an account? <a class="text-primary underline" href="/register">Sign up.</a> <br />
			Forgot password? <a class="text-primary underline" href="/reset-password">Reset password.</a>
		</p>
	</div>
</div>
