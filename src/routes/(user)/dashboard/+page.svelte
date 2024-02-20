<script lang="ts">
	import DataTable from './(components)/data-table.svelte';
	import ticketData from './(data)/tickets.json';
</script>

<div class="space-y-6">
	<DataTable data={ticketData} />
</div>
