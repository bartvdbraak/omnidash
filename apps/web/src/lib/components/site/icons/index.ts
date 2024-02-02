import type { Icon as LucideIcon } from 'lucide-svelte';
import { ArrowRight, Loader2 } from 'lucide-svelte';
import { GithubLogo, VercelLogo, LinkedinLogo } from 'radix-icons-svelte';
import Logo from './logo.svelte';
import Svelte from './svelte.svelte';
import Microsoft from './microsoft.svelte';

export type Icon = LucideIcon;

export const Icons = {
	logo: Logo,
	gitHub: GithubLogo,
	microsoft: Microsoft,
	svelte: Svelte,
	vercel: VercelLogo,
	linkedIn: LinkedinLogo,
	spinner: Loader2,
	arrowRight: ArrowRight
};
