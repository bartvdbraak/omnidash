<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { BaseAuthStore } from 'pocketbase';

	export let authenticated = false;
	export let user: BaseAuthStore['model'];
</script>

{#if authenticated}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
				<Avatar.Root class="h-9 w-9">
					<Avatar.Image src={user?.avatarUrl} alt={user?.name} />
					<Avatar.Fallback>{user?.initials}</Avatar.Fallback>
				</Avatar.Root>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56" align="end">
			<DropdownMenu.Label class="font-normal">
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium leading-none">{user?.name || user?.username}</p>
					<p class="text-xs leading-none text-muted-foreground">{user?.email}</p>
				</div>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item href="/dashboard">Dashboards</DropdownMenu.Item>
			<DropdownMenu.Item>Connectors</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Label class="text-xs leading-none text-muted-foreground">
				Settings
			</DropdownMenu.Label>
			<DropdownMenu.Group>
				<DropdownMenu.Item href="/settings">Profile</DropdownMenu.Item>
				<DropdownMenu.Item href="/settings/appearance">Appearance</DropdownMenu.Item>
				<DropdownMenu.Item href="/settings/notifications">Notifications</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Item href="/logout">
				Log out
				<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<Button href="/auth">Login</Button>
{/if}
