import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false;

Vue.use(BootstrapVue)

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


let app = '';
const config = {

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