<script lang="ts" context="module">
	import { z } from 'zod';
	export const profileFormSchema = z.object({
		name: z
			.string({
				required_error: 'Required.'
			})
			.min(2, 'Name must be at least 2 characters.')
			.max(30, 'Name must not be longer than 30 characters'),
		username: z
			.string()
			.min(2, 'Username must be at least 2 characters.')
			.max(30, 'Username must not be longer than 30 characters'),
		email: z.string({ required_error: 'Please enter a valid email' }).email(),
		avatar: z.any().refine((val) => val.length > 0, 'File is required')
	});
	export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { dev } from '$app/environment';
	import type { LayoutData } from '../$types';
	import * as Avatar from '$lib/components/ui/avatar';

	export let data: SuperValidated<ProfileFormSchema>;
	export let user: LayoutData['user'];
</script>

<Form.Root
	form={data}
	schema={profileFormSchema}
	let:config
	method="POST"
	class="space-y-8"
	debug={dev ? true : false}
>
	<div class="grid grid-cols-[1fr,16rem] gap-4">
		<div>
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
			<Form.Item>
				<Form.Field {config} name="username">
					<Form.Label>Username</Form.Label>
					<Form.Input placeholder={user?.username} />
					<Form.Description>
						This is your public display name. It can be your real name or a pseudonym.
					</Form.Description>
					<Form.Validation />
				</Form.Field>
			</Form.Item>
			<Form.Item>
				<Form.Field {config} name="email">
					<Form.Label>Email</Form.Label>
					<Form.Input placeholder={user?.email} />
					<Form.Description>
						<Form.Description>
							This is the email address associated with your account.
						</Form.Description>
					</Form.Description>
					<Form.Validation />
				</Form.Field>
			</Form.Item>
		</div>
		<Form.Item>
			<Form.Field {config} name="avatar">
				<Form.Label>Profile Picture</Form.Label>
				<Avatar.Root class="aspect-square h-auto w-full">
					<Avatar.Image src={user?.avatarUrl} alt={user?.name} />
					<Avatar.Fallback class="text-8xl">{user?.initials}</Avatar.Fallback>
				</Avatar.Root>
				<Form.Input type="file" placeholder={user?.email} />
				<Form.Description>
					<Form.Description>Your avatar image displayed.</Form.Description>
				</Form.Description>
				<Form.Validation />
			</Form.Field>
		</Form.Item>
	</div>
	<Form.Button>Update profile</Form.Button>
</Form.Root>
