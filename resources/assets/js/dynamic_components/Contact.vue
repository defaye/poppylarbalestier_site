<template>
    <div v-if="page" class="container">
        <h1 v-if="page.name">{{ startCase(page.name) }}</h1>
        <div class="row my-4">
            <div class="col-12">
                <div class="my-4">
                    <form @submit.prevent="$el('#recaptcha-button').click()" novalidate>
                        <div class="form-group">
                            <input type="text"
                                :class="{ 'is-invalid': errors.get('name') }"
                                aria-label="Name"
                                class="form-control"
                                id="name"
                                name="name"
                                placeholder="Name"
                                required
                                v-model.trim="form.name"
                                autofocus
                                >
                            <div v-if="errors.has('name')" class="invalid-feedback">
                                <div v-for="error in errors.get('name')" v-html="error"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="email"
                                :class="{ 'is-invalid': errors.get('email') }"
                                aria-label="E-mail address"
                                class="form-control"
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                required
                                v-model.trim="form.email"
                                >
                            <div v-if="errors.has('email')" class="invalid-feedback">
                                <div v-for="error in errors.get('email')" v-html="error"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="text"
                                :class="{ 'is-invalid': errors.get('phone') }"
                                aria-label="Phone number"
                                class="form-control"
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                                required
                                v-model.trim="form.phone"
                                >
                            <div v-if="errors.has('phone')" class="invalid-feedback">
                                <div v-for="error in errors.get('phone')" v-html="error"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <textarea type="text"
                                :class="{ 'is-invalid': errors.get('message') }"
                                aria-label="Message"
                                class="form-control"
                                id="message"
                                name="message"
                                placeholder="Your message"
                                required
                                rows="3"
                                v-autosize
                                v-model.trim="form.message"
                                ></textarea>
                            <div v-if="errors.has('message')" class="invalid-feedback">
                                <div v-for="error in errors.get('message')" v-html="error"></div>
                            </div>
                        </div>
                        <g-recaptcha
                            id="recaptcha-button"
                            :data-btn-class="'btn w-100 ' + (processing ? 'btn-warning' : 'btn-primary')"
                            :data-btn-disabled="!isFormFilled || processing"
                            :data-validate="validateForm"
                            :data-callback="onRecaptchaVerified"
                            :style="processing ? 'cursor: pointer;' : ''"
                            data-badge="bottomright"
                            data-sitekey="6Lc-6VIUAAAAAHarE4TNLZV9P8t3LIWqdzdWrDkt"
                            >
                            Send
                        </g-recaptcha>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    'use strict'
    import gRecaptcha from '@finpo/vue2-recaptcha-invisible'
    import ErrorsAndProcessing from '../mixins/ErrorsAndProcessing'

    export default {
        mixins: [
            ErrorsAndProcessing
        ],
        components: {
            gRecaptcha
        },
        model: {
            prop: 'page',
            event: 'change'
        },
        data() {
            return {
                form: {
                    name: undefined,
                    email: undefined,
                    phone: undefined,
                    message: undefined,
                    recaptcha: undefined
                }
            }
        },
        props: {
            page: Object
        },
        computed: {
            isFormFilled() {
                return this.form.name && this.form.email && this.form.phone && this.form.message
            }
        },
        methods: {
            reset() {
                this.errors.clear()
                this.form = {
                    name: undefined,
                    email: undefined,
                    phone: undefined,
                    message: undefined,
                    recaptcha: undefined
                },
                this.processing = false
            },
            startCase(name) {
                return _.startCase(name)
            },
            emitLoadEvent(path) {
                this.$store.dispatch('load', path)
            },
            validateForm: () => true,
            onRecaptchaVerified(response) {
                this.form.recaptcha = response
                this.submit()
            },
            submit() {
                if (this.processing) {
                    return
                }
                this.processing = true
                this.errors.clear()
                axios.post('/api/contact', this.form).then(response => {
                    this.$store.state.notifications = [{
                        type: 'success',
                        message: 'Thank you, your message has been sent!'
                    }]
                    this.reset()
                })
                .catch(error => {
                    this.errors = error.response.data
                })
                .then(() => {
                    this.processing = false
                })
            }
        }
    }
</script>
