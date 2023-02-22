<template>
  <div class="Reclamation">
<h1>Reclamation</h1>
<form>
  <input type="email" placeholder="User Email" required>
  <button type="submit">OK</button>
</form>
  <br>
    <h1>users</h1>

    <br>
  <form>
    <input type="number" placeholder="Credits">
    <button>Ajouter les credits</button>
  </form>
  </div>



</template>

<script>
import {API, graphqlOperation} from "aws-amplify";
import query from "@/Fonction_graphql/query";
import mutation from "@/Fonction_graphql/mutation";

export default {
  name: "ReclamationVue",
  data() {
    return {
      email: "",
      creditUpdate: 0,
      credit: 0,
      id: "",
      orgaId: "",
      TypeRankUser: "",
    };
  },

  methods: {
    async updateOrgaCredits() {
      if (this.TypeRankUser === "admin") {
        const creditsValid = this.credit + this.creditUpdate;
        await API.graphql(
            graphqlOperation(mutation.updateCredits(this.orgaId, creditsValid))
        );
        window.alert(this.name + " a maintenant " + creditsValid + " credits");
        window.location.reload();
      } else {
        window.alert(this.name + " n'est pas admin ");
        window.location.reload();
      }
    },
    async getId() {
      const response = await API.graphql(
          graphqlOperation(query.getIdByName(this.name))
      );
      const idList = response.data.byEmail.items.map((item) => item.id);
      const RankList = response.data.byEmail.items.map(
          (item) => item.orga_rank
      );
      this.id = idList[0];
      this.TypeRankUser = RankList[0];
      return this.id;
    },
    async getCredit() {
      const response = await API.graphql(
          graphqlOperation(query.getIdByName(this.name))
      );
      const creditList = response.data.byEmail.items.map(
          (item) => item.orga.credits
      );
      this.credit = creditList[0];
      return this.credit;
    },
    async getOrgaId() {
      const response = await API.graphql(
          graphqlOperation(query.getIdByName(this.name))
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