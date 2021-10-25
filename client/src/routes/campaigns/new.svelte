<script>
	import { ethers } from 'ethers';
	import useBlockchain from '$lib/ether/ethereum';
	import { initialValue, makeUserStore } from '../../stores/store';
	import { init } from 'svelte/internal';

	let minimumContribution;

	const onSubmit = async () => {
		console.log('submitted');
		console.log('initValue', initialValue);
		console.log('makeUserStore', makeUserStore);
		const { campaignFactory } = await useBlockchain();
		const minEther = ethers.utils.parseEther(minimumContribution);
		console.log(minEther);
		console.log(campaignFactory);
		await campaignFactory.createCampaign(minEther);
	};
</script>

<h1 class="text-2xl bold">Create your own Campaign Smart Contract!</h1>
<form on:submit|preventDefault={onSubmit} class="w-full max-w-md my-4">
	<div class="flex flex-col justify-center border-b border-teal-500 w-full">
		<h4 class="text-xl w-full">Your campaigns minimum contribution amount:</h4>
		<div class="flex justify-center w-full">
			<input
				class="mt-6 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
				type="text"
				placeholder="Minimum Contribution"
				aria-label="Minimum Contribution"
				bind:value={minimumContribution}
			/>
			<span
				class="flex justify-center items-end pb-1 bold text-teal-500 hover:text-teal-800 text-sm rounded"
				type="button"
			>
				Ethereum
			</span>
		</div>
	</div>
	<button class="btn btn-blue my-4 max-w-xs">Create!</button>
</form>
