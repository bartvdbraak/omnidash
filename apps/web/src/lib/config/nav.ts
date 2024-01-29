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
			title: 'Register',
			href: '/register'
		},
		{
			title: 'Dashboard',
			href: '/dashboard'
		},
		{
			title: 'Settings',
			href: '/settings'
		},
		{
			title: 'Logout',
			href: '/logout'
		}
	],
	sidebarNav: []
};
