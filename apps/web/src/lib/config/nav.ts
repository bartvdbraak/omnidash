import type { NavItem, SidebarNavItem } from '$lib/types/nav';

interface NavConfig {
	mainNav: NavItem[];
	sidebarNav: SidebarNavItem[];
}

export const navConfig: NavConfig = {
	mainNav: [
		{
			title: 'Home',
			href: '/',
			always: true
		},
		{
			title: 'Dashboard',
			href: '/dashboard',
			auth: true
		},
	],
	sidebarNav: []
};
