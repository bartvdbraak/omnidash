import type { NavItem, SidebarNavItem } from '$lib/types/nav';

interface NavConfig {
	mainNav: NavItem[];
	sidebarNav: SidebarNavItem[];
}

export const navConfig: NavConfig = {
	mainNav: [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Login',
			href: '/login'
		},
		{
			title: 'Signup',
			href: '/signup'
		}
	],
	sidebarNav: []
};
