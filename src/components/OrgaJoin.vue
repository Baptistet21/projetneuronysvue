<template>
  <h2>Organisation Join :</h2>
  <ul>
  <div>
    <div v-for="item in orgaJoin" :key="item.id">
      <h4>Organisation name : {{ item.name }}</h4>
      <p>Credits : {{ item.credits }}</p>
      <p>Orga type : {{ item.orga_type }}</p>
      <p>Stripe ID : {{ item.stripe_id }}</p>
      <p>Users ID : {{ item.users_id }}</p>
    </div>
  </div>
  </ul>
</template>
<script>
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {API} from "aws-amplify";
import query from "../Fonction_graphql/query";

export default {
  name: "OrgaJoin",
  props: {
    id: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      orgaJoin: {},
    };
  },
  mounted() {
    if (this.id !==0){
      this.getOrganisation();
    }
  },
  watch: {
    id() {
      this.getOrganisation();
    },
  },

  methods: {
    async getOrganisation(){
      const response = await API.graphql(graphqlOperation(query.getOrgaByID(this.id)));
      this.orgaJoin = response.data.listOrganisations.items
      return this.orgaJoin
    }
  }
}
</script>

<style scoped>

</style>