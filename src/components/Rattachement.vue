<template>
  <div class="Rattachement">
    <h1>Rattachement</h1>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="User Email" id="email" v-model="email" required>
      <button type="submit">OK</button>
    </form>
    <br>
    <form>
      <input type="text" placeholder="Organisation Name" required>
      <button type="submit">OK</button>
    </form>
    <br>
    <form>
      <button type="submit">Valider</button>
    </form>
    <br><br>
    <div>
      <Users v-if="this.idUser" :idUser="this.idUser" />
      <h3 v-else>Aucun utilisateur trouvé</h3>
    </div>
    <br>
    <h2>Organisation Join</h2>
    <ul>
      <div>
        <OrgaJoin v-if="this.idOrga" :idUser="this.idOrga" />
        <h3 v-else>Aucune organisation trouvée</h3>
      </div>
    </ul>
{{idUser}}
    {{creditsUser}}
    {{idOrgaUser}}
    {{TypeOrgaUser}}


    <br>
    <div class="button">
      <button>Confirmer</button>
    </div>
  </div>



</template>


<script>
import {API, graphqlOperation} from "aws-amplify";
import query from "@/Fonction_graphql/query";
import Users from "@/components/Users.vue";
import OrgaJoin from "@/components/OrgaJoin.vue";
export default {
  name: "RattachementVue",
  components: {
    OrgaJoin,
    Users
  },
  data() {
    return {
      email: "", /* email form */
      orga: "", /* orga form */

      /*User*/
      idUser: "", /* resultat de getIdUser */
      creditsUser:0, /* resultat de getCreditUser */
      idOrgaUser:0,  /* resultat de getOrgaId */
      TypeOrgaUser : "", /* resultat de getIdUser */

      /*OrgaJoin*/
      idOrga : 0, /* resultat de getOrganisationId */
      creditsOrga : 0, /* resultat de getOrganisationId */
      userOrgaList: {},/* resultat de getListUserByOrga */
      TypeOrgaJoin: "", /* resultat de getOrganisationId */

      validButton : "false", /* button validation */
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
      this.idUser = idList[0];
      this.TypeOrgaUser = RankList[0];
      return this.idUser;
    },
    /* recup info user avec credits, id orga*/

    async getInfoUser() {
      const response = await API.graphql(
          graphqlOperation(query.getIdByName(this.email))
      );
      const creditList = response.data.byEmail.items.map((item) => item.orga.credits);
      this.creditsUser = creditList[0];
      const IdList = response.data.byEmail.items.map((item) => item.orga.id);
      this.idOrgaUser = IdList[0];

      return this.creditsUser;
    },

    handleSubmit() {
      console.log("getId :", this.getId());
      console.log("getInfo :", this.getInfoUser());
    },
  },
}
</script>

<style scoped>

</style>