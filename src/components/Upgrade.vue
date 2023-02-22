<template>
  <div class="Upgrade">
    <h1>Upgrade</h1>
    <form>
      <input type="email" placeholder="User Email" v-model="email" required>
      <button type="submit">OK</button>
    </form>
    <br>
    <form>
      <input type="number" placeholder="Credits" v-model="creditUpdate">
      <button type="submit">Ajouter les credits</button>
    </form>
    <br>
    <users/>
    <br>
    <h3>{{creditUpdate}} crédits vont être ajouté à l'organisation team de {{email}}</h3>
    <div class="button">
      <button>Confirmer</button>
    </div>
  </div>



</template>

<script>
import users from "@/components/Users.vue";
export default {
  name: "UpgradeVue",
  components: {
    users
  } ,

  data() {
    return {
      email: "",
      creditUpdate: 0,

    };
  },
}
</script>

<style scoped>

</style>