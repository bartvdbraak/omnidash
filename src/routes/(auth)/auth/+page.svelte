<script lang="ts">
	import { browser } from '$app/environment';
	import { Icons } from '$lib/components/site/index.js';
	import * as Tabs from '$lib/components/ui/tabs';
	import type { PageData } from './$types.js';
	import { LoginForm, RegisterForm, Oauth2Form } from './(components)';

	export let data: PageData;

	const { providers } = data;
	const providersWithIcons = providers.map((provider) => ({
		...provider,
		/* eslint-disable  @typescript-eslint/no-explicit-any */
		icon: (Icons as { [key: string]: any })[provider.name] || undefined
	}));

	let tab: string = 'login';
	if (browser) {
		const urlSearchParams = new URLSearchParams(window.location.search);
		tab = urlSearchParams.get('tab') || 'login';
	}
</script>

<div class="lg:p-8">
	<Tabs.Root value={tab} class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="login">Login</Tabs.Trigger>
			<Tabs.Trigger value="register">Register</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="login">
			<LoginForm data={data.loginForm} />
		</Tabs.Content>
		<Tabs.Content value="register">
			<RegisterForm data={data.registerForm} />
		</Tabs.Content>
		<p class="px-8 text-center text-xs text-muted-foreground">
			Forgot password? <a class="text-primary underline" href="/reset-password">Reset password.</a>
		</p>
		{#if providers.length}
			<Oauth2Form providers={providersWithIcons} />
		{/if}
	</Tabs.Root>
</div>
