<script>
	import '../app.postcss';
	import Header from '$components/Header.svelte';
	import { ethers } from 'ethers';
	import { onMount } from 'svelte';

	let hasMetamask = false;
	let connected = false;
	let address;
	let balance;
	let chain;
	let blockNumber;
	onMount(async () => {
		if (window.ethereum) {
			hasMetamask = true;
			chain = new ethers.providers.Web3Provider(window.ethereum);
			blockNumber = await chain.getBlockNumber();
			connected = true;
			await requestAccounts();
			window.ethereum.on('accountsChanged', onAccountsChanged);
		}
	});

	async function onAccountsChanged(accounts) {
		address = accounts[0];
		balance = await chain.getBalance(address);
	}

	async function requestAccounts() {
		if (hasMetamask) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			if (accounts) {
				await onAccountsChanged(accounts);
			}
		}
	}
</script>

<main class="container mx-auto md:px-2 lg:px-4">
	<Header />
	<slot />
</main>
