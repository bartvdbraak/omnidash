<script lang="ts" context="module">
	import { z } from 'zod';

	export const accountFormSchema = z.object({
		name: z
			.string({
				required_error: 'Required.'
			})
			.min(2, 'Name must be at least 2 characters.')
			.max(30, 'Name must not be longer than 30 characters')
	});

	export type AccountFormSchema = typeof accountFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { dev } from '$app/environment';
	import type { LayoutData } from '../$types';

	export let data: SuperValidated<AccountFormSchema>;
	export let user: LayoutData['user'];
</script>

<Form.Root
	method="POST"
	class="space-y-8"
	let:config
	schema={accountFormSchema}
	form={data}
	debug={dev ? true : false}
>
	<Form.Item>
		<Form.Field name="name" {config}>
			<Form.Label>Name</Form.Label>
			<Form.Input placeholder={user?.name} />
			<Form.Description>
				This is the name that will be displayed on your profile and in emails.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Button>Update account</Form.Button>
</Form.Root>
