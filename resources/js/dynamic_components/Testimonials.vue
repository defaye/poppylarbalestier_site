<template>
    <div class="container">
        <h1 v-if="page.name" v-html="page.name"/>
        <div v-if="testimonials && testimonials.length">
            <div class="row">
                <div 
                    :key="testimonial.id"
                    class="
                        col-12
                        col-lg-6
                        p-lg-5
                    "
                    v-for="(testimonial, index) in testimonials"
                >
                    <a 
                        :href="`/${page.slug}/${testimonial.slug}`"
                        @click.prevent="goToTestimonial(testimonial)"
                        class="PostsGallery--header d-block text-center"
                        v-html="testimonial.title.replace(/'s Testimonial$/i, '')"
                    />
                    <div v-if="testimonial.images.length" @click.prevent="goToTestimonial(testimonial)" role="button">
                        <img 
                            :alt="testimonial.title"
                            :src="testimonial.images[0].path"
                            class="w-100"
                        >
                        <!-- <responsive-image :src="testimonial.images[0].path" :alt="testimonial.title" :ratio-x="4" :ratio-y="3"></responsive-image> -->
                    </div>
                </div>
            </div>
            <b-button 
                @click="getTestimonialsDebounced"
                class="w-100 mt-3"
                v-if="testimonials.length % perPage === 0"
                variant="primary"
            >
                Show More
            </b-button>
        </div>
    </div>
</template>
<script>
    'use strict'
    import { BButton } from 'bootstrap-vue'

    import processIfNotProcessing from '~/js/functions/processIfNotProcessing'
    import processing from '~/js/computed/processing'

    // import Showdown from '~/js/mixins/Showdown'
    // import TruncateHTML from '~/js/mixins/TruncateHTML'


    export default {
        components: {
            BButton,
        },
        // mixins: [
            // Showdown,
            // TruncateHTML,
        // ],
        model: {
            prop: 'page',
            event: 'change'
        },
        props: {
            page: Object
        },
        data() {
            return {
                perPage: 32,
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
            // formatDate(date) {
            //     return moment(date).format('dddd, MMMM Do YYYY')
            // },
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
                                per_page: this.perPage
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
            // startCase(name) {
            //     return _.startCase(name)
            // },
            // isTruncated(a, b) {
            //     return this.truncate(a, 42, { byWords: true }).length !== b.length
            // },
            goToTestimonial(testimonial) {
                this.emitLoadEvent(`/${this.page.slug}/${testimonial.slug}`)
            }
        }
    }
</script>
