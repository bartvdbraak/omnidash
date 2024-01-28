import type { Icon as LucideIcon } from 'lucide-svelte';
import { GithubLogo, VercelLogo, LinkedinLogo } from 'radix-icons-svelte';
import Logo from './logo.svelte';
import Svelte from './svelte.svelte';

export type Icon = LucideIcon;

export const Icons = {
	logo: Logo,
	gitHub: GithubLogo,
	svelte: Svelte,
	vercel: VercelLogo,
	linkedIn: LinkedinLogo
};
