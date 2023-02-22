<template>
  <div class="Rattachement">
    <h1>Rattachement</h1>
    <form>
      <input type="email" placeholder="User Email" required>
      <button type="submit">OK</button>
    </form>
    <br>
    <form>
      <input type="texte" placeholder="Organisation Name" required>
      <button type="submit">OK</button>
    </form>
    <br>
    <form>
      <button type="submit">Valider</button>
    </form>
    <br><br>
    <users />
    <br>
    <h2>Organisation Join</h2>
    <ul>
      <OrgaJoin/>
    </ul>
    <br>
    <div class="button">
      <button>Confirmer</button>
    </div>
  </div>



</template>

<script>
import users from "@/components/Users.vue";
import OrgaJoin from "@/components/OrgaJoin.vue";
export default {
  name: 'RattachementVue',
  components:{
    OrgaJoin,
    users
  }
}
</script>

<style scoped>

</style>