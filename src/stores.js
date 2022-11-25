import { writable } from 'svelte/store'

export const app = writable({
  baseUrl: 'https://puoro.haume.nz/rest',
  defaultQuerySrings: '&c=doof&f=json',
  username: import.meta.env.VITE_SUBSONIC_USER ?? '',
  password: import.meta.env.VITE_SUBSONIC_PASS ?? '',
  hasAuthenticated: false,
  status: 'Welcome to Do0f',
  display: 'welcome',
  podcasts: {},
  episodes: {},
  albums: {},
  artists: {},
})
