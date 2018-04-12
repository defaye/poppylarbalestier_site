<template>
    <div v-if="page" class="container">
        <h1 v-if="page.name">{{ page.name }}</h1>
        <h1 v-else-if="page.hasOwnProperty('category') && page.title">{{ page.title }}</h1>
        <carousel class="my-4"
                  v-if="page.images && page.images.length"
                 :images="page.images"
                 :ratio-x="826"
                 :ratio-y="551"
                 :show-pagination="true"
        >
        </carousel>
        <div class="my-4" v-if="page.body && page.body.length">
            <p v-for="line in page.body.split('\n')">{{ line }}</p>
        </div>
        <div class="my-4" v-if="page.posts && page.posts.length">
            <div class="container">
                <div class="row">
                    <div class="d-flex align-content-stretch flex-wrap col-12 col-lg-4" role="button" v-for="post in page.posts" :key="post.id" @click.prevent="emitLoadEvent(`/${page.slug}/${post.slug}`)">
                        <a :href="`/${page.slug}/${post.slug}`" @click.prevent="emitLoadEvent(`/${page.slug}/${post.slug}`)"><small>{{ post.title }}</small></a>
                        <responsive-image :src="post.images[0].path" :alt="post.title" :ratio-x="4" :ratio-y="3"></responsive-image>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    "use strict";

    export default {
        model: {
            prop: "page",
            event: "change"
        },
        props: {
            page: Object
        },
        methods: {
            startCase(name) {
                return _.startCase(name)
            },
            emitLoadEvent(path) {
                this.$store.dispatch('load', path);
            }
        }
    }
</script>
