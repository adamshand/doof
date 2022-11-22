<script>
  import { subSonicApi } from '../stores.js'

  async function login() {
    const url = `${$subSonicApi.baseUrl}/ping?u=${$subSonicApi.username}&p=${$subSonicApi.password}${$subSonicApi.defaultQuerySrings}`
    if (!$subSonicApi.username || !$subSonicApi.password) {
      $subSonicApi.status = 'provide all yo deets!'
      return
    }
    const data = await fetch(url)
    const json = await data.json()

    if (json['subsonic-response'].status === 'ok') {
      $subSonicApi.hasAuthenticated = true
      $subSonicApi.status = 'nice, all logged in.'
    } else {
      $subSonicApi.status = json['subsonic-response'].error.message
      throw new Error(json['subsonic-response'].error.message)
    }
  }
</script>

<form>
  <input type="text" bind:value={$subSonicApi.username} />
  <input type="password" bind:value={$subSonicApi.password} />
  <input id="baseUrl" type="text" readonly bind:value={$subSonicApi.baseUrl} />
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
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid grey;
  }
  #baseUrl {
    background-color: lightgrey;
    color: grey;
  }
</style>
