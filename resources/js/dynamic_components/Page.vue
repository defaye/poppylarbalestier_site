<template>
    <div v-if="page" class="container">
        <h1 v-html="pageHeader"/>

        <div v-if="'images' in page && page.images.length">
            <carousel class="my-4"
                      v-if="page.images.length > 1"
                     :images="page.images"
                     :ratio-x="xRatio"
                     :ratio-y="yRatio"
                     :show-pagination="showPagination"
                     :auto-height="true"
            />
            <img
                :alt="page.name || page.title || false"
                :src="page.images[0].path"
                class="w-100"
                v-else
            >
            <!-- <responsive-image 
                :alt="page.name || page.title || false"
                :ratio-x="xRatio"
                :ratio-y="yRatio"
                :src="page.images[0].path"
                v-else
            /> -->
        </div>

        <v-runtime-template 
            :template="wrapWithDiv(page.body_prefix)"
            v-if="'body_prefix' in page && typeof page.body_prefix === 'string'" 
        />

        <div class="d-flex flex-column">

            <div 
                class="
                    my-4
                    order-2
                    order-lg-1
                "
                v-html="page.body"
                v-if="
                    'body' in page 
                    && 'string' === typeof page.body
                "
            />

            <posts-gallery
                :page="page"
                class="
                    my-4
                    order-1
                    order-lg-2
                "
                v-if="page.posts"
            />
        </div>

        <v-runtime-template 
            :template="wrapWithDiv(page.body_suffix)"
            v-if="'body_suffix' in page && typeof page.body_suffix === 'string'" 
        />
    </div>
</template>
<script>
    'use strict'
    import PostsGallery from '~/js/components/PostsGallery'
    import VRuntimeTemplate from 'v-runtime-template'

    import emitLoadEvent from '~/js/functions/emitLoadEvent'

    export default {
        components: {
            PostsGallery,
            VRuntimeTemplate,
        },
        model: {
            prop: 'page',
            event: 'change'
        },
        props: {
            page: Object
        },
        data() {
            return {
                showPagination: true,
                xRatio: 826,
                yRatio: 551,
            }
        },
        computed: {
            pageHeader() {
                return this.page.name ||
                    this.page.title ||
                        typeof this.page.category === 'object' 
                            && this.page.category.name 
                            || ''
            },
        },
        methods: {
            emitLoadEvent,
            startCase(name) {
                return _.startCase(name)
            },
            wrapWithDiv(html) {
                return '<div>' + html + '</div>'
            },
        }
    }
</script>
