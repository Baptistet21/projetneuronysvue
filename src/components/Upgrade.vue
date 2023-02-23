<template>
  <div class="Upgrade">
    <h1>Upgrade</h1>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="User Email" id="email" v-model="email" required>
      <button type="submit">OK</button>
    </form>
    <br>
    <form @submit.prevent="handleSubmit2">
      <input type="number" placeholder="Credits" v-model="creditUpdate" required>
      <button type="submit">Ajouter les credits</button>
    </form>
    <div>
      <Users v-if="this.id" :idUser="this.id" />
      <h3 v-else>Aucun utilisateur trouvé</h3>
    </div>
    {{id}}
    {{credit}}
    {{orgaId}}
    {{TypeOrga}}


    <h3>{{creditUpdate}} crédits vont être ajouté à l'organisation team de {{email}}</h3>
    <div class="button">
      <button>Confirmer</button>
    </div>
  </div>



</template>


<script>
import {API, graphqlOperation} from "aws-amplify";
import query from "@/Fonction_graphql/query";
import Users from "@/components/Users.vue";
export default {
  name: "UpgradeVue",
  components: {
    Users
  },
  data() {
    return {
      email: "", /* email form*/
      creditUpdate: 0, /* credits form */

      /*User*/
      id: "", /* resultat de getIdUser */
      credit:0, /* resultat de getCreditUser */
      orgaId:0,  /* resultat de getOrgaId */
      TypeOrga: "", /* resultat de getIdUser */
    };
  },

  methods: {
    /* recup id user et orga type */

    async getId() {
      const response = await API.graphql(
          graphqlOperation(query.getIdByName(this.email))
      );
      const idList = response.data.byEmail.items.map((item) => item.id);
      const RankList = response.data.byEmail.items.map(
          (item) => item.orga.orga_type
      );
      this.id = idList[0];
      this.TypeOrga = RankList[0];
      return this.id;
    },
    /* recup info user avec credits, id orga*/

    async getInfoUser() {
      const response = await API.graphql(
          graphqlOperation(query.getIdByName(this.email))
      );
      const creditList = response.data.byEmail.items.map((item) => item.orga.credits);
      this.credit = creditList[0];
      const IdList = response.data.byEmail.items.map((item) => item.orga.id);
      this.orgaId = IdList[0];

      return this.credit;
    },

    handleSubmit() {
      console.log("getId :", this.getId());
    },
    handleSubmit2() {
      console.log("getInfo :", this.getInfoUser());
    },
  },
}
</script>

<style scoped>

</style>
