export const load = async ({ fetch, params }) => {
	const url = `https://puoro.haume.nz/rest/getPodcasts?u=adam&p=AngelDust&c=testing&type=random&f=json&id=${params.id}`;

	const data = await fetch(url);
	const json = await data.json();
	const episodes = json['subsonic-response'].podcasts.channel[0];

	if (json['subsonic-response'].status === 'ok') {
		// console.log('[id]', episodes);
		return episodes;
	}
};
