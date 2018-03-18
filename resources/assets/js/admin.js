
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./admin/bootstrap');

window.Vue = require('vue');

require('./admin/fontawesome');

import autosize from "autosize";
Vue.directive('autosize', el => {
    autosize(el);
});
Vue.component('image-handler', require('./admin/components/ImageHandler.vue'));
Vue.component('errors', require('./admin/components/Errors.vue'));
Vue.component('post', require('./admin/components/Post.vue'));
// Vue.component('posts', require('./admin/components/Posts.vue'));
Vue.component('page', require('./admin/components/Page.vue'));
Vue.component('pages', require('./admin/components/Pages.vue'));

// Vue.component('responsive-image', require('./components/ResponsiveImage.vue'));
// Vue.component('carousel', require('./components/Carousel.vue'));

const app = new Vue({
    el: '#app'
});
