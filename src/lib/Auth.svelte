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
  <label
    >Username:
    <input type="text" name="name" bind:value={$subSonicApi.username} />
  </label>
  <label
    >Password:
    <input type="password" name="name" bind:value={$subSonicApi.password} />
  </label>
  <button on:click|preventDefault={login}>Login</button>
</form>

<style>
  form {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    color: whitesmoke;
  }
  input,
  label {
    padding: 0.5rem;
  }
  label {
    font-weight: bold;
  }
  input {
    border: 1px solid grey;
  }
</style>
