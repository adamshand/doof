<script>
  import { app } from '../stores.js'

  async function login() {
    const url = `${$app.baseUrl}/ping?u=${$app.username}&p=${$app.password}${$app.defaultQuerySrings}`
    if (!$app.username || !$app.password) {
      $app.status = 'provide all yo deets!'
      return
    }
    const data = await fetch(url)
    const json = await data.json()

    if (json['subsonic-response'].status === 'ok') {
      $app.hasAuthenticated = true
      $app.status = 'nice, all logged in.'
    } else {
      $app.status = json['subsonic-response'].error.message
      throw new Error(json['subsonic-response'].error.message)
    }
  }
</script>

<form>
  <fieldset>
    <input
      bind:value={$app.username}
      minlength="3"
      maxlength="12"
      placeholder="username"
      type="text"
      required />
    <input
      bind:value={$app.password}
      minlength="8"
      placeholder="password"
      required
      type="password" />
    <input id="baseUrl" type="url" bind:value={$app.baseUrl} required />
  </fieldset>
  <button on:click|preventDefault={login}>Login</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: whitesmoke;
  }
  input {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
  input:invalid {
    border: 1px solid crimson;
  }
  input:valid {
    border: 1px solid darkgreen;
  }
  #baseUrl {
    background-color: lightgrey;
    color: grey;
  }
  button {
    background-color: darkgreen;
  }
  form:invalid button {
    background-color: grey;
    color: red;
    pointer-events: none;
  }
</style>
