
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

require('./fontawesome');

Vue.component('page', require('./components/Page.vue'));
Vue.component('post', require('./components/Post.vue'));
Vue.component('navigation', require('./components/Navigation.vue'));
Vue.component('responsive-image', require('./components/ResponsiveImage.vue'));
Vue.component('carousel', require('./components/Carousel.vue'));

const app = new Vue({
    el: '#app',
    data: {
        page: undefined
    },
    mounted() {
        this.load(new URL(window.location.href).pathname);

        window.onpopstate = event => {
            document.title = event.state.title;
            this.page = event.state;
        };
    },
    methods: {
        async load(path) {
            try {
                const response = await axios.post("/api/router", {
                    path
                });
                window.history.pushState(Object.assign({}, response.data), response.data.title, path);
                document.title = response.data.title;
                this.page = response.data;
            } catch (e) {
                console.error(e.response.data);
            }
        }
    }
});
