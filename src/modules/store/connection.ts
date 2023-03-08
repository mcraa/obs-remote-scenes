import { writable } from 'svelte/store';
import obs from '../obs';

export type Connection = {
    address?: string
}

const CONNECTION: Connection = { };

const { subscribe, set } = writable(CONNECTION);

const createConnection = async (address: string, pass: string) => { 
    try {
        const res = await obs.connect(address, pass.length ? undefined : pass);
        if (res) {
            set({ address });
        }
    } catch (error) {
        console.log(error)
    }
}

const reset = () => {
    set(CONNECTION);
};

export default {
    subscribe,
    createConnection,
    reset,
    set
}