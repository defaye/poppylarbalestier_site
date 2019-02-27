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
        <div 
            class="my-4"
            v-if="'body' in page && typeof page.body === 'string'"
            v-html="lineBreaksToBr(page.body)"
        >
            <p v-for="line in page.body.split('\n')">{{ line }}</p>
        </div>
        <!-- <div class="my-4" v-if="page.body && page.body.length">
            <p v-for="line in page.body.split('\n')">{{ line }}</p>
        </div> -->
        <div class="ImageTabs my-4" v-if="page.posts && page.posts.length">
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
</template>
<script>
    'use strict'
    import lineBreaksToBr from '~/js/functions/lineBreaksToBr'

    export default {
        model: {
            prop: 'page',
            event: 'change'
        },
        props: {
            page: Object
        },
        computed: {
            pageHeader() {
                if (this.page.name) {
                    return this.page.name
                } else if (
                    'category' in this.page && this.page.category && 'title' in this.page && this.page.title) {
                    return this.page.title
                }
            }
        },
        methods: {
            lineBreaksToBr,
            startCase(name) {
                return _.startCase(name)
            },
            emitLoadEvent(path) {
                this.$store.dispatch('load', path)
            }
        },
        computed: {
            pagePosts() {
                return this.page.posts.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0)
            }
        }
    }
</script>
