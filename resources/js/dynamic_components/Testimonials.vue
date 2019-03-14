<template>
    <div class="container">
        <h1 v-if="page.name" v-html="page.name"/>
        <div v-if="testimonials && testimonials.length">
            <div class="row">
                <div :key="t.id" class="col-12 col-xl-6 p-5" v-for="(t, index) in testimonials">
                    <div v-if="t.images.length" @click.prevent="emitLoadEvent(`/${page.slug}/${t.slug}`)" role="button">
                        <img 
                            :alt="t.title"
                            :src="t.images[0].path"
                            class="Frame w-100"
                        >
                        <!-- <responsive-image :src="t.images[0].path" :alt="t.title" :ratio-x="4" :ratio-y="3"></responsive-image> -->
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
    import BButton from 'bootstrap-vue/es/components/button/button'

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
        }
    }
</script>
