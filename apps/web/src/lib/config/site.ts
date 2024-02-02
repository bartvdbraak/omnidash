const SITE_URL =
	import.meta.env.VERCEL_ENV === 'preview' ? import.meta.env.VERCEL_URL : 'omnidash.io';

export const siteConfig = {
	name: 'Omnidash',
	author: 'Bart van der Braak',
	url: SITE_URL,
	description: 'Self-hostable dashboard using connectors to a multitude of ticketing systems.',
	ogImage: `https://${SITE_URL}/og.png`,
	links: {
		gitHubProfile: 'https://github.com/bartvdbraak',
		gitHubProject: 'https://github.com/bartvdbraak/omnidash'
	},
	keywords: `Ticket,Dashboard,Self-hosted,${SITE_URL},Bart van der Braak,Omnidash`
};

export type SiteConfig = typeof siteConfig;
