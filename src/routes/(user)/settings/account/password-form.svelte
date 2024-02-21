<script lang="ts" context="module">
	import { z } from 'zod';
	export const passwordFormSchema = z.object({
		oldPassword: z.string(),
		password: z.string().min(8),
		passwordConfirm: z.string().min(8)
	});
	export type PasswordFormSchema = typeof passwordFormSchema;
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
	import { toast } from 'svelte-sonner';
	import { Icons } from '$lib/components/site';

	export let data: SuperValidated<Infer<PasswordFormSchema>>;
	let isLoading = false;

	const form = superForm(data, {
		validators: zodClient(passwordFormSchema),
		onSubmit: () => {
			isLoading = true;
			toast.loading('Updating password...');
		},
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('Your password has been updated.');
			} else {
				toast.error('Please fix the errors in the form.');
			}
			isLoading = false;
		},
		onError: (e) => {
			toast.error(e.result.error.message);
			isLoading = false;
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Change your password</Card.Title>
		<Card.Description>You can change your password here.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" action="?/password" class="space-y-2" use:enhance>
			<Form.Field {form} name="oldPassword">
				<Form.Control let:attrs>
					<Form.Label>Current password</Form.Label>
					<Input {...attrs} bind:value={$formData.oldPassword} type="password" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>New password</Form.Label>
					<Input {...attrs} bind:value={$formData.password} type="password" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="passwordConfirm">
				<Form.Control let:attrs>
					<Form.Label>Confirm new password</Form.Label>
					<Input {...attrs} bind:value={$formData.passwordConfirm} type="password" />
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
