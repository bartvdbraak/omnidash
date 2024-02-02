<script lang="ts" context="module">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { z } from 'zod';

	export const appearanceFormSchema = z.object({
		theme: z.enum(['light', 'dark', 'system'], {
			required_error: 'Please select a theme.'
		})
	});

	export type AppearanceFormSchema = typeof appearanceFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Label from '$lib/components/ui/label/label.svelte';
	import { dev } from '$app/environment';
	export let data: SuperValidated<AppearanceFormSchema>;
</script>

<Form.Root
	schema={appearanceFormSchema}
	form={data}
	class="space-y-8"
	method="POST"
	let:config
	debug={dev ? true : false}
>
	<Form.Item>
		<Form.Field {config} name="theme">
			<Form.Label>Theme</Form.Label>
			<Form.Description>Select the theme for the dashboard.</Form.Description>
			<Form.Validation />
			<Form.RadioGroup class="grid max-w-xl grid-cols-3 gap-8 pt-2" orientation="horizontal">
				<Label for="light" class="[&:has([data-state=checked])>div]:border-primary">
					<Form.RadioItem id="light" value="light" class="sr-only" />
					<div class="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
						<div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
							<div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
								<div class="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
								<div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
							</div>
							<div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
								<div class="h-4 w-4 rounded-full bg-[#ecedef]" />
								<div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
							</div>
							<div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
								<div class="h-4 w-4 rounded-full bg-[#ecedef]" />
								<div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
							</div>
						</div>
					</div>
					<span class="block w-full p-2 text-center font-normal"> Light </span>
				</Label>
				<Label for="dark" class="[&:has([data-state=checked])>div]:border-primary">
					<Form.RadioItem id="dark" value="dark" class="sr-only" />
					<div
						class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
					>
						<div class="space-y-2 rounded-sm bg-slate-950 p-2">
							<div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
								<div class="h-2 w-[80px] rounded-lg bg-slate-400" />
								<div class="h-2 w-[100px] rounded-lg bg-slate-400" />
							</div>
							<div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
								<div class="h-4 w-4 rounded-full bg-slate-400" />
								<div class="h-2 w-[100px] rounded-lg bg-slate-400" />
							</div>
							<div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
								<div class="h-4 w-4 rounded-full bg-slate-400" />
								<div class="h-2 w-[100px] rounded-lg bg-slate-400" />
							</div>
						</div>
					</div>
					<span class="block w-full p-2 text-center font-normal"> Dark </span>
				</Label>
				<Label for="system" class="[&:has([data-state=checked])>div]:border-primary">
					<Form.RadioItem id="system" value="system" class="sr-only" />
					<div
						class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
					>
						<div class="space-y-2 rounded-sm bg-slate-500 p-2">
							<div class="space-y-2 rounded-md bg-slate-400 p-2 shadow-sm">
								<div class="h-2 w-[80px] rounded-lg bg-slate-200" />
								<div class="h-2 w-[100px] rounded-lg bg-slate-200" />
							</div>
							<div class="flex items-center space-x-2 rounded-md bg-slate-400 p-2 shadow-sm">
								<div class="h-4 w-4 rounded-full bg-slate-200" />
								<div class="h-2 w-[100px] rounded-lg bg-slate-200" />
							</div>
							<div class="flex items-center space-x-2 rounded-md bg-slate-400 p-2 shadow-sm">
								<div class="h-4 w-4 rounded-full bg-slate-200" />
								<div class="h-2 w-[100px] rounded-lg bg-slate-200" />
							</div>
						</div>
					</div>
					<span class="block w-full p-2 text-center font-normal"> System </span>
				</Label>
			</Form.RadioGroup>
		</Form.Field>
	</Form.Item>
	<Form.Button>Update preferences</Form.Button>
</Form.Root>
