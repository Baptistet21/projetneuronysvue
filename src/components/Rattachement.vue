<template>
  <div class="Rattachement">
    <h1>Rattachement</h1>
    <form @submit.prevent="handleSubmit">
      <input class="form-input" type="email" placeholder="User Email" id="email" v-model="email" required>
      <button type="submit" class="button">OK</button>
    </form>
    <form @submit.prevent="handleSubmit2">
      <input type="email" placeholder="Email Admin Organisation" id="orga" v-model="EmailAdmin" required>
      <button type="submit" class="button">OK</button>
    </form>
    <form @submit.prevent="handleSubmit3">
      <button type="submit" class="buttonForm">Valider</button>
    </form>
    <br><br>
    <div>
      <h2>Organisation User :</h2>
      <Users v-if="this.idUser" :idUser="this.idUser" />
      <h3 v-else>Aucun utilisateur trouvé</h3>
    </div>
    <br>
      <div>
        <h2>Organisation Join :</h2>
        <Users v-if="this.idAdmin" :idUser="this.idAdmin" />
        <h3 v-else>Aucune organisation trouvée</h3>
      </div>
    <br>
    <form @submit.prevent="updateOrganisationUser">
        <button class="buttonForm2" type="submit">Confirmer</button>
    </form>
  </div>



</template>


<script>
import {API, graphqlOperation} from "aws-amplify";
import query from "@/Fonction_graphql/query";
import mutation from "@/Fonction_graphql/mutation";

import Users from "@/components/Users.vue";
export default {
  name: "RattachementVue",
  components: {
    Users
  },
  data() {
    return {
      email: "", /* email form */
      EmailAdmin: "", /* orga form */

      /*User*/
      idUser: "", /* resultat de getIdUser */
      creditsUser:0, /* resultat de getCreditUser */
      idOrgaUser:0,  /* resultat de getOrgaId */
      TypeOrgaUser : "", /* resultat de getIdUser */

      /*OrgaJoin*/
      idAdmin : "" ,/* resultat de getIdAdmin */
      idOrga : 0, /* resultat de getInfoUser */
      creditsOrga : 0, /* resultat de getInfoUser */
      userOrgaList: [],/* resultat de getListUserByOrga */
      TypeOrgaJoin: "", /* resultat de getInfoUser */
      RankUserAdmin: "", /* resultat de getInfoUser */

      validButton : "false",  /*button validation */
    };
  },

  methods: {

    /* update changement d'organisation pour un user*/
    async updateOrganisationUser(){
      if(this.validButton === "true"){
         if (this.TypeOrgaJoin !== "team"){
          window.alert("L'organisation de "+this.EmailAdmin + " n'est pas une organisation team.")
          window.location.reload()

        }
        else if (this.TypeOrgaUser !== "solo"){
          window.alert(this.email + " appartient déjà à une organisation team.")
          window.location.reload()

        }

       else if(this.TypeOrgaJoin === "team" || this.TypeOrgaUser === "solo" || !this.userOrgaList.include(this.idUser)){

         let creditsValid = this.creditsOrga + this.creditsUser;
         this.userOrgaList.push(this.idUser);
           await API.graphql(graphqlOperation(mutation.updateCredits(this.idOrga, creditsValid))); /* transfert des credits dans la nouvelle organisation*/
           await API.graphql(graphqlOperation(mutation.updateCredits(this.idOrgaUser, 0))); /* l'ancienne organisation perd ses credits */
           await API.graphql(graphqlOperation(mutation.updateOrga(this.idUser, this.idOrga))); /* changement organisation pour User*/
           await API.graphql(graphqlOperation(mutation.updateListUserOrga(this.idOrga, this.userOrgaList,"team")));/* update de la liste des users de la nouvelle organisation + changement de type*/
           await API.graphql(graphqlOperation(mutation.updateListUserOrga(this.idOrgaUser, [],"orphan")));/* liste des users ancienne organisation est vide + changement de type */
           window.alert(this.email+ " a rejoins l'organisation de " + this.EmailAdmin)
        window.location.reload()
      }
       }
      else{
        window.alert("Vous devez valider avant de confirmer.")


      }

    },

    /* USER */

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
    /*ORGANISATION JOIN*/

    /* recup id de l'admin et son rank */
    async getIdAdmin() {
      const response = await API.graphql(
          graphqlOperation(query.getIdByName(this.EmailAdmin))
      );

      const idList = response.data.byEmail.items.map((item) => item.id);
      const RankList = response.data.byEmail.items.map((item) => item.orga_rank);

      this.idAdmin = idList[0];
      this.RankUserAdmin = RankList[0];

      return this.idAdmin;
    },

    /* recuperer info organisation donc id credits et type orga*/

    async getInfoOrga(){
      const response = await API.graphql(
          graphqlOperation(query.getIdByName(this.EmailAdmin))
      );
      /*recup id orga join*/
      const orgaList =  response.data.byEmail.items.map((item) => item.orga.id);
      this.idOrga=orgaList[0];

      /*recup id credits join*/
      const creditsList = response.data.byEmail.items.map((item) => item.orga.credits);
      this.creditsOrga=creditsList[0];

      /*recup Type orga join*/
      const TypeList = response.data.byEmail.items.map((item) => item.orga.orga_type);
      this.TypeOrgaJoin=TypeList[0];

      return this.idOrga
      },
    /* recuperer list user par orga*/

    async getListUserByOrga() {
      const response = await API.graphql(graphqlOperation(query.getListUserByIdOrga(this.idOrga)));
      const userList = response.data.usersByOrga_idAndPseudo.items.map(item => item.orga.users_id);
      this.userOrgaList =userList[0]
      return this.userOrgaList
    },
    handleSubmit() {
      this.getId();
      this.getInfoUser();
    },
    handleSubmit2() {
      this.getIdAdmin();
      this.getInfoOrga();
    },

    handleSubmit3() {
      if(this.RankUserAdmin === "admin"){
        window.alert(this.EmailAdmin + " est admin dans son organisation.")
        this.getListUserByOrga()
        this.validButton = "true"
      }
      else{
        window.alert(this.EmailAdmin + " n'est pas admin dans son organisation.")
        window.location.reload()
      }


    },

  },
}
</script>

<style scoped>

</style>