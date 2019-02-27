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
                    <div class="my-4" v-if="t.body && t.body.length">
                        <p v-for="line in truncatedBody(t.body).split('\n')">{{ line }}</p>
                        <a v-if="truncatedBody(t.body).length !== t.body.length" :href="`/${page.slug}/${t.slug}`" @click.prevent="emitLoadEvent(`/${page.slug}/${t.slug}`)">
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

    export default {
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
            processing() {
                return this.$store.state.processing
            }
        },
        beforeMount() {
            this.getTestimonials()
        },
        methods: {
            truncatedBody(text) {
                return _.truncate(text, {
                  length: 512,
                  separator: /\n+/,
                  omission: ''
                })
            },
            formatDate(date) {
                return moment(date).format('dddd, MMMM Do YYYY')
            },
            startCase(name) {
                return _.startCase(name)
            },
            emitLoadEvent(path) {
                this.$store.dispatch('load', path)
            },
            getTestimonials() {
                if (typeof this.testimonialsResponse !== 'undefined' 
                    && this.testimonialsResponse.meta.has_more_pages === false
                    ) {
                    return
                }
                this.processing = true
                axios.get('api/categories', { params: {
                        with: ['images', 'tags'],
                        name: 'testimonial',
                        page: this.testimonialsResponse ? (this.testimonialsResponse.meta.current_page + 1) : 1,
                        per_page: 1
                    }
                }).then(response => {
                    this.testimonialsResponse = response.data
                    this.testimonials = this.testimonials.concat(response.data.data)
                }).catch(e => {
                    console.error(e.response.data)
                }).then(response => {
                    this.processing = false
                })
            },
            getTestimonialsDebounced: _.debounce(function () {
                this.getTestimonials()
            }, 100),
        }
    }
</script>
