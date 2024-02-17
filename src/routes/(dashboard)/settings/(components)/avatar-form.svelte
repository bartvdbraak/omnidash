<script lang="ts" context="module">
	// const MAX_IMAGE_SIZE = 5;
	// const ACCEPTED_IMAGE_TYPES = [
	// 	'image/jpeg',
	// 	'image/png',
	// 	'image/svg+xml',
	// 	'image/gif',
	// 	'image/webp'
	// ];
	import { z } from 'zod';
	// const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
	// 	const result = sizeInBytes / (1024 * 1024);
	// 	return +result.toFixed(decimalsNum);
	// };
	export const avatarFormSchema = z.object({
		avatar: z.any()
		// .custom<FileList>()
		// .refine((files) => {
		// 	return Array.from(files ?? []).length !== 0;
		// }, 'Image is required')
		// .refine((files) => {
		// 	return Array.from(files ?? []).every((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE);
		// }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
		// .refine((files) => {
		// 	return Array.from(files ?? []).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
		// }, 'File type is not supported')
	});
	export type AvatarFormSchema = typeof avatarFormSchema;
</script>

<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { LayoutData } from '../../$types';
	import * as Avatar from '$lib/components/ui/avatar';
	import { toast } from 'svelte-sonner';
	import type { FormOptions } from 'formsnap';
	export let avatarFormSchemaData: SuperValidated<AvatarFormSchema>;
	export let user: LayoutData['user'];
	export let debug: boolean;
	const options: FormOptions<AvatarFormSchema> = {
		onSubmit() {
			toast.info('Uploading avatar...');
		},
		onResult({ result }) {
			if (result.status === 200) toast.success('Your avatar has been updated!');
			if (result.status === 400) toast.error('There was an error updating your avatar.');
		},
		dataType: 'form'
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Avatar image</Card.Title>
		<Card.Description>
			This is the image that will be displayed on your profile, in dashboards and in emails.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Root
			{options}
			form={avatarFormSchemaData}
			schema={avatarFormSchema}
			let:config
			action="?/avatar"
			method="POST"
			class="space-y-2"
			{debug}
			><Form.Item>
				<Form.Field {config} name="avatar">
					<Form.Label class="sr-only">Avatar</Form.Label>
					<Avatar.Root class="aspect-square h-auto w-full">
						<Avatar.Image src={user?.avatarUrl} alt={user?.name} />
						<Avatar.Fallback class="text-8xl">{user?.initials}</Avatar.Fallback>
					</Avatar.Root>
					<Form.Input type="file" />
					<Form.Validation />
				</Form.Field>
			</Form.Item>
			<Form.Button>Update avatar</Form.Button>
		</Form.Root>
	</Card.Content>
</Card.Root>
