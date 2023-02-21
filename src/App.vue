<template>
    <Authenticator :login-mechanisms="['name']" style="margin-top: 10%">
  <div v-if="currentUser">
    <Bar :currentUser="currentUser" />
    <div class="App">
      <router-view />
    </div>
  </div>

  </Authenticator>
</template>

<script>

import {Authenticator} from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css"
import { Auth } from "aws-amplify";
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import Bar from "./components/Bar.vue";
import Reclamation from "./components/Reclamation.vue";
import Rattachement from "./components/Rattachement.vue";
import Upgrade from "./components/Upgrade.vue";

Amplify.configure(config);

export default {
  components: {
    Authenticator,
    Bar,

  },
  data() {
    return {
      currentUser: undefined
    };
  },
  async created() {
    this.currentUser = await Auth.currentAuthenticatedUser();
  },
  routes: [
    { path: '/reclamation', component: Reclamation },
    { path: '/rattachement', component: Rattachement },
    { path: '/upgrade', component: Upgrade }
  ]
};
</script>
<style>

</style>



