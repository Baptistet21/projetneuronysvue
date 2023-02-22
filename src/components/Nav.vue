<template>
  <nav className="navbar">
    <ul>
      <li><router-link to="/reclamation">Reclamation  </router-link></li>
      <li><router-link to="/rattachement">Rattachement  </router-link></li>
      <li><router-link to="/upgrade">Upgrade</router-link></li>
    </ul>
  </nav>
  <router-view/>
</template>


<script>

import RouterLink from "vue-router";
export default {
  name: "NavBar",
  components:{
    RouterLink
  }
}
</script>

<style scoped>

</style>