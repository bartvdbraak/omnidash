import { MSID_ASSOCIATION } from '$env/static/private';

export async function GET() {
	return new Response(JSON.stringify(MSID_ASSOCIATION), {
		headers: {
			'Cache-Control': `public, max-age=${86400}`,
			'Content-Type': 'application/json'
		}
	});
}