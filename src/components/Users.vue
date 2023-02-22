<template>
  <div>
    <h2>User :</h2>
    <ul>
      <li v-if="user">
        <h4>email: {{ user.email }}</h4>
        <p>pseudo: {{ user.pseudo }}</p>
        <p>orga_rank: {{ user.orga_rank }}</p>
      </li>
    </ul>
    <br />
    <h2>Organisation :</h2>
    <ul>
      <li v-if="orga">
        <h4>Organisation name: {{ orga.name }}</h4>
        <p>credits: {{ orga.credits }}</p>
        <p>orga_type: {{ orga.orga_type }}</p>
        <p>stripe_id: {{ orga.stripe_id }}</p>
        <p>users_id: {{ orga.users_id }}</p>
      </li>
    </ul>
    <br />
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify';
import query from '../Fonction_graphql/query';

export default {
  name: 'UsersVue',
  props: {
    idUser: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: null,
      orga: null,
    };
  },
  async mounted() {
    await this.getUser();
  },
  watch: {
    idUser() {
      this.getUser();
    },
  },
  methods: {
    async getUser() {
      try {
        const response = await API.graphql(
            graphqlOperation(query.getUserOrga, { id: this.idUser })
        );
        const user = response.data.getUser;
        const orga = response.data.getUser.orga;
        this.user = user;
        this.orga = orga;
      } catch (error) {
        console.error(error);
        // Handle error as needed
      }
    },
  },
};
</script>
