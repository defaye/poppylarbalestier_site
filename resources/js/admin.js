require('~/js/admin/bootstrap')

import Vue from 'vue'
window.Vue = Vue

import Vuex from 'vuex'

Vue.use(Vuex)

require('~/js/admin/fontawesome')

import autosize from 'autosize'
Vue.directive('autosize', el => {
    autosize(el)
})
Vue.component('notifications', require('~/js/components/Notifications.vue').default)
Vue.component('errors', require('~/js/admin/components/Errors.vue').default)
Vue.component('side-navigation', require('~/js/admin/components/SideNavigation').default)

Vue.component('pagination', require('~/js/admin/components/Pagination.vue').default)

Vue.component('image-uploader', require('~/js/admin/components/ImageUploader.vue').default)
Vue.component('post', require('~/js/admin/components/Post.vue').default)
Vue.component('posts', require('~/js/admin/components/Posts.vue').default)
Vue.component('page', require('~/js/admin/components/Page.vue').default)
Vue.component('pages', require('~/js/admin/components/Pages.vue').default)
Vue.component('page-posts', require('~/js/admin/components/PagePosts.vue').default)
Vue.component('navigation', require('~/js/admin/components/Navigation.vue').default)
Vue.component('dynamic-component', require('~/js/admin/components/DynamicComponent.vue').default)

Vue.component('login', require('~/js/admin/components/Login.vue').default)

Vue.component('profile', require('~/js/admin/components/Profile').default)


// Vue.component('responsive-image', require('./components/ResponsiveImage.vue').default)
// Vue.component('carousel', require('./components/Carousel.vue').default)

import storeConfiguration from '~/js/store/configuration'

const store = new Vuex.Store(storeConfiguration)

const app = new Vue({
    el: '#app',
    store
})
