<script lang="ts" context="module">
	import { z } from 'zod';
	export const profileFormSchema = z.object({
		name: z.string()
	});
	export type ProfileFormSchema = typeof profileFormSchema;
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

	export let user: LayoutData['user'];
	export let data: SuperValidated<Infer<ProfileFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(profileFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Change your name</Card.Title>
		<Card.Description>
			You can modify the displayed profile name, which also determines your ticket ownership.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" class="space-y-8" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input placeholder={user?.name} {...attrs} bind:value={$formData.name} />
				</Form.Control>
				<Form.Description>This is your public display name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button>Update name</Form.Button>
		</form>

		{#if dev && PUBLIC_DEBUG_FORMS == 'true' && browser}
			<div class="pt-4">
				<SuperDebug data={$formData} />
			</div>
		{/if}
	</Card.Content>
</Card.Root>
