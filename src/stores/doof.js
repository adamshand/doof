import { writable } from 'svelte/store';

export const doof = writable({
	urlBase: 'https://puoro.haume.nz/rest',
	urlParams: 'c=doof&f=json',
	username: import.meta.env.VITE_SUBSONIC_USER ?? '',
	password: import.meta.env.VITE_SUBSONIC_PASS ?? '',
	hasAuthenticated: false,
	status: 'Welcome to d0oF',
	display: ['podcasts'],
	podcasts: {},
	episodes: {},
	albums: {},
	artists: {}
});
