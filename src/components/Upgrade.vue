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

    <form @submit.prevent="updateOrga">
      <button type="submit">Confirmer</button>
    </form>
 </div>



</template>


<script>
import {API, graphqlOperation} from "aws-amplify";
import query from "@/Fonction_graphql/query";
import mutation from "@/Fonction_graphql/mutation";
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
      id: "", /* resultat de getInfoUser */
      credit:0, /* resultat de getInfoUser */
      orgaId:0,  /* resultat de getOrgaId */
      TypeOrga: "", /* resultat de getInfoUser */
      RankUser: "", /* resultat de getInfoUser */

    };
  },

  methods: {
    async updateOrga () {
      if(this.RankUser === "admin"){
        if (this.TypeOrga !== "team"){
          let ValidCredits = this.credit + this.creditUpdate
          await API.graphql(graphqlOperation(mutation.updateCredits(this.orgaId,ValidCredits)));
          await API.graphql(graphqlOperation(mutation.updateTypeOrga(this.orgaId,"team")));
          window.alert(this.email + " appartient maintenant à une organisation team avec " + ValidCredits + " credits.")
          window.location.reload()
      }
        else{
          window.alert(this.email + " appartient déjà à une organisation team.")
          window.location.reload()
        }


    }
      else{
        window.alert(this.email + " n'est pas admin dans son organisation. ")
        window.location.reload()
      }
    },



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
      const RankList = response.data.byEmail.items.map((item) => item.orga_rank);
      this.RankUser = RankList[0];

      return this.credit;
    },

    handleSubmit() {
      this.getId()
    },
    handleSubmit2() {
      this.getInfoUser()
      window.alert(this.creditUpdate + " crédits vont être ajouté à l'organisation team de " + this.email +", une fois validé");

    },
  },

}
</script>

<style scoped>

</style>
