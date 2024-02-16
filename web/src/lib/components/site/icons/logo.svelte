<script>
	export let colours = {
		topLeft: '#FF6C22',
		topRight: '#FF9209',
		bottomLeft: '#FFD099',
		bottomRight: '#3B48D3'
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
	<rect width="7" height="9" x="3" y="3" rx="1" stroke={colours.topLeft} />
	<rect width="7" height="5" x="14" y="3" rx="1" stroke={colours.topRight} />
	<rect width="7" height="5" x="3" y="16" rx="1" stroke={colours.bottomLeft} />
	<rect width="7" height="9" x="14" y="12" rx="1" stroke={colours.bottomRight} />
</svg>
