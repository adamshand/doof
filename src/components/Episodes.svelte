<script>
	import sanitizeHtml from 'sanitize-html';
	import { app } from '../stores.js';

	export let podcast;
	const descriptionLength = 312;
	let lastUpdated = new Date();

	async function downloadEpisode(id) {
		// https://puoro.haume.nz/rest/downloadPodcastEpisode?u=admin&p=AngelDust&c=doof&f=json&id=pe-3667
		const url = `${$app.baseUrl}/downloadPodcastEpisode?u=${$app.username}&p=${$app.password}${$app.defaultQuerySrings}&id=${id}`;

		const data = await fetch(url);
		const json = await data.json();

		if (json['subsonic-response'].status === 'ok') {
			lastUpdated = new Date();
		} else {
			// TODO need to trigger a rerender so UI updates when downloaded
			$app.status = json['subsonic-response'].error.message;
			throw new Error(json['subsonic-response'].error.message);
		}
	}
</script>

<div id="modal">
	<div id="podcast">
		<table>
			<tr>
				<td>
					<img
						alt="Logo for {podcast.title}"
						src={`${$app.baseUrl}/getCoverArt?u=${$app.username}&p=${$app.password}${$app.defaultQuerySrings}&id=${podcast.coverArt}`}
					/>
				</td>
				<td valign="top">
					<h1>{podcast.title}</h1>
					<p>{podcast.description}</p>
				</td>
			</tr>
		</table>
		<ol>
			{#each podcast.episode as episode}
				<li>
					<p>
						<time
							>{new Date(episode.publishDate).toLocaleString('en-nz', {
								day: '2-digit',
								month: 'long',
								year: 'numeric'
							})}
						</time>
					</p>
					<p class="title">{episode.title}</p>
					<p class="description">
						{#if episode.description.length < descriptionLength}
							{@html sanitizeHtml(episode.description)}
						{:else}
							{@html sanitizeHtml(
								episode.description
									// .substring(0, descriptionLength)
									.substring(0, episode.description.indexOf('. '))
							)}
						{/if}
						{#if episode.path !== ''}
							<audio controls>
								<source
									src={`${$app.baseUrl}/stream?id=${episode.streamId}&u=${$app.username}&p=${$app.password}${$app.defaultQuerySrings}`}
									type="audio/mpeg"
								/>
							</audio>
						{:else}
							<br />
							<button on:click={() => downloadEpisode(episode.streamId)}> Download </button>
						{/if}
					</p>
				</li>
			{/each}
		</ol>
	</div>
</div>

<style>
	#modal {
		position: absolute;
		top: 10;
		bottom: 10;
		right: 10;
		left: 10;
		background-color: black;
	}
	#podcast {
		margin: 1.5rem;
		text-align: left;
	}
	table {
		margin-bottom: 1rem;
	}
	tr {
		border: 1px solid silver;
	}
	td {
		width: 50%;
	}
	td img {
		padding: 1rem;
		object-fit: cover;
	}
	td h1,
	td p {
		padding-right: 1rem;
	}
	h1 {
		margin: 1rem 0;
		color: darkgoldenrod;
		font-weight: bold;
		font-size: 1.7rem;
	}
	li {
		margin-top: 1rem;
	}
	.title {
		font-size: 1.2rem;
		font-weight: bold;
	}
	.description {
		padding: 0.5rem;
		color: grey;
		text-align: justify;
		hyphens: auto;
	}
	li time {
		font-size: smaller;
		font-weight: lighter;
		color: grey;
	}
	audio {
		width: 100%;
		margin-top: 0.5rem;
	}
	button {
		padding: 0.3rem;
		background-color: darkgoldenrod;
		color: black;
	}
</style>
