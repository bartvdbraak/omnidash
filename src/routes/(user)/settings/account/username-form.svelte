<script lang="ts" context="module">
	import { z } from 'zod';
	export const usernameFormSchema = z.object({
		username: z.string().min(2).max(16)
	});
	export type UsernameFormSchema = typeof usernameFormSchema;
</script>

<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser, dev } from '$app/environment';
	import { PUBLIC_DEBUG_FORMS } from '$env/static/public';
	import type { LayoutData } from '../$types';
	import { toast } from 'svelte-sonner';
	import { Icons } from '$lib/components/site';

	export let user: LayoutData['user'];
	export let data: SuperValidated<Infer<UsernameFormSchema>>;
	let isLoading = false;

	const form = superForm(data, {
		validators: zodClient(usernameFormSchema),
		onSubmit: () => {
			isLoading = true;
			toast.loading('Updating username...');
		},
		onUpdated: ({ form: f }) => {
			isLoading = false;
			if (f.valid) {
				toast.success('Your username has been updated.');
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Change your username</Card.Title>
		<Card.Description>
			You can modify the username used for logging in and as your handle.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" action="?/username" class="space-y-8" use:enhance>
			<Form.Field {form} name="username">
				<Form.Control let:attrs>
					<Form.Label>Username</Form.Label>
					<Input placeholder={user?.username} {...attrs} bind:value={$formData.username} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button disabled={isLoading}>
				{#if isLoading}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Update password
			</Form.Button>
		</form>

		{#if dev && PUBLIC_DEBUG_FORMS == 'true' && browser}
			<div class="pt-4">
				<SuperDebug data={$formData} />
			</div>
		{/if}
	</Card.Content>
</Card.Root>
