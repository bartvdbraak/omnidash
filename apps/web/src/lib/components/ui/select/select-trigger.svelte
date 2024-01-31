<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { CaretSort } from 'radix-icons-svelte';
	import { cn } from '$lib/utils';

	type $$Props = SelectPrimitive.TriggerProps;
	type $$Events = SelectPrimitive.TriggerEvents;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Trigger
	class={cn(
		'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring line-clamp-1 flex h-9 w-full items-center justify-between truncate rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
		className
	)}
	{...$$restProps}
>
	<slot />
	<CaretSort class="h-4 w-4 opacity-50" />
</SelectPrimitive.Trigger>
