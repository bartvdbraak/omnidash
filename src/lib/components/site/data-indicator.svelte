<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: object;
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" size="icon" class="block">
			{'{}'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto">
		<SuperDebug label="$layout data" status={false} {data} />
	</Popover.Content>
</Popover.Root>
