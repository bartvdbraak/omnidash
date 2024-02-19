import { defineConfig } from 'unlighthouse';

export default defineConfig({
	site: process.env.SCAN_URL || 'http://localhost:5173/',
	scanner: {
		samples: 1,
		throttle: true
	},
	cookies: [
		{
			name: 'pb_auth',
			value: process.env.AUTH_COOKIE || '',
			domain: process.env.SCAN_URL || 'http://localhost:5173/',
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
