<script lang="ts" context="module">
	import { z } from 'zod';
	export const loginFormSchema = z.object({
		usernameEmail: z.string(),
		password: z.string()
	});
	export type LoginFormSchema = typeof loginFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser, dev } from '$app/environment';
	// import { PUBLIC_DEBUG_FORMS } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import { Icons } from '$lib/components/site';
	import { cn } from '$lib/utils';
	import { debugForms } from '$lib/config/site';

	export let data: SuperValidated<Infer<LoginFormSchema>>;
	let isLoading = false;

	const form = superForm(data, {
		validators: zodClient(loginFormSchema),
		onSubmit: () => {
			isLoading = true;
			toast.loading('Logging in...');
		},
		onUpdated: ({ form: f }) => {
			isLoading = false;
			if (f.valid) {
				toast.success('Succesfully logged in.');
			} else {
				toast.error('Please fix the errors.');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<div class="flex flex-col space-y-2 text-center">
	<h1 class="text-2xl font-semibold tracking-tight">Log into your account</h1>
	<p class="pb-6 text-sm text-muted-foreground">
		Enter your credentials below to log into your account
	</p>
</div>
<div class={cn('grid gap-6')} {...$$restProps}>
	<form method="POST" action="?/login" class="grid gap-2" use:enhance>
		<Form.Field {form} name="usernameEmail" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label>Username or email</Form.Label>
				<Input {...attrs} bind:value={$formData.usernameEmail} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password" class="grid gap-2">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input {...attrs} bind:value={$formData.password} type="password" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button disabled={isLoading}>
			{#if isLoading}
				<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
			{/if}
			Log in
		</Form.Button>
	</form>
</div>

{#if dev && debugForms && browser}
	<div class="pt-4">
		<SuperDebug data={$formData} />
	</div>
{/if}
