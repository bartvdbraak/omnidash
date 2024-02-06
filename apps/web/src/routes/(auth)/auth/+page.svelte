<script lang="ts">
	import { enhance } from '$app/forms';
	import { Icons } from '$lib/components/site/icons';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Alert from '$lib/components/ui/alert';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils';
	import { ChevronDown } from 'radix-icons-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { PageData } from './$types';
	import PocketBase from 'pocketbase';
	import { PUBLIC_CLIENT_PB } from '$env/static/public';

	let isLoading = false;
	export let form;
	export let data: PageData;
	const { providers } = data;
	const providersWithIcons = providers.map((provider) => ({
		...provider,
		/* eslint-disable  @typescript-eslint/no-explicit-any */
		icon: (Icons as { [key: string]: any })[provider.name] || undefined
	}));
	let currentProvider = providersWithIcons[0];

	const pb = new PocketBase(PUBLIC_CLIENT_PB);
	let oauth2Form: HTMLFormElement;
	async function loginWithOauth2(provider: string) {
		try {
			await pb.collection('users').authWithOAuth2({ provider });
			const input = document.createElement('input');
			input.type = 'hidden';
			input.name = 'token';
			input.value = pb.authStore.token;
			oauth2Form.appendChild(input);
			oauth2Form.submit();
		} catch (err) {
			console.error(err);
		}
	}
</script>

<div class="lg:p-8">
	<Tabs.Root
		value={form?.showLogin ? 'login' : undefined}
		class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
	>
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="login">Login</Tabs.Trigger>
			<Tabs.Trigger value="register">Register</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="login">
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
							<Label for="email">Email or username</Label>
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
						<Button type="submit" disabled={isLoading}>
							{#if isLoading}
								<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Sign In
						</Button>
					</div>
					{#if form?.notVerified}
						<Alert.Root class="mt-4">
							<Alert.Title></Alert.Title>
							<Alert.Description>You must verify your email before you can login.</Alert.Description
							>
						</Alert.Root>
					{/if}
				</form>
			</div>
		</Tabs.Content>
		<Tabs.Content value="register">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create your account</h1>
				<p class="pb-6 text-sm text-muted-foreground">
					Enter your details below to create a new account
				</p>
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
							<Label for="password">Confirm password</Label>
							<Input id="password" name="passwordConfirm" type="password" disabled={isLoading} />
						</div>
						<Button type="submit" disabled={isLoading}>
							{#if isLoading}
								<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Register
						</Button>
					</div>
					{#if form?.notVerified}
						<Alert.Root class="mt-4">
							<Alert.Title></Alert.Title>
							<Alert.Description>You must verify your email before you can login.</Alert.Description
							>
						</Alert.Root>
					{/if}
				</form>
			</div>
		</Tabs.Content>
		{#if providers.length}
			<form
				method="POST"
				action="?/oauth2"
				bind:this={oauth2Form}
				use:enhance={() => {
					isLoading = true;
					return async ({ update }) => {
						isLoading = false;
						update();
					};
				}}
			>
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t" />
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 py-4 text-muted-foreground"> Or continue with </span>
					</div>
				</div>
				<div
					class="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
				>
					<input type="hidden" name="provider" bind:value={currentProvider.name} />
					<div class="flex w-full items-center justify-center space-x-2">
						<Button
							on:click={() => loginWithOauth2(currentProvider.name)}
							name={currentProvider.name}
							variant="ghost"
							class="w-full"
							disabled={isLoading}
						>
							{#if isLoading}
								<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
							{:else if currentProvider.icon === undefined}
								<img
									src={`${PUBLIC_CLIENT_PB}/_/images/oauth2/${currentProvider.name}.svg`}
									alt={currentProvider.name}
									class="mr-2 h-4 w-4"
								/>
							{:else}
								<svelte:component this={currentProvider.icon} class="mr-2 h-4 w-4" />
							{/if}
							{currentProvider.displayName}
						</Button>
					</div>
					{#if providers.length > 1}
						<div class="flex items-center space-x-2">
							<Separator orientation="vertical" class="h-[20px] bg-secondary" />
							<div class="flex items-center space-x-2">
								<DropdownMenu.Root>
									<DropdownMenu.Trigger asChild let:builder>
										<Button builders={[builder]} variant="ghost" class="px-2 shadow-none">
											<ChevronDown class="h-4 w-4" />
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content class="" align="center">
										<DropdownMenu.Label class="sr-only">Login Providers</DropdownMenu.Label>
										{#each providersWithIcons as provider}
											{#if provider.name !== currentProvider.name}
												<DropdownMenu.Item
													class="flex justify-center"
													on:click={() => (currentProvider = provider)}
												>
													{#if provider.icon === undefined}
														<img
															src={`${PUBLIC_CLIENT_PB}/_/images/oauth2/${provider.name}.svg`}
															alt={provider.name}
															class="mr-2 h-4 w-4"
														/>
													{:else}
														<svelte:component this={provider.icon} class="mr-2 h-4 w-4" />
													{/if}
													{provider.displayName}
												</DropdownMenu.Item>
											{/if}
										{/each}
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</div>
						</div>
					{/if}
				</div>
			</form>
		{/if}
	</Tabs.Root>

	<p class="px-8 py-2 text-center text-xs text-muted-foreground">
		Don't have an account? <a class="text-primary underline" href="/register">Sign up.</a> <br />
		Forgot password? <a class="text-primary underline" href="/reset-password">Reset password.</a>
	</p>
</div>
