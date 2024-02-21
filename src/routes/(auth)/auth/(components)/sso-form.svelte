<script lang="ts">
	import { Icons } from '$lib/components/site';
	import PocketBase from 'pocketbase';
	import { PUBLIC_CLIENT_PB } from '$env/static/public';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { ChevronDown } from 'radix-icons-svelte';

	export let isLoading = false;

	/* eslint-disable  @typescript-eslint/no-explicit-any */
	export let providers: { name: string; icon?: any; displayName: string }[];
	let currentProvider = providers[0];

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
							{#each providers as provider}
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
