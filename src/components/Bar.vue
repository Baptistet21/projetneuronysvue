<template>
  <div class="Bar">
    <h4>Bonjour, {{ currentUser.attributes.email}} </h4>
    <amplify-sign-out/>
  </div>

  <Nav/>



</template>

<script>

import './Css.css'
import Nav from "../components/Nav.vue";





export default {
  name: 'AppHeader',
  props: {
    currentUser: Object
  },
  methods: {

  },
  components:{
    Nav
  }
}
</script>

<style scoped>
/* styles pour le composant */
</style>
