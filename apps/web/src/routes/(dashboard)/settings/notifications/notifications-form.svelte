<script lang="ts" context="module">
	import { z } from 'zod';
	export const notificationsFormSchema = z.object({
		type: z.enum(['all', 'tickets', 'none'], {
			required_error: 'You need to select a notification type.'
		})
	});
	type NotificationFormSchema = typeof notificationsFormSchema;
</script>

<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import { Label } from '$lib/components/ui/label';
	export let data: SuperValidated<NotificationFormSchema>;
	import { dev } from '$app/environment';
</script>

<Form.Root
	form={data}
	schema={notificationsFormSchema}
	let:config
	method="POST"
	class="space-y-8"
	debug={dev ? true : false}
>
	<Form.Item>
		<Form.Field {config} name="type">
			<Form.Label>Notify me about...</Form.Label>
			<Form.RadioGroup class="flex flex-col space-y-1">
				<div class="flex items-center space-x-3">
					<Form.RadioItem value="all" id="all" />
					<Label for="all" class="font-normal">New tickets and SLA breaches</Label>
				</div>
				<div class="flex items-center space-x-3">
					<Form.RadioItem value="tickets" id="mentions" />
					<Label for="mentions" class="font-normal">New tickets</Label>
				</div>
				<div class="flex items-center space-x-3">
					<Form.RadioItem value="none" id="none" />
					<Label for="none" class="font-normal">Nothing</Label>
				</div>
			</Form.RadioGroup>
		</Form.Field>
	</Form.Item>
	<Form.Button>Update notifications</Form.Button>
</Form.Root>
