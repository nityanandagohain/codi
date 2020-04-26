<template>
  <div class="home">
    <div class="container">
      <HelloWorld/>
      <b-list-group>
        <b-list-group-item>Take the Questionare and get a personalized kit <router-link to="/uploadimage">here</router-link>. </b-list-group-item>
        <b-list-group-item>Upload the image of the test kit and get the result <router-link to="/uploadimage">link</router-link>.</b-list-group-item>
      </b-list-group>
      <br>
      <button @click="logout">Logout</button>
    </div>
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
    }
  }
}
</script>
