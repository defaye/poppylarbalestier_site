<template>
    <div v-if="page" class="container">
        <h1 v-html="pageHeader"></h1>
        <div v-if="'images' in page && page.images.length">
            <carousel class="my-4"
                      v-if="page.images.length > 1"
                     :images="page.images"
                     :ratio-x="826"
                     :ratio-y="551"
                     :show-pagination="true"
                     :auto-height="true"
            >
            </carousel>
            <img
                :alt="page.name || page.title || false"
                :src="page.images[0].path"
                class="w-100"
                v-else
            >
            <!-- <responsive-image v-else :src="page.images[0].path" :alt="page.name || page.title || false" :ratio-x="826" :ratio-y="551"></responsive-image> -->
        </div>
        <v-runtime-template v-if="'body_prefix' in page && typeof page.body_prefix === 'string'" :template="wrapWithDiv(page.body_prefix)"/>
        <div class="d-flex flex-column">
            <div
                class="my-4 order-2 order-lg-1"
                v-if="'body' in page && typeof page.body === 'string'"
                v-html="lineBreaksToBr(page.body)"
            >
                <p v-for="line in page.body.split('\n')">{{ line }}</p>
            </div>
            <!-- <div class="my-4" v-if="page.body && page.body.length">
                <p v-for="line in page.body.split('\n')">{{ line }}</p>
            </div> -->
            <div class="ImageTabs my-4 order-1 order-lg-2" v-if="page.posts && page.posts.length">
                <div class="container">
                    <div class="row">
                        <div
                            :key="post.id"
                            @click.prevent="emitLoadEvent(`/${page.slug}/${post.slug}`)"
                            class="d-flex align-content-stretch flex-wrap col-12 col-lg-4"
                            role="button"
                            v-for="post in pagePosts"
                        >
                            <a class="ImageTabs--header" :href="`/${page.slug}/${post.slug}`" @click.prevent="emitLoadEvent(`/${page.slug}/${post.slug}`)">{{ post.title }}</a>
                            <responsive-image
                                :alt="post.title"
                                :ratio-x="826"
                                :ratio-y="551"
                                :src="post.images[0].path"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-runtime-template v-if="'body_suffix' in page && typeof page.body_suffix === 'string'" :template="wrapWithDiv(page.body_suffix)"/>
    </div>
</template>
<script>
    'use strict'
    import lineBreaksToBr from '~/js/functions/lineBreaksToBr'
    import VRuntimeTemplate from 'v-runtime-template'

    export default {
        components: {
            VRuntimeTemplate
        },
        model: {
            prop: 'page',
            event: 'change'
        },
        props: {
            page: Object
        },
        computed: {
            pageHeader() {
                return this.page.name ||
                    this.page.title ||
                        typeof this.page.category === 'object' 
                            && this.page.category.name 
                            || ''
            },
            pagePosts() {
                return this.page.posts.sort(
                    (a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0
                )
            }
        },
        methods: {
            lineBreaksToBr,
            startCase(name) {
                return _.startCase(name)
            },
            emitLoadEvent(path) {
                this.$store.dispatch('load', path)
            },
            wrapWithDiv(html) {
                return '<div>' + html + '</div>'
            },
        }
    }
</script>
