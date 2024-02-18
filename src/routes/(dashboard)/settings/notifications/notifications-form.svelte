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
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Label } from '$lib/components/ui/label';
	export let data: SuperValidated<NotificationFormSchema>;
	import { dev } from '$app/environment';
	import { Bell, EyeNone, Person } from 'radix-icons-svelte';
</script>

<Card.Root>
	<Card.Header class="pb-3">
		<Card.Title>Notifications</Card.Title>
		<Card.Description>Choose what you want to be notified about.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-1">
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
					<Form.RadioGroup class="grid max-w-xl grid-cols-3 gap-8 pt-2" orientation="horizontal">
						<!-- value={user?.appearanceMode} -->
						<Label
							for="all"
							class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
						>
							<Form.RadioItem id="all" value="all" class="sr-only" />
							<Bell class="mb-3 h-6 w-6" />
							<span class="block w-full p-2 text-center font-normal">Everything</span>
							<span class="text-center text-sm text-muted-foreground">New tickets and updates.</span
							>
						</Label>
						<Label
							for="tickets"
							class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
						>
							<Form.RadioItem id="tickets" value="tickets" class="sr-only" />
							<Person class="mb-3 h-6 w-6" />
							<span class="block w-full p-2 text-center font-normal">New tickets</span>
							<span class="text-center text-sm text-muted-foreground"
								>Only new unassigned tickets</span
							>
						</Label>
						<Label
							for="none"
							class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
						>
							<Form.RadioItem id="none" value="none" class="sr-only" />
							<EyeNone class="mb-3 h-6 w-6" />
							<span class="block w-full p-2 text-center font-normal">Ignore</span>
							<span class="text-center text-sm text-muted-foreground"
								>Turn off all notifications.</span
							>
						</Label>
					</Form.RadioGroup>
					<Form.Validation />
				</Form.Field>
			</Form.Item>
		</Form.Root>
	</Card.Content>
</Card.Root>

<!-- <Form.Root
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
</Form.Root> -->
