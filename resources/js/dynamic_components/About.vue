<template>
    <div class="container">
        <h1>About Me</h1>
        <div class="row my-5">
            <div class="col-12 col-lg-9" v-if="page.body && page.body.length">
                <p v-for="line in page.body.split('\n')">{{ line }}</p>
            </div>
            <div class="col-12 col-lg-3">
                <h2>Get In Touch</h2>
                <hr>
                <a class="ml-auto" href="https://www.facebook.com/pages/***REMOVED***-***REMOVED***-***REMOVED***/261844107286000" target="_blank">
                    <font-awesome-icon class="fa-2x" :icon="['fab', 'facebook-square']" size="lg"></font-awesome-icon>
                </a>
                <a class="ml-1" href="tel:00447700832331">
                    <font-awesome-icon class="fa-2x" :icon="['fas', 'phone-square']" size="lg"></font-awesome-icon>
                </a>
                <a class="ml-1" href="mailto:***REMOVED***">
                    <font-awesome-icon class="fa-2x" :icon="['fas', 'envelope-square']" size="lg"></font-awesome-icon>
                </a>
                <a class="ml-1 mr-auto" href="/contact" @click.prevent="$store.dispatch('load', '/contact')">
                    <font-awesome-icon class="fa-2x" :icon="['fas', 'pen-square']" size="lg"></font-awesome-icon>
                </a>
            </div>
        </div>
        <img :src="page.images[0].path" alt="Me and my partner" class="w-100">
        <!-- <responsive-image :src="page.images[0].path" alt="Me and my husband" :ratio-x="4" :ratio-y="3"></responsive-image> -->
    </div>
</template>
<script>
    'use strict'
    export default {
        model: {
            prop: 'page'
        },
        props: {
            page: Object
        }
    }
</script>
