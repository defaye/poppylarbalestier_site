require('~/js/admin/bootstrap')

import Vue from 'vue'
window.Vue = Vue

import Vuex from 'vuex'

Vue.use(Vuex)

require('~/js/admin/fontawesome')

import autosize from "autosize"
Vue.directive('autosize', el => {
    autosize(el)
})
Vue.component('side-navigation', require('~/js/admin/components/SideNavigation'))

Vue.component('notifications', require('~/js/components/Notifications.vue'))
Vue.component('errors', require('~/js/admin/components/Errors.vue'))

Vue.component('pagination', require('~/js/admin/components/Pagination.vue'))

Vue.component('image-uploader', require('~/js/admin/components/ImageUploader.vue'))
Vue.component('post', require('~/js/admin/components/Post.vue'))
Vue.component('posts', require('~/js/admin/components/Posts.vue'))
Vue.component('page', require('~/js/admin/components/Page.vue'))
Vue.component('pages', require('~/js/admin/components/Pages.vue'))
Vue.component('page-posts', require('~/js/admin/components/PagePosts.vue'))
Vue.component('navigation', require('~/js/admin/components/Navigation.vue'))
Vue.component('dynamic-component', require('~/js/admin/components/DynamicComponent.vue'))

Vue.component('login', require('~/js/admin/components/Login.vue'))

Vue.component('profile', require('~/js/admin/components/Profile'))


// Vue.component('responsive-image', require('./components/ResponsiveImage.vue'))
// Vue.component('carousel', require('./components/Carousel.vue'))

import storeConfiguration from '~/js/store/configuration'

const store = new Vuex.Store(storeConfiguration)

const app = new Vue({
    el: '#app',
    store
})
