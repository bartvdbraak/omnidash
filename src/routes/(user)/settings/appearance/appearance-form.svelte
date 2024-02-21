<script lang="ts" context="module">
	import { z } from 'zod';

	export const appearanceFormSchema = z.object({
		theme: z.enum(['system', 'light', 'dark'], {
			required_error: 'Please select a theme.'
		})
	});

	export type AppearanceFormSchema = typeof appearanceFormSchema;
</script>

<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { PUBLIC_DEBUG_FORMS } from '$env/static/public';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import Label from '$lib/components/ui/label/label.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	export let data: SuperValidated<Infer<AppearanceFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(appearanceFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-8">
	<Form.Fieldset {form} name="theme">
		<Form.Legend>Theme</Form.Legend>
		<Form.Description>Select the theme for the dashboard.</Form.Description>
		<Form.FieldErrors />
		<RadioGroup.Root
			class="grid grid-cols-3 gap-8 pt-2"
			orientation="horizontal"
			bind:value={$formData.theme}
		>
			<Form.Control let:attrs>
				<Label class="[&:has([data-state=checked])>div]:border-primary">
					<RadioGroup.Item {...attrs} value="system" class="sr-only" />
					<!-- <div class="container">
						<div class="div1">
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
						</div>
						<div class="div2"> -->
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
						<!-- </div>
					</div> -->
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
			<RadioGroup.Input name="theme" />
		</RadioGroup.Root>
	</Form.Fieldset>
	<Form.Button>Update preferences</Form.Button>
</form>

{#if dev && PUBLIC_DEBUG_FORMS == 'true' && browser}
	<SuperDebug data={$formData} />
{/if}

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.div1,
	.div2 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.div2 {
		clip-path: polygon(0 0, 100% 0, 0 100%);
	}
</style>
