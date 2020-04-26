<template>
  <div class="container">
    <div>
      <h3>Upload your Test Kit image to know the results:</h3>
      <input type="file" @change="previewImage" accept="image/*" />
    </div>
    <div v-if="showProgressBar!=false">
      <p>
        Progress: {{uploadValue.toFixed()+"%"}}
        <progress
          id="progress"
          :value="uploadValue"
          max="100"
        ></progress>
      </p>
    </div>
    <div v-if="imageData!=null">
      <img class="preview" :src="picture" />
      <br />
        <div v-if="covidResult!=null">
            <p>Your Covid19 test result is</p><h1>{{covidResult}}</h1> 
        </div>
      <button @click="onUpload">Upload</button>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  name: "uploadimage",
  data() {
    return {
      showProgressBar: false,
      imageData: null,
      picture: null,
      uploadValue: 0,
      covidResult: null
    };
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.showProgressBar = true
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
            this.covidResult = null;
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
          }).then(()=>{
              this.covidResult = !Math.round(Math.random());
              this.showProgressBar = false
          });
        }
      );
    }
  }
};
</script>