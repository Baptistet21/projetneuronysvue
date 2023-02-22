<template>
  <div class="Upgrade">
    <h1>Upgrade</h1>
    <form>
      <input type="email" placeholder="User Email" required>
      <button type="submit">OK</button>
    </form>
    <br>
    <form>
      <input type="number" placeholder="Credits">
      <button type="submit">Ajouter les credits</button>
    </form>
    <br>
    <h1>Users</h1>
    <br>
    <h3>{creditUpdate} crédits vont être ajouté à l'organisation team de {name}</h3>
    <div class="button">
      <button>Confirmer</button>
    </div>
  </div>



</template>

<script>
export default {
  name: "UpgradeVue"
}
</script>

<style scoped>

</style>