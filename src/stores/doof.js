import { writable } from 'svelte/store';

export const doof = writable({
	urlBase: 'https://puoro.haume.nz/rest',
	urlSuffix: 'c=doof&f=json',
	username: import.meta.env.VITE_SUBSONIC_USER ?? '',
	password: import.meta.env.VITE_SUBSONIC_PASS ?? '',
	hasAuthenticated: false,
	auth: false,
	status: 'Welcome to d0oF',
	search: ''
});
