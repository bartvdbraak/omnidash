<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { LayoutData } from '../../../../routes/$types';

	export let authenticated = false;
	export let user = {};
</script>

{#if authenticated}
	<pre>{JSON.stringify(user)}</pre>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
				<Avatar.Root class="h-9 w-9">
					<!-- <Avatar.Image src="/avatars/03.png" alt="@shadcn" /> -->
					<Avatar.Fallback>BB</Avatar.Fallback>
				</Avatar.Root>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56" align="end">
			<DropdownMenu.Label class="font-normal">
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium leading-none">BB</p>
					<p class="text-muted-foreground text-xs leading-none">email@email.com</p>
				</div>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					Profile
					<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					Settings
					<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>New Dashboard</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Item href="/logout">
				Log out
				<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<Button href="/login">Login</Button>
	<Button href="/register" variant="outline">Signup</Button>
{/if}
