import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false;

Vue.use(BootstrapVue)

let app = '';
const config = {
    apiKey: "AIzaSyCLc7fdv4qJTZ1DbdYrJK_m4zOITPUY0xg",
    authDomain: "codi-9f960.firebaseapp.com",
    databaseURL: "https://codi-9f960.firebaseio.com",
    projectId: "codi-9f960",
    storageBucket: "codi-9f960.appspot.com",
    messagingSenderId: "711750210658",
    appId: "1:711750210658:web:db5b7a8ceb60e99c1a2d3b",
    measurementId: "G-D41WVV6T98"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        /* eslint-disable no-new */
        app = new Vue({
            router,
            render: h => h(App)
        }).$mount('#app');
    }
});