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
	import { toast } from 'svelte-sonner';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { LayoutData } from '../$types';
	import type { FormOptions } from 'formsnap';
	export let emailRequestFormSchemaData: SuperValidated<EmailRequestFormSchema>;
	export let emailConfirmFormSchemaData: SuperValidated<EmailConfirmFormSchema>;
	const requestOptions: FormOptions<EmailRequestFormSchema> = {
		onSubmit() {
			toast.info('Requesting token...');
		},
		onResult({ result }) {
			if (result.status === 200) toast.success('Token sent! Check your email.');
			if (result.status === 400)
				toast.error('There was an error sending the token. Is this email already in use?');
		}
	};
	const confirmOptions: FormOptions<EmailConfirmFormSchema> = {
		onSubmit() {
			toast.info('Changing email...');
		},
		onResult({ result }) {
			console.log(result);
			if (result.status === 200) toast.success('Your email has been changed!');
			if (result.status === 400)
				toast.error('There was an error changing your email. Is the token correct?');
		}
	};
	export let user: LayoutData['user'];
	export let debug: boolean;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Modify your email</Card.Title>
		<Card.Description
			>Use a different email by requesting a token and entering it for verification below.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<Form.Root
			schema={emailRequestFormSchema}
			form={emailRequestFormSchemaData}
			options={requestOptions}
			let:config
			method="POST"
			action="?/emailRequest"
			class="space-y-8"
			{debug}
		>
			<Form.Item>
				<Form.Field {config} name="newEmail">
					<Form.Label>New email</Form.Label>
					<div class="flex space-x-2">
						<Form.Input placeholder={user?.email} />
						<Form.Button variant="secondary">Request token</Form.Button>
					</div>
					<Form.Validation />
				</Form.Field>
			</Form.Item>
		</Form.Root>
		<Form.Root
			options={confirmOptions}
			form={emailConfirmFormSchemaData}
			schema={emailConfirmFormSchema}
			let:config
			action="?/emailConfirm"
			method="POST"
			class="space-y-2"
			{debug}
		>
			<Form.Item>
				<Form.Field {config} name="token">
					<Form.Label>Email verification token</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Field>
			</Form.Item>
			<Form.Item>
				<Form.Field {config} name="password">
					<Form.Label>Password</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Field>
			</Form.Item>
			<Form.Button>Confirm email change</Form.Button>
		</Form.Root>
	</Card.Content>
</Card.Root>
