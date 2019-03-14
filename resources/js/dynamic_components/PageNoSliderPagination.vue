<template>
    <div v-if="page" class="container">
        <h1 v-if="page.name">{{ page.name }}</h1>
        <h1 v-else-if="page.hasOwnProperty('category') && page.title">{{ page.title }}</h1>
        <div v-if="page.images && page.images.length">
            <carousel
                :images="page.images"
                :ratio-x="xRatio"
                :ratio-y="yRatio"
                :show-pagination="showPagination"
                class="my-4"
                v-if="page.images.length > 1"
            />
            <responsive-image
                :alt="page.name || page.title || false"
                :ratio-x="xRatio"
                :ratio-y="yRatio"
                :src="page.images[0].path"
                v-else
            />
        </div>

        <div class="my-4" v-if="'body' in page && typeof page.body === 'string'" v-html="page.body"/>

        <posts-gallery
            :page="page"
            class="
                my-4
            "
            v-if="page.posts"
        />
    </div>
</template>
<script>
    'use strict'
    import PostsGallery from '~/js/components/PostsGallery'
    import emitLoadEvent from '~/js/functions/emitLoadEvent'

    export default {
        components: {
            PostsGallery,
        },
        model: {
            prop: 'page',
            event: 'change'
        },
        data() {
            return {
                showPagination: false,
                xRatio: 826,
                yRatio: 551,
            }
        },
        props: {
            page: Object
        },
        methods: {
            emitLoadEvent,
            startCase(name) {
                return _.startCase(name)
            },
        }
    }
</script>
