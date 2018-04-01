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
                <div><a href="https://www.facebook.com/pages/***REMOVED***-***REMOVED***-***REMOVED***/261844107286000" target="_blank">Like me on Facebook</a></div>
                <div><a href="https://twitter.com/poppyplp" target="_blank">Follow me on Twitter</a></div>
                <hr>
                <div><strong>Phone:</strong> <a href="tel:00447700832331">+44 (0) 7700 832 331</a></div>
                <div>Or <strong><a href="mailto:***REMOVED***">Email Me</a></strong></div>
            </div>
        </div>
        <responsive-image :src="page.images[0].path" alt="Me and my husband" :ratio-x="4" :ratio-y="3"></responsive-image>
    </div>
</template>
<script>
    "use strict";
    export default {
        model: {
            prop: "page"
        },
        props: {
            page: Object
        }
    }
</script>
