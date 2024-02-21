<script lang="ts" context="module">
	import { z } from 'zod';
	export const emailRequestFormSchema = z.object({
		newEmail: z.string().email()
	});
	export const emailConfirmFormSchema = z.object({
		token: z.string(),
		password: z.string()
	});
	export type EmailRequestFormSchema = typeof emailRequestFormSchema;
	export type EmailConfirmFormSchema = typeof emailConfirmFormSchema;
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
	import { Separator } from '$lib/components/ui/separator';
	import { Icons } from '$lib/components/site';

	export let user: LayoutData['user'];
	export let requestData: SuperValidated<Infer<EmailRequestFormSchema>>;
	export let confirmData: SuperValidated<Infer<EmailConfirmFormSchema>>;
	let isLoading = false;

	const requestForm = superForm(requestData, {
		validators: zodClient(emailRequestFormSchema),
		onSubmit: () => {
			isLoading = true;
			toast.success('Sending verification token...');
		},
		onUpdated: ({ form: f }) => {
			isLoading = false;
			if (f.valid) {
				toast.success('Verification token has been sent.');
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const confirmForm = superForm(confirmData, {
		validators: zodClient(emailConfirmFormSchema),
		onSubmit: () => {
			isLoading = true;
			toast.loading('Updating email...');
		},
		onUpdated: ({ form: f }) => {
			isLoading = false;
			if (f.valid) {
				toast.success('Your email has been updated.');
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: requestFormData, enhance: requestEnhance } = requestForm;
	const { form: confirmFormData, enhance: confirmEnhance } = confirmForm;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Request an email change</Card.Title>
		<Card.Description
			>Receive a verification token on this email, which you can enter in the next section.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<form method="POST" action="?/emailRequest" class="space-y-8" use:requestEnhance>
			<Form.Field form={requestForm} name="newEmail">
				<Form.Control let:attrs>
					<Form.Label>New email</Form.Label>
					<div class="flex space-x-2">
						<Input placeholder={user?.email} {...attrs} bind:value={$requestFormData.newEmail} />
						<Form.Button variant="secondary" disabled={isLoading}>Request token</Form.Button>
					</div>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</form>
		{#if dev && PUBLIC_DEBUG_FORMS == 'true' && browser}
			<div class="pt-4">
				<SuperDebug data={$requestFormData} />
			</div>
		{/if}
	</Card.Content>

	<Separator />

	<Card.Header>
		<Card.Title>Confirm email change</Card.Title>
		<Card.Description
			>Enter your verification token below to confirm the email change.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<form method="POST" action="?/emailConfirm" class="space-y-2" use:confirmEnhance>
			<Form.Field form={confirmForm} name="token">
				<Form.Control let:attrs>
					<Form.Label>Token</Form.Label>
					<Input {...attrs} bind:value={$confirmFormData.token} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field form={confirmForm} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} bind:value={$confirmFormData.password} type="password" />
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
				<SuperDebug data={$confirmFormData} />
			</div>
		{/if}
	</Card.Content>
</Card.Root>
