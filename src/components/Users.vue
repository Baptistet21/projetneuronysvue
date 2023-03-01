<template>
  <div class="User">
    <h6>User :</h6>
    <ul>
      <li :key="user.id">
        <h4>email: {{ user.email }}</h4>
        <p>pseudo: {{ user.pseudo }}</p>
        <p>orga_rank: {{ user.orga_rank }}</p>
      </li>
    </ul>
    <br />
    <h6>Organisation :</h6>
    <ul>
      <li :key="orga.id">
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
      user: {},
      orga: {},
    };
  },
  mounted() {
    if (this.idUser !== "") {
      this.getUser();
    }
  },
  watch: {
    idUser() {
      this.getUser();
    },
  },
  methods: {
    async getUser() {
      const response = await API.graphql(graphqlOperation(query.getUserOrga(this.idUser)))
      console.log(response)
      const userList = response.data.getUser;
      const orgaList = response.data.getUser.orga;
      this.user = userList;
      this.orga = orgaList;
    },
  },
};
</script>
<style>
.User ul {
  list-style: none;
  padding: 0;
}

.User li {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 0.25rem;
}

.User h6 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-align: left;
  margin-left: 5%;
  color: #e88b01;
  font-family: fantasy ;
}

.User h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;

}

.User p {
  margin: 0;
}

.User li:nth-child(even) {
  background-color: #e5e5e5;
}

</style>