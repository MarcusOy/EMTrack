import { Store } from 'pullstate';

interface EMTDataStore {
	role: string;
}

const initialState: EMTDataStore = {
	role: localStorage.getItem('role') ?? '',
};

export const DataStore = new Store<EMTDataStore>(initialState);
