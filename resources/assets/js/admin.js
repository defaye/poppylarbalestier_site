
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./admin/bootstrap');

import Vue from 'vue';
window.Vue = Vue;

import Vuex from 'vuex';

Vue.use(Vuex)

require('./admin/fontawesome');

import autosize from "autosize";
Vue.directive('autosize', el => {
    autosize(el);
});
Vue.component('alert', require('./admin/components/Alert.vue'));
Vue.component('errors', require('./admin/components/Errors.vue'));

Vue.component('image-uploader', require('./admin/components/ImageUploader.vue'));
Vue.component('post', require('./admin/components/Post.vue'));
// Vue.component('posts', require('./admin/components/Posts.vue'));
Vue.component('page', require('./admin/components/Page.vue'));
Vue.component('pages', require('./admin/components/Pages.vue'));
Vue.component('page-posts', require('./admin/components/PagePosts.vue'));
Vue.component('navigation', require('./admin/components/Navigation.vue'));
Vue.component('dynamic-component', require('./admin/components/DynamicComponent.vue'));

// Vue.component('responsive-image', require('./components/ResponsiveImage.vue'));
// Vue.component('carousel', require('./components/Carousel.vue'));
const store = new Vuex.Store({
    state: {
        errors: undefined,
        processing: false,
        status: undefined,
    },
    mutations: {
        errors(state, errors) {
            state.errors = errors
        },
        processing(state, mode) {
            state.processing = mode === true
        },
        status(state, status) {
            state.status = status
        },
    }
});

const app = new Vue({
    el: '#app',
    store
});
