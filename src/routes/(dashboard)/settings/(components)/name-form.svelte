<script lang="ts" context="module">
	import { z } from 'zod';
	const emptyStringToUndefined = z.literal('').transform(() => undefined);
	export const nameFormSchema = z.object({
		name: z
			.string()
			.min(2, 'Name must be at least 2 characters.')
			.max(30, 'Name must not be longer than 30 characters')
			.optional()
			.or(emptyStringToUndefined),
		username: z
			.string()
			.min(2, 'Username must be at least 2 characters.')
			.max(30, 'Username must not be longer than 30 characters')
			.optional()
			.or(emptyStringToUndefined)
	});
	export type NameFormSchema = typeof nameFormSchema;
</script>

<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { LayoutData } from '../$types';
	import type { FormOptions } from 'formsnap';
	import { toast } from 'svelte-sonner';
	export let nameFormSchemaData: SuperValidated<NameFormSchema>;
	export let user: LayoutData['user'];
	export let debug: boolean;
	const options: FormOptions<NameFormSchema> = {
		onSubmit() {
			toast.info('Updating name...');
		},
		onResult({ result }) {
			if (result.status === 200) toast.success('Your name has been updated!');
			if (result.status === 400) toast.error('There was an error updating your name.');
		},
		dataType: 'form'
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Change your name</Card.Title>
		<Card.Description>
			You can change the name that will be displayed on your profile and in emails as well as your
			username.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Root
			{options}
			form={nameFormSchemaData}
			schema={nameFormSchema}
			let:config
			action="?/name"
			method="POST"
			class="space-y-2"
			{debug}
		>
			<Form.Item>
				<Form.Field name="name" {config}>
					<Form.Label>Display name</Form.Label>
					<Form.Input placeholder={user?.name} />
					<Form.Validation />
				</Form.Field>
			</Form.Item>
			<Form.Item>
				<Form.Field {config} name="username">
					<Form.Label>Username</Form.Label>
					<Form.Input placeholder={user?.username} />
					<Form.Validation />
				</Form.Field>
			</Form.Item>
			<Form.Button>Update name</Form.Button>
		</Form.Root>
	</Card.Content>
</Card.Root>
