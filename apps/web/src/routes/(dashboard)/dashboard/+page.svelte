<script lang="ts">
	import DataTable from "./(components)/data-table.svelte";
	import ticketData from "./(data)/tickets.json";
</script>

<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
		</div>
	</div>
	<DataTable data={ticketData} />
</div>
