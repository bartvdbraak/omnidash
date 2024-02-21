<script lang="ts" context="module">
	import { z } from 'zod';

	export const appearanceFormSchema = z.object({
		appearanceMode: z.enum(['system', 'light', 'dark'], {
			required_error: 'Please select a theme.'
		})
	});

	export type AppearanceFormSchema = typeof appearanceFormSchema;
</script>

<script lang="ts">
	import { browser, dev } from '$app/environment';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import Label from '$lib/components/ui/label/label.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { Icons } from '$lib/components/site';
	import { setMode } from 'mode-watcher';
	import { debugForms } from '$lib/config/site';

	export let data: SuperValidated<Infer<AppearanceFormSchema>>;
	let isLoading = false;

	const form = superForm(data, {
		validators: zodClient(appearanceFormSchema),
		onSubmit: () => {
			isLoading = true;
			toast.loading('Updating appearance...');
		},
		onUpdated: ({ form: f }) => {
			isLoading = false;
			setMode(f.data.appearanceMode);
			if (f.valid) {
				toast.success('Appearance has been updated.');
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});
	const { form: formData, enhance } = form;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Change your mode</Card.Title>
		<Card.Description>You can modify the mode for your theme preference.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance class="space-y-2">
			<Form.Fieldset {form} name="appearanceMode">
				<Form.Legend>Theme</Form.Legend>
				<Form.FieldErrors />
				<RadioGroup.Root
					class="grid grid-cols-3 gap-8 pt-2"
					orientation="horizontal"
					bind:value={$formData.appearanceMode}
				>
					<Form.Control let:attrs>
						<Label class="[&:has([data-state=checked])>div]:border-primary">
							<RadioGroup.Item {...attrs} value="system" class="sr-only" />
							<div
								class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
							>
								<div class="space-y-2 rounded-sm bg-slate-500 p-2">
									<div class="space-y-2 rounded-md bg-slate-400 p-2 shadow-sm">
										<div class="h-2 w-4 rounded-lg bg-slate-200" />
										<div class="h-2 w-full rounded-lg bg-slate-200" />
									</div>
									<div class="flex items-center space-x-2 rounded-md bg-slate-400 p-2 shadow-sm">
										<div class="h-4 w-4 rounded-full bg-slate-200" />
										<div class="h-2 w-full rounded-lg bg-slate-200" />
									</div>
									<div class="flex items-center space-x-2 rounded-md bg-slate-400 p-2 shadow-sm">
										<div class="h-4 w-4 rounded-full bg-slate-200" />
										<div class="h-2 w-full rounded-lg bg-slate-200" />
									</div>
								</div>
							</div>
							<span class="block w-full p-2 text-center font-normal"> System </span>
						</Label>
					</Form.Control>
					<Form.Control let:attrs>
						<Label class="[&:has([data-state=checked])>div]:border-primary">
							<RadioGroup.Item {...attrs} value="light" class="sr-only" />
							<div class="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
								<div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
									<div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
										<div class="h-2 w-4 rounded-lg bg-[#ecedef]" />
										<div class="h-2 w-full rounded-lg bg-[#ecedef]" />
									</div>
									<div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
										<div class="h-4 w-4 rounded-full bg-[#ecedef]" />
										<div class="h-2 w-full rounded-lg bg-[#ecedef]" />
									</div>
									<div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
										<div class="h-4 w-4 rounded-full bg-[#ecedef]" />
										<div class="h-2 w-full rounded-lg bg-[#ecedef]" />
									</div>
								</div>
							</div>
							<span class="block w-full p-2 text-center font-normal"> Light </span>
						</Label>
					</Form.Control>
					<Form.Control let:attrs>
						<Label class="[&:has([data-state=checked])>div]:border-primary">
							<RadioGroup.Item {...attrs} value="dark" class="sr-only" />
							<div
								class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
							>
								<div class="space-y-2 rounded-sm bg-slate-950 p-2">
									<div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
										<div class="h-2 w-4 rounded-lg bg-slate-400" />
										<div class="h-2 w-full rounded-lg bg-slate-400" />
									</div>
									<div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
										<div class="h-4 w-4 rounded-full bg-slate-400" />
										<div class="h-2 w-full rounded-lg bg-slate-400" />
									</div>
									<div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
										<div class="h-4 w-4 rounded-full bg-slate-400" />
										<div class="h-2 w-full rounded-lg bg-slate-400" />
									</div>
								</div>
							</div>
							<span class="block w-full p-2 text-center font-normal"> Dark </span>
						</Label>
					</Form.Control>
					<RadioGroup.Input name="appearanceMode" />
				</RadioGroup.Root>
			</Form.Fieldset>
			<Form.Button disabled={isLoading}>
				{#if isLoading}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Update appearance
			</Form.Button>
		</form>

		{#if dev && debugForms && browser}
			<SuperDebug data={$formData} />
		{/if}
	</Card.Content>
</Card.Root>
