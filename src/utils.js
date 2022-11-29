import { doof } from './stores/doof.js';

function buildUrl(action = '', params = '') {
	return `${$doof.urlBase}/${action}?u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}&${params}`;
}

export async function getPodcasts(id = '') {
	const url = buildUrl('getPodcasts', id);
	console.log(url);
	const data = await fetch(url);
	const json = await data.json();

	if (json['subsonic-response'].status === 'ok') {
		return json['subsonic-response'].podcasts.channel;
	} else {
		$doof.status = json['subsonic-response'].error.message;
		throw new Error(json['subsonic-response'].error.message);
	}
}

export async function getNewestPodcasts() {
	const numEpisodes = 10;
	const url = `${$doof.baseUrl}/getNewestPodcasts?u=${$doof.username}&p=${$doof.password}${$doof.defaultQuerySrings}&count=${numEpisodes}`;

	const data = await fetch(url);
	const json = await data.json();

	if (json['subsonic-response'].status === 'ok') {
		$doof.status = json['subsonic-response'].status;
		return json['subsonic-response'].newestPodcasts.episode;
	} else {
		$doof.status = json['subsonic-response'].error.message;
		throw new Error(json['subsonic-response'].error.message);
	}
}
