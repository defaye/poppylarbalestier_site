
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./admin/bootstrap');

window.Vue = require('vue');

require('./admin/fontawesome');

Vue.component('errors', require('./admin/components/Errors.vue'));
Vue.component('errors', require('./admin/components/Post.vue'));
// Vue.component('responsive-image', require('./components/ResponsiveImage.vue'));
// Vue.component('carousel', require('./components/Carousel.vue'));

const app = new Vue({
    el: '#app'
});
