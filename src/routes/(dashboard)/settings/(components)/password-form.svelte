<script lang="ts" context="module">
	import { z } from 'zod';
	export const passwordFormSchema = z
		.object({
			oldPassword: z.string(),
			password: z.string().min(4),
			passwordConfirm: z.string().min(4)
		})
		.refine(
			(values) => {
				return values.password === values.passwordConfirm;
			},
			{
				message: 'Passwords must match.',
				path: ['passwordConfirm']
			}
		);
	export type PasswordFormSchema = typeof passwordFormSchema;
</script>

<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { FormOptions } from 'formsnap';
	import { toast } from 'svelte-sonner';
	export let passwordFormSchemaData: SuperValidated<PasswordFormSchema>;
	export let debug: boolean;
	const options: FormOptions<PasswordFormSchema> = {
		onSubmit() {
			toast.info('Changing password...');
		},
		onResult({ result }) {
			if (result.status === 200)
				toast.success('Your password has been changed! Please log in again.');
			if (result.status === 400)
				toast.error('There was an error changing your password. Is the old password correct?');
		}
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Password change</Card.Title>
		<Card.Description>You can change your account password here.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Root
			{options}
			form={passwordFormSchemaData}
			schema={passwordFormSchema}
			let:config
			action="?/password"
			method="POST"
			class="space-y-2"
			{debug}
		>
			<Form.Item>
				<Form.Field {config} name="oldPassword">
					<Form.Label>Current Password</Form.Label>
					<Form.Input type="password" />
					<Form.Validation />
				</Form.Field>
				<Form.Field {config} name="password">
					<Form.Label>New Password</Form.Label>
					<Form.Input type="password" />
					<Form.Validation />
				</Form.Field>
				<Form.Field {config} name="passwordConfirm">
					<Form.Label>Confirm new password</Form.Label>
					<Form.Input type="password" />
					<Form.Validation />
				</Form.Field>
			</Form.Item>
			<Form.Button>Update password</Form.Button>
		</Form.Root>
	</Card.Content>
</Card.Root>
