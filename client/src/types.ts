import type { ethers } from 'ethers';

export interface CampaignContract {
	signerAddress: string;
	campaignFactory: ethers.Contract;
	provider: ethers.providers.Web3Provider;
}
