/**
 * Static version of the Vue.js app that works with pre-rendered content
 */

require('~/js/bootstrap')

import Vue from 'vue'
window.Vue = Vue

import Vuex from 'vuex'

Vue.use(Vuex)

require('~/js/fontawesome')

require('~/js/components')

import autosize from 'autosize'
Vue.directive('autosize', el => {
    autosize(el)
})

Vue.component('notifications', require('~/js/components/Notifications.vue').default)
Vue.component('navigation', require('~/js/components/Navigation.vue').default)
Vue.component('responsive-image', require('~/js/components/ResponsiveImage.vue').default)
Vue.component('carousel', require('~/js/components/Carousel.vue').default)

import storeConfiguration from '~/js/store/configuration'

storeConfiguration.state = Object.assign(storeConfiguration.state, {
    page: window.staticPageData || undefined,
    post: window.staticPostData || undefined
})

storeConfiguration.actions = {
    load(context, path) {
        // In static mode, we navigate to the actual HTML file
        if (path !== window.location.pathname) {
            window.location.href = path
        }
    }
}

storeConfiguration.getters = {
    window() {
        return window
    }
}

const store = new Vuex.Store(storeConfiguration)

new Vue({
    el: '#app',
    store,
    mounted() {
        // Set initial page state from static data
        if (window.staticPageData) {
            this.$store.state.page = window.staticPageData
        }
        
        // Initialize carousel components for static content
        this.$nextTick(() => {
            this.initializeCarousels()
        })
    },
    methods: {
        initializeCarousels() {
            const carouselPlaceholders = document.querySelectorAll('.carousel-placeholder')
            carouselPlaceholders.forEach(placeholder => {
                const imagesData = JSON.parse(placeholder.getAttribute('data-images') || '[]')
                if (imagesData.length > 1) {
                    // Mark as Vue initialized
                    placeholder.classList.add('vue-initialized')
                    
                    // Clear the placeholder content
                    placeholder.innerHTML = ''
                    
                    // Create a new Vue instance for the carousel
                    const carouselComponent = new Vue({
                        el: placeholder,
                        template: `<carousel :images="images" :ratio-x="826" :ratio-y="551" :show-pagination="true" :auto-height="true" />`,
                        data: {
                            images: imagesData
                        }
                    })
                }
            })
        }
    }
})
