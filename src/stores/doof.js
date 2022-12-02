import { writable } from 'svelte/store';

export const doof = writable({
	urlBase: 'https://puoro.haume.nz/rest',
	urlSuffix: 'c=doof&f=json',
	username: import.meta.env.VITE_SUBSONIC_USER ?? '',
	password: import.meta.env.VITE_SUBSONIC_PASS ?? '',
	hasAuthenticated: false,
	auth: false,
	status: 'Welcome to d0oF'
});

// function createCount() {
// 	const { subscribe, set, update } = writable(0);

// 	return {
// 		subscribe,
// 		increment: () => update(n => n + 1),
// 		decrement: () => update(n => n - 1),
// 		reset: () => set(0)
// 	};
// }

// export const count = createCount();

// export const podcasts = writable({});

// export async function getPodcasts() {
// 	const url =
// 		'https://puoro.haume.nz/rest/getPodcasts?u=adam&p=AngelDust&c=testing&type=random&f=json';

// 	const data = await fetch(url);
// 	const json = await data.json();

// 	if (json['subsonic-response'].status === 'ok') {
// 		podcasts.set(json['subsonic-response'].podcasts.channel);
// 	}
// }

// export const store = writable(null);
// export const logout = () => store.set(null);
// export async function signUp(username, password, email) {
//   return Auth.signUp(username, password, email)
//           .then((data) => void store.set(data));
// }

// export const logout = () => doof.set({
// 	auth: false,
// 	urlBase: '',
// 	urlSuffix: '',
// 	username: undefined,
// 	password: undefined,
// 	hasAuthenticated: false,
// 	status: ''
// });
