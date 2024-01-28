<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1>Sign up</h1>

<form method="POST">
	<input type="text" name="name" placeholder="name" value={form?.name ?? ''} />
	<input type="email" name="email" placeholder="E-mail" value={form?.email ?? ''} />
	<input type="password" name="password" placeholder="Password" value={form?.password ?? ''} />

	<button type="submit">Sign up</button>
</form>

{#if form?.error}
	<p>{form.error}</p>
{/if}

<p>Already have an account?</p>

<a href="/login">Log in</a>
