<template>
  <div class="Reclamation">
    <h1>Reclamation</h1>
    <form @submit.prevent="handleSubmit">
  <input type="email" class="input" placeholder="User Email" id="email" v-model="email" required>
  <button class="button" type="submit">OK</button>
    </form>
    <div>
      <Users v-if="this.id" :idUser="this.id" />
      <h3 v-else>Aucun utilisateur trouvé</h3>
    </div>
  <form>
    <input type="number" class="inputCredits" placeholder="Credits" id="creditsUpdate" v-model="creditUpdate">
    <button class="buttonForm2" @click.prevent="updateOrgaCredits">Ajouter les credits</button>
  </form>
  </div>



</template>

<script>
import {API, graphqlOperation} from "aws-amplify";
import query from "@/Fonction_graphql/query";
import mutation from "@/Fonction_graphql/mutation";
import Users from "@/components/Users.vue";
export default {
  name: "ReclamationVue",
  components: {
    Users
  },
  data() {
    return {
      email: "", /* email form */
      creditUpdate: 0, /* credits form */
      credit: 0, /* credits orga */
      id: "", /* id user */
      orgaId: "",  /* id orga */
      TypeRankUser: "",/* rank user */
    };
  },

  methods: {
    /* fonction qui permet le changement de credits*/

    async updateOrgaCredits() {
      if (this.TypeRankUser === "admin") {
        const creditsValid = this.credit + this.creditUpdate;
        await API.graphql(
            graphqlOperation(mutation.updateCredits(this.orgaId,creditsValid))
        );
        window.alert(this.email + " a maintenant " + creditsValid + " credits.");
        window.location.reload();

      } else {
        window.alert(this.email + " n'est pas admin.");
        window.location.reload();
      }
    },
    /* recup id user*/

    async getId() {
      const response = await API.graphql(
          graphqlOperation(query.getIdByName(this.email))
      );
      const idList = response.data.byEmail.items.map((item) => item.id);
      const RankList = response.data.byEmail.items.map(
          (item) => item.orga_rank
      );
      this.id = idList[0];
      this.TypeRankUser = RankList[0];
      return this.id;
    },
    /* recup credit user*/

    async getCredit() {
      const response = await API.graphql(
          graphqlOperation(query.getIdByName(this.email))
      );
      const creditList = response.data.byEmail.items.map(
          (item) => item.orga.credits
      );
      this.credit = creditList[0];
      return this.credit;
    },
    /* recup id orga*/

    async getOrgaId() {
      const response = await API.graphql(
          graphqlOperation(query.getIdByName(this.email))
      );
      const IdList = response.data.byEmail.items.map((item) => item.orga.id);
      this.orgaId = IdList[0];
      return this.orgaId;
    },
    handleSubmit() {
      console.log("getId :", this.getId());
      console.log("getCredit :", this.getCredit());
      console.log("getIdOrga :", this.getOrgaId());
    },
  },
}
</script>

<style scoped>

</style>