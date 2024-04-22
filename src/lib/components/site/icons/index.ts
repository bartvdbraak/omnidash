import type { Icon as LucideIcon } from 'lucide-svelte';
import { ArrowRight, Loader2 } from 'lucide-svelte';
import Logo from './logo.svelte';
import Svelte from './svelte.svelte';
import GitHubLogo from './github.svelte';
import VercelLogo from './vercel.svelte';
import LinkedInLogo from './linkedin.svelte';
import MicrosoftLogo from './microsoft.svelte';
import AppleLogo from './apple.svelte';
import GitLabLogo from './gitlab.svelte';
import BitBucketLogo from './bitbucket.svelte';
import DiscordLogo from './discord.svelte';
import FacebookLogo from './facebook.svelte';
import GoogleLogo from './google.svelte';
import InstagramLogo from './instagram.svelte';
import TwitterLogo from './twitter.svelte';

export type Icon = LucideIcon;

export const Icons = {
	logo: Logo,
	gitHub: GitHubLogo,
	microsoft: MicrosoftLogo,
	svelte: Svelte,
	vercel: VercelLogo,
	linkedIn: LinkedInLogo,
	spinner: Loader2,
	arrowRight: ArrowRight,
	apple: AppleLogo,
	bitBucket: BitBucketLogo,
	gitLab: GitLabLogo,
	discord: DiscordLogo,
	facebook: FacebookLogo,
	google: GoogleLogo,
	instagram: InstagramLogo,
	twitter: TwitterLogo
};
