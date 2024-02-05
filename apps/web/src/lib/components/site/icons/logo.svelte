<script>
	export let colours = {
		topleft: '#FF6C22',
		topright: '#FF9209',
		bottomleft: '#2B3499',
		bottomright: '#FFD099'
	};
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<rect width="7" height="9" x="3" y="3" rx="1" stroke={colours.topleft} />
	<rect width="7" height="5" x="14" y="3" rx="1" stroke={colours.topright} />
	<rect width="7" height="9" x="14" y="12" rx="1" stroke={colours.bottomleft} />
	<rect width="7" height="5" x="3" y="16" rx="1" stroke={colours.bottomright} />
</svg>
