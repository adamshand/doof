// import type { LayoutServerLoad } from './$types';

// function buildUrl(action = '', params = '') {
// 	return `${$doof.urlBase}/${action}?u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}&${params}`;
// }

export async function load({ fetch }) {
	const url =
		'https://puoro.haume.nz/rest/getPodcasts?u=adam&p=AngelDust&c=testing&type=random&f=json&includeEpisodes=false';

	const data = await fetch(url);
	const json = await data.json();
	const podcasts = json['subsonic-response'].podcasts;

	if (json['subsonic-response'].status === 'ok') {
		return podcasts;
	}
}
