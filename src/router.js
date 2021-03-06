import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/Login';
import SignUp from '@/views/SignUp';
import UploadImage from '@/views/UploadImage'
import Buy from '@/views/buyKit'
import Questionaire from '@/views/Questionaire'

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [{
            path: '*',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/sign-up',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/uploadimage',
            name: 'UploadImage',
            component: UploadImage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/buy',
            name: 'Buy',
            component: Buy,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/questionaire',
            name: 'Questionaire',
            component: Questionaire,
            meta: {
                requiresAuth: true
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('home');
    else next();
});

export default router;