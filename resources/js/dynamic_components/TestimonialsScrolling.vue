<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 v-if="page.name">{{ page.name }}</h1>
            </div>
        </div>
        <div v-if="testimonials && testimonials.length">
            <div v-for="(t, index) in testimonials" :key="t.id" class="row">
                <div class="col-12">
                    <h2>
                        <a :href="`/${page.slug}/${t.slug}`" @click.prevent="emitLoadEvent(`/${page.slug}/${t.slug}`)">{{ t.title }}</a><br>
                        <!-- <small>{{ formatDate(t.created_at) }}</small> -->
                    </h2>
                    <div v-if="t.images.length">
                        <img :src="t.images[0].path" :alt="t.title" class="w-100">
                        <!-- <responsive-image :src="t.images[0].path" :alt="t.title" :ratio-x="4" :ratio-y="3"></responsive-image> -->
                    </div>
                    
                    <div class="my-4" v-if="'body' in t && typeof t.body === 'string'">
                        <div v-html="converter.makeHtml(truncate(t.body, 42, { byWords: true }))"/>

                        <a 
                            :href="`/${page.slug}/${t.slug}`"
                            @click.prevent="emitLoadEvent(`/${page.slug}/${t.slug}`)"
                            v-if="truncate(t.body, 42, { byWords: true }).length !== t.body.length"
                        >
                            Read more...
                        </a>
                    </div>
                </div>
            </div>
            <mugen-scroll :handler="getTestimonialsDebounced" :should-handle="!processing" :threshold="0">
                <div :style="!processing ? 'display: none' : ''">
                    <font-awesome-icon class="w-100" icon="spinner" pulse></font-awesome-icon>
                </div>
            </mugen-scroll>
        </div>
    </div>
</template>
<script>
    'use strict'
    import MugenScroll from 'vue-mugen-scroll'

    import processIfNotProcessing from '~/js/functions/processIfNotProcessing'
    import processing from '~/js/computed/processing'

    import Showdown from '~/js/mixins/Showdown'
    import TruncateHTML from '~/js/mixins/TruncateHTML'


    export default {
        mixins: [
            Showdown,
            TruncateHTML,
        ],
        model: {
            prop: 'page',
            event: 'change'
        },
        props: {
            page: Object
        },
        data() {
            return {
                testimonials: [],
                testimonialsResponse: undefined
            }
        },
        computed: {
            processing,
        },
        beforeMount() {
            this.getTestimonials()
        },
        methods: {
            processIfNotProcessing,
            emitLoadEvent(path) {
                this.$store.dispatch('load', path)
            },
            formatDate(date) {
                return moment(date).format('dddd, MMMM Do YYYY')
            },
            getTestimonials() {
                if (typeof this.testimonialsResponse !== 'undefined'
                    && this.testimonialsResponse.meta.has_more_pages === false
                    ) {
                    return
                }
                this.processIfNotProcessing(
                    axios.get(
                        'api/categories',
                        {
                            params: {
                                with: [
                                    'images',
                                    'tags'
                                ],
                                name: 'testimonial',
                                page: this.testimonialsResponse ? (this.testimonialsResponse.meta.current_page + 1) : 1,
                                per_page: 1
                            }
                        }
                    ).then(response => {
                        this.testimonialsResponse = response.data
                        this.testimonials = this.testimonials.concat(response.data.data)
                    }).catch(e => {
                        console.error(e.response.data)
                    })
                )
            },
            getTestimonialsDebounced: _.debounce(function () {
                this.getTestimonials()
            }, 100),
            startCase(name) {
                return _.startCase(name)
            },
            isTruncated(a, b) {
                return this.truncate(a, 42, { byWords: true }).length !== b.length
            },
        }
    }
</script>
