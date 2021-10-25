<script>
	import { ethers } from 'ethers';
	import { onMount } from 'svelte';
	import useBlockchain from '$lib/ether/ethereum';

	onMount(async () => {
		const blockchain = await useBlockchain();
		console.log('blockchain', blockchain);
		console.log('campaigns', await blockchain.campaignFactory.getDeployedCampaigns());
	});
</script>

<h1>Campaigns Index!</h1>
