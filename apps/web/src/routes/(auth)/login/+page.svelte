<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
	export const data = {
		title: 'Log in'
	};
</script>

<h1>Log in</h1>

<form method="POST">
	<input type="email" name="email" placeholder="E-mail" value={form?.email ?? ''} />
	<input type="password" name="password" placeholder="Password" value={form?.password ?? ''} />

	<button type="submit">Log in</button>
</form>

{#if form?.error}
	<p>{form.error}</p>
{/if}

<p>Don't have an account?</p>

<a href="/signup">Sign up</a>
