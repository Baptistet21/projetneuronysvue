<template>
    <Authenticator :login-mechanisms="['name']" style="margin-top: 10%">
  <div v-if="currentUser">
    <Bar :currentUser="currentUser" />
      <router-view />
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


};



</script>
<style>

</style>



