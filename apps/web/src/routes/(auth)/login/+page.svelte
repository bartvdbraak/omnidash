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
	import type { PageData } from './$types';
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
				action="?/login"
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
			<form
				method="POST"
				action="?/oauth2"
				use:enhance={() => {
					isLoading = true;
				}}
			>
				{#if providers.length}
					<div class="relative">
						<div class="absolute inset-0 flex items-center">
							<span class="w-full border-t" />
						</div>
						<div class="relative flex justify-center text-xs uppercase">
							<span class="bg-background text-muted-foreground px-2 py-6"> Or continue with </span>
						</div>
					</div>
					<div
						class="focus-visible:ring-ring border-input hover:bg-accent hover:text-accent-foreground flex items-center justify-between whitespace-nowrap rounded-md border bg-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
					>
						<input type="hidden" name="provider" bind:value={currentProvider.name} />
						<div class="flex w-full items-center justify-center space-x-2">
							<Button
								type="submit"
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
								<Separator orientation="vertical" class="bg-secondary h-[20px]" />
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
				{/if}
			</form>
		</div>
		<p class="text-muted-foreground px-8 text-center text-sm">
			Don't have an account? <a class="text-primary underline" href="/register">Sign up.</a> <br />
			Forgot password? <a class="text-primary underline" href="/reset-password">Reset password.</a>
		</p>
	</div>
</div>
