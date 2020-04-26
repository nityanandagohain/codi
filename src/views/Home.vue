<template>
  <div class="home">

    <HelloWorld msg="Welcome to CODI"/>
    <br>
    <button @click="questionaire">Take the questionaire.</button>
    <br>
    <button @click="buyKit">Buy Kit</button>
    <br>
    <button @click="uploadimage">Upload Test Results</button>
    <br>
    <br>
    <button @click="logout">Logout</button>

  </div>
</template>

<script>
import firebase from 'firebase';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    uploadimage: function() {
      this.$router.replace('uploadimage')
    },
    buyKit: function() {
      this.$router.push({ path: "/buy" });
    },
    questionaire: function(){
      this.$router.push({ path: "/questionaire" });
    }
  }
}
</script>
