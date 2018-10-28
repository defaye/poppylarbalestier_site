
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./admin/bootstrap')

import Vue from 'vue'
window.Vue = Vue

import Vuex from 'vuex'

Vue.use(Vuex)

require('./admin/fontawesome')

import autosize from "autosize"
Vue.directive('autosize', el => {
    autosize(el)
})
Vue.component('notifications', require('./components/Notifications.vue'))
Vue.component('errors', require('./admin/components/Errors.vue'))

Vue.component('pagination', require('./admin/components/Pagination.vue'))

Vue.component('image-uploader', require('./admin/components/ImageUploader.vue'))
Vue.component('post', require('./admin/components/Post.vue'))
Vue.component('posts', require('./admin/components/Posts.vue'))
Vue.component('page', require('./admin/components/Page.vue'))
Vue.component('pages', require('./admin/components/Pages.vue'))
Vue.component('page-posts', require('./admin/components/PagePosts.vue'))
Vue.component('navigation', require('./admin/components/Navigation.vue'))
Vue.component('dynamic-component', require('./admin/components/DynamicComponent.vue'))

Vue.component('login', require('./admin/components/Login.vue'))



// Vue.component('responsive-image', require('./components/ResponsiveImage.vue'))
// Vue.component('carousel', require('./components/Carousel.vue'))

import storeConfiguration from './store/configuration'

const store = new Vuex.Store(storeConfiguration)

const app = new Vue({
    el: '#app',
    store
})
