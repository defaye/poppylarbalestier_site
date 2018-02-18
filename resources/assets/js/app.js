
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

require('./fontawesome');

Vue.component('responsive-image', require('./components/ResponsiveImage.vue'));
Vue.component('carousel', require('./components/Carousel.vue'));

const app = new Vue({
    el: '#app'
});
