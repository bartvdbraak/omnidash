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
		{
			title: 'Settings',
			href: '/settings',
			auth: true
		},
		{
			title: 'Login',
			href: '/login',
			auth: false,
		},
		{
			title: 'Register',
			href: '/register',
			auth: false,
		},
		{
			title: 'Logout',
			href: '/logout',
			auth: true
		},
	],
	sidebarNav: []
};
