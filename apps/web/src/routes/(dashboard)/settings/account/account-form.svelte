<script lang="ts" context="module">
	import { z } from 'zod';

	export const accountFormSchema = z.object({
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
	<Form.Button>Update account</Form.Button>
</Form.Root>
