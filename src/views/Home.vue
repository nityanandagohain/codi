<template>
  <div class="container">

    <HelloWorld msg="Welcome to CODI"/>
    <br>
    <h3>Simplified Covid19 detection in three simple steps.</h3>
    <br>
    <b-container class="text-left">
      <b-row >
        <b-col md="7"><div class="pad">1) Take the Questionare</div> </b-col>
        <b-col md="2"><router-link to="/questionaire">Here</router-link></b-col>
        <b-col md="1" v-if="doneQ"><b-icon icon="check-circle" variant="success"></b-icon></b-col>
      </b-row>
      <b-row>
        <b-col md="7"><div class="pad">2) Buy the test kit </div></b-col>
        <b-col md="2"><router-link to="/buy">Here</router-link></b-col>
        <b-col md="1" v-if="doneB"><b-icon icon="check-circle" variant="success"></b-icon></b-col>
      </b-row>
      <b-row>
        <b-col md="7"><div class="pad">3) Upload the image of the Test Kit for results</div> </b-col>
        <b-col md="2"><router-link to="/uploadimage">Here</router-link></b-col>
        <b-col md="1" v-if="doneU"><b-icon icon="check-circle" variant="success"></b-icon></b-col>
      </b-row>
    </b-container>
    <br>
    <button @click="logout">Logout</button>

  </div>
</template>

<script>
import firebase from 'firebase';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { store } from "../store.js";


export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      doneU:store.state.doneU,
      doneQ:store.state.doneQ,
      doneB:store.state.doneB
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
  }
}
</script>

<style scoped>
.pad {
  margin-left: 15em;
  font-size: 20px;
  font-weight: 300;
}
</style>