import { readable } from 'svelte/store';
import type { CampaignContract } from '../types';
import getBlockchain from '$lib/ether/ethereum';

export function initialValue() {
	return {};
}

export function makeUserStore(args) {
	// 1. Build the store and initialize it as empty and error free
	let initial = initialValue();
	let store = readable(initial, makeSubscribe(initial, args));
	return store;
}

function unsubscribe() {
	// Nothing to do in this case
}

function makeSubscribe(data, _args) {
	// 2. Create a closure with access to the
	// initial data and initialization arguments
	return (set) => {
		// 3. This won't get executed until the store has
		// its first subscriber. Kick off retrieval.
		fetchUserData(data, set);

		// 4. We're not waiting for the response.
		// Return the unsubscribe function which doesn't do
		// do anything here (but is part of the stores protocol).
		return unsubscribe;
	};
}

async function fetchUserData(data, set) {
	try {
		const blockchain = await getBlockchain();
		set(blockchain);
	} catch (error) {
		data.error = error;
		set(data);
	}
}
