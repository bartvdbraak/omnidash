import { defineConfig } from 'unlighthouse';

export default defineConfig({
	site: process.env.SITE_URL || 'http://localhost:5173/',
	scanner: {
		samples: 1,
		throttle: true
	},
	cookies: [
		{
			name: 'pb_auth',
			value: process.env.AUTH_COOKIE || '',
			domain: 'localhost',
			path: '/',
			sameSite: 'Lax'
		}
	],
	ci: {
		reporter: 'jsonExpanded',
		buildStatic: true,
		budget: 65
	}
});
