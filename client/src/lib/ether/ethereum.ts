import { ethers, Contract } from 'ethers';
import CampaignFactory from './CampaignFactory.json';

declare global {
	interface Window {
		ethereum: any;
	}
}

interface CampaignContract {
	signerAddress: string;
	campaignFactory: ethers.Contract;
	provider: ethers.providers.Web3Provider;
}

const getBlockchain = (): Promise<CampaignContract> =>
	new Promise((resolve, _reject) => {
		window.addEventListener('load', async () => {
			if (window.ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await provider.send('eth_requestAccounts', []);
				const signer = provider.getSigner();
				const signerAddress = await signer.getAddress();
				const campaignFactory = new Contract(CampaignFactory.address, CampaignFactory.abi, signer);
				resolve({ signerAddress, campaignFactory, provider });
			}
		});
	});

export default getBlockchain;
