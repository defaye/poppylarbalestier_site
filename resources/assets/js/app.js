
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vuex from 'vuex';

Vue.use(Vuex);

require('./fontawesome');

require('./components');


import autosize from "autosize";
Vue.directive('autosize', el => {
    autosize(el);
});

Vue.component('alert', require('./admin/components/Alert.vue'));
Vue.component('navigation', require('./components/Navigation.vue'));
Vue.component('responsive-image', require('./components/ResponsiveImage.vue'));
Vue.component('carousel', require('./components/Carousel.vue'));

const store = new Vuex.Store({
    state: {
        errors: undefined,
        processing: false,
        status: undefined,
        page: undefined
    },
    mutations: {
        errors(state, errors) {
            state.errors = errors
        },
        page(state, page) {
            state.page = page
        },
        processing(state, mode) {
            state.processing = mode === true
        },
        status(state, status) {
            state.status = status
        },
    },
    actions: {
        async load(context, path) {
            try {
                const response = await axios.post("/api/router", {
                    path
                });
                let title = response.data.hasOwnProperty("title") ? response.data.title + " — ***REMOVED*** ***REMOVED***" : (
                    response.data.hasOwnProperty("name") ? response.data.name + " — ***REMOVED*** ***REMOVED***" : "***REMOVED*** ***REMOVED***"
                );
                window.history.pushState(Object.assign({}, response.data), title, path);
                document.title = title;
                context.commit("page", response.data);
                document.querySelector("body").scrollIntoView({ behavior: "instant", block: "start" });
            } catch (e) {
                console.error(e.response.data);
            }
        }
    }
});

const app = new Vue({
    el: "#app",
    store,
    mounted() {
        store.dispatch("load", new URL(window.location.href).pathname);

        window.onpopstate = event => {
            document.title = event.state.title;
            store.commit("page", event.state);
        };
    }
});
