<script>
	import { doof } from '../stores/doof.js';

	async function login() {
		const url = `${$doof.urlBase}/ping?u=${$doof.username}&p=${$doof.password}&${$doof.urlParams}`;
		if (!$doof.username || !$doof.password) {
			$doof.status = 'provide all yo deets!';
			return;
		}

		const data = await fetch(url);
		const json = await data.json();

		if (json['subsonic-response'].status === 'ok') {
			$doof.hasAuthenticated = true;
			$doof.status = 'nice, all logged in.';
		} else {
			if (json['subsonic-response'].error.message.includes('invalid ')) {
				$doof.password = '';
				$doof.status = 'invalid username or password';
			}
			throw new Error(json['subsonic-response'].error.message);
		}
	}
</script>

<form>
	<fieldset>
		<input bind:value={$doof.username} minlength="3" placeholder="username" type="text" required />
		<input
			bind:value={$doof.password}
			minlength="8"
			placeholder="password"
			required
			type="password"
		/>
		<input id="urlBase" type="url" bind:value={$doof.urlBase} required />
	</fieldset>
	<button on:click|preventDefault={login}>Login</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		color: whitesmoke;
	}
	fieldset {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		border-color: darkgoldenrod;
		padding: 0.5rem;
	}
	input:invalid {
		border: 1px solid crimson;
	}
	input:valid {
		border: 1px solid darkgreen;
	}
	#urlBase {
		display: none;
		background-color: lightgrey;
		color: grey;
	}
	button {
		background-color: darkgreen;
	}
	form:invalid button {
		display: none;
	}
</style>
