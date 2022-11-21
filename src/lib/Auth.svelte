<script>
  let username
  let password
  $: console.log({ username, password })
</script>

<form>
  <label
    >Username:
    <input type="text" name="name" bind:value={username} />
  </label>
  <label
    >Password:
    <input type="text" name="name" bind:value={password} />
  </label>
  <button on:click={login}>Login</button>
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
