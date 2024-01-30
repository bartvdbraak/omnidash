<script lang="ts">
	import { Icons } from '$lib/components/site/icons';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';

	let isLoading = false;
</script>

<div class="lg:p-8">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Create your account</h1>
			<p class="text-muted-foreground text-sm">
				Enter your details below to create a new account
			</p>
		</div>
		<div class={cn('grid gap-6')} {...$$restProps}>
			<form method="POST">
				<div class="grid gap-2">
					<div class="grid gap-1">
						<Label class="sr-only" for="email">Name</Label>
						<Input
							id="name"
							name="name"
							placeholder="Name"
							type="name"
							disabled={isLoading}
						/>
					</div>
					<div class="grid gap-1">
						<Label class="sr-only" for="email">Email</Label>
						<Input
							id="email"
							name="email"
							placeholder="name@example.com"
							type="email"
							autocapitalize="none"
							autocomplete="email"
							autocorrect="off"
							disabled={isLoading}
						/>
					</div>
					<div class="grid gap-1">
						<Label class="sr-only" for="password">Password</Label>
						<Input id="password" name="password" type="password" disabled={isLoading} placeholder="Password" />
					</div>
					<div class="grid gap-1">
						<Label class="sr-only" for="password">Confirm Password</Label>
						<Input id="password" name="passwordConfirm" type="password" disabled={isLoading} placeholder="Confirm password" />
					</div>
					<Button type="submit" disabled={isLoading}>
						{#if isLoading}
							<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Sign In
					</Button>
				</div>
			</form>
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t" />
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background text-muted-foreground px-2"> Or continue with </span>
				</div>
			</div>
			<Button variant="outline" type="button" disabled={isLoading}>
				{#if isLoading}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					<Icons.microsoft class="mr-2 h-4 w-4" />
				{/if}
				{' '}
				Microsoft
			</Button>
		</div>
		<p class="text-muted-foreground px-8 text-center text-sm">
			Or <a class="text-primary underline" href="/login">sign in</a> if you already have an account.<br />
			Forgot password? <a class="text-primary underline" href="/reset-password">Reset password.</a>
		</p>
	</div>
</div>
