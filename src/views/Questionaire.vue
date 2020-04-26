<template>
  <div class="container">
    <!-- havesymptoms -->
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Do you think you might have coronavirus symptoms, now or in the past?"
        label-for="input-1"
      >
        <b-form-select id="input-3" v-model="form.havesymptoms" :options="yesno" required></b-form-select>
      </b-form-group>

      <!-- Age -->
      <b-form-group id="input-group-2" label="Your Age:" label-for="input-2">
        <b-form-select id="input-3" v-model="form.age" :options="agevalues" required></b-form-select>
      </b-form-group>


      <!-- Contact -->
      <b-form-group id="input-group-2" label="Were you in close contact with anyone who tested positive?" label-for="input-2">
        <b-form-select id="input-3" v-model="form.contact" :options="yesno" required></b-form-select>
      </b-form-group>

       <!-- Travel-->
      <b-form-group id="input-group-2" label="Have you travelled outside the currently recently?" label-for="input-2">
        <b-form-select id="input-3" v-model="form.travel" :options="yesno" required></b-form-select>
      </b-form-group>

      <!-- date of first occurence -->
      <b-form-group id="input-group-3" label="Date of first symptom:" label-for="input-3">
        <b-form-datepicker
          id="example-datepicker"
          v-model="form.date_of_first_symptom"
          class="mb-2"
        ></b-form-datepicker>
      </b-form-group>

      <!-- user symptoms -->
      <b-form-group id="input-group-2" label="Your symptoms:" label-for="input-2">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="form.symptoms"
          :options="symptoms"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import firebase from "firebase";
import { store } from "../store.js";
export default {
  data() {
    return {
      form: {
        havesymptoms: "no",
        age: null,
        date_of_first_symptom: null,
        symptoms: [],
        contact: "",
        travel: ""

      },
      symptoms: [
        { text: "Fever", value: "fever" },
        { text: "Cough", value: "cough" },
        { text: "Breathing Difficulty", value: "breathing difficulty" },
        { text: "Runny nose", value: "runny nose" },
        { text: "Sense of taste/smell", value: "Sense of taste/smell" }
      ],
      yesno: ["Yes", "No"],
      agevalues: [...Array(100).keys()],
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn"
      ],
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      var user = firebase.auth().currentUser;
      var db = firebase.firestore();
      db.collection("questionaire")
        .add({
          UID: user.uid,
          havesymptoms: this.form.havesymptoms,
          age: this.form.age,
          date_of_first_symptom: this.form.date_of_first_symptom,
          symptoms: this.form.symptoms,
          contact: this.form.contact,
          travel: this.form.travel
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.quantity = 1;
      this.address = "";
      alert("Thank you for taking the questionaire!");
      store.state.doneQ = true;
      this.$router.push({ path: "/home" });

    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form = {
        havesymptoms: "no",
        age: null,
        date_of_first_symptom: null,
        symptoms: []
      }
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>