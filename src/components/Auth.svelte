<script>
	import Icon from 'svelte-awesome';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';

	import { goto } from '$app/navigation';

	import { doof } from '@/stores/doof.js';

	async function login() {
		const url = `${$doof.urlBase}/ping?u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}`;

		if ($doof.username.length <= 3 || !$doof.password) {
			$doof.status = 'provide all yo deets!';
			return;
		}

		const data = await fetch(url);
		const json = await data.json();

		if (json['subsonic-response'].status === 'ok') {
			$doof.hasAuthenticated = true;
			$doof.status = 'nice, all logged in.';
			goto('/shows');
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
		<input
			bind:value={$doof.username}
			id="dynamic-label-input"
			minlength="3"
			placeholder="username"
			type="text"
			required
		/>
		<input
			bind:value={$doof.password}
			minlength="8"
			placeholder="password"
			required
			type="password"
		/>
	</fieldset>
	<button on:click|preventDefault={login}>Login</button>
	<fieldset>
		<legend><label for="toggle"> ▸ SubSonic Server &nbsp; </label></legend>
		<input type="checkbox" id="toggle" checked={false} hidden={true} />
		<div id="content">
			<input id="urlBase" type="url" bind:value={$doof.urlBase} required />
		</div>
	</fieldset>
</form>

<!-- <Icon data={faArrowRightFromBracket} /> -->
<style>
	form,
	fieldset {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	fieldset {
		border-color: darkgoldenrod;
		padding: 0.5rem;
	}
	legend {
		color: darkgoldenrod;
	}
	#toggle + #content {
		display: none;
	}
	#toggle:checked + #content {
		display: block;
	}
	input {
		background-repeat: no-repeat;
		background-position: right 1rem center;
		background-size: 0.75rem;
		font-weight: 200;
	}
	input:valid {
		color: darkgreen;
		border: none;
		background-image: url("data:image/svg+xml,%3Csvg width='45px' height='34px' viewBox='0 0 45 34' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg transform='translate%28-56.000000, -59.000000%29' fill='%232EEC96'%3E%3Cpolygon points='70.1468531 85.8671329 97.013986 59 100.58042 62.5664336 70.1468531 93 56 78.8531469 59.5664336 75.2867133'%3E%3C/polygon%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
	}
	input:invalid {
		border: 2px solid crimson;
		color: crimson;
		background-image: url("data:image/svg+xml,%3Csvg width='30px' height='30px' viewBox='0 0 30 30' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg transform='translate%28-128.000000, -59.000000%29' fill='%23F44336'%3E%3Cpolygon points='157.848404 61.9920213 145.980053 73.8603723 157.848404 85.7287234 154.856383 88.7207447 142.988032 76.8523936 131.119681 88.7207447 128.12766 85.7287234 139.996011 73.8603723 128.12766 61.9920213 131.119681 59 142.988032 70.8683511 154.856383 59'%3E%3C/polygon%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
	}
	button {
		border-radius: 8px;
		background-color: darkgoldenrod;
		border: none;
		color: black;
		font-weight: bold;
		cursor: pointer;
	}
	form:invalid button {
		opacity: 0.3;
		cursor: not-allowed;
	}
</style>
