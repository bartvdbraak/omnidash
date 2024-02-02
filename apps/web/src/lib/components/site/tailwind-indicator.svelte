<script>
	import { Button } from '$lib/components/ui/button';
</script>

<Button variant="ghost" size="icon" class="block sm:hidden">xs</Button>
<Button variant="ghost" size="icon" class="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden"
	>sm</Button
>
<Button variant="ghost" size="icon" class="hidden md:block lg:hidden xl:hidden 2xl:hidden"
	>md</Button
>
<Button variant="ghost" size="icon" class="hidden lg:block xl:hidden 2xl:hidden">lg</Button>
<Button variant="ghost" size="icon" class="hidden xl:block 2xl:hidden">xl</Button>
<Button variant="ghost" size="icon" class="hidden 2xl:block">2xl</Button>
