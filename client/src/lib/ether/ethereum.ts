import { ethers, Contract } from 'ethers';
import type { CampaignContract } from '../../types';
import CampaignFactory from './CampaignFactory.json';

declare global {
	interface Window {
		ethereum: any;
	}
}

const getBlockchain = (): Promise<CampaignContract> =>
	new Promise((resolve, _reject) => {
		window.addEventListener('load', async () => {
			if (window.ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await provider.send('eth_requestAccounts', []);
				console.log('provider', provider);
				const signer = provider.getSigner();
				const signerAddress = await signer.getAddress();
				console.log('signerAddress', signerAddress);
				const campaignFactory = new Contract(CampaignFactory.address, CampaignFactory.abi, signer);
				console.log('campaignFactory', campaignFactory);
				resolve({ signerAddress, campaignFactory, provider });
			}
		});
	});

export default getBlockchain;
