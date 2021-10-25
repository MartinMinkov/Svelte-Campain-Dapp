<script>
	import { ethers } from 'ethers';
	import { onMount } from 'svelte';
	import useBlockchain from '$lib/ether/ethereum';

	let campaigns = [];

	onMount(async () => {
		const blockchain = await useBlockchain();
		campaigns = await blockchain.campaignFactory.getDeployedCampaigns();
		console.log(campaigns);
	});
</script>

<h3 class="text-3xl mb-3">Open Campaigns</h3>
{#each campaigns as address}
	<div class="w-full shadow-lg border-2 border-gray-200 px-4 py-4">
		<p class="text-2xl bold">{address}</p>
		<a class="hover:underline" href="/">View Campaign</a>
	</div>
{/each}
