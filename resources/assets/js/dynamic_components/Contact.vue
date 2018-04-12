<template>
    <div v-if="page" class="container">
        <h1 v-if="page.name">{{ startCase(page.name) }}</h1>
        <div class="row my-4">
            <div class="col-12 col-lg-3">
                <div><a href="https://www.facebook.com/pages/***REMOVED***-***REMOVED***-***REMOVED***/261844107286000" target="_blank">Like me on Facebook</a></div>
                <div><a href="https://twitter.com/poppyplp" target="_blank">Follow me on Twitter</a></div>
                <hr>
                <div><strong>Phone:</strong> <a href="tel:00447700832331">+44 (0) 7700 832 331</a></div>
                <div>Or <strong><a href="mailto:***REMOVED***">Email Me</a></strong></div>
            </div>
            <div class="col-12 col-lg-9">
                <div class="my-4">
                    <form @submit.prevent="$el('#recaptcha-button').click()" novalidate>
                        <div class="form-group">
                            <input type="text"
                                :class="{ 'is-invalid': getErrors('name') }"
                                aria-label="Name"
                                class="form-control"
                                id="name"
                                name="name"
                                placeholder="Name"
                                required
                                v-model.trim="form.name"
                                >
                            <div v-if="getErrors('name')" class="invalid-feedback">
                                <div v-for="error in getErrors('name')" v-html="error"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="email"
                                :class="{ 'is-invalid': getErrors('email') }"
                                aria-label="E-mail address"
                                class="form-control"
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                required
                                v-model.trim="form.email"
                                >
                            <div v-if="getErrors('email')" class="invalid-feedback">
                                <div v-for="error in getErrors('email')" v-html="error"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="text"
                                :class="{ 'is-invalid': getErrors('phone') }"
                                aria-label="Phone number"
                                class="form-control"
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                                required
                                v-model.trim="form.phone"
                                >
                            <div v-if="getErrors('phone')" class="invalid-feedback">
                                <div v-for="error in getErrors('phone')" v-html="error"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <textarea type="text"
                                :class="{ 'is-invalid': getErrors('message') }"
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
                            <div v-if="getErrors('message')" class="invalid-feedback">
                                <div v-for="error in getErrors('message')" v-html="error"></div>
                            </div>
                        </div>
                        <g-recaptcha
                            id="recaptcha-button"
                            :data-btn-class="'btn w-100 ' + (processing ? 'btn-warning' : 'btn-primary')"
                            :data-btn-disabled="processing"
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
    "use strict";
    import gRecaptcha from "@finpo/vue2-recaptcha-invisible";
    export default {
        components: {
            "g-recaptcha": gRecaptcha
        },
        model: {
            prop: "page",
            event: "change"
        },
        data() {
            return {
                errors: undefined,
                form: {
                    name: undefined,
                    email: undefined,
                    phone: undefined,
                    message: undefined,
                    recaptcha: undefined
                },
                processing: false
            }
        },
        props: {
            page: Object
        },
        methods: {
            startCase(name) {
                return _.startCase(name)
            },
            getErrors(attribute) {
                if (this.errors) {
                    if (this.errors.hasOwnProperty(attribute)) {
                        return this.errors[attribute].length && this.errors[attribute];
                    }
                }
                return undefined;
            },
            emitLoadEvent(path) {
                this.$store.dispatch('load', path);
            },
            validateForm() {
                return true;
            },
            onRecaptchaVerified(response) {
                this.form.recaptcha = response;
                this.submit();
            },
            async submit() {
                try {
                    this.processing = true;
                    this.errors = undefined;
                    const response = await axios.post("/api/contact", this.form);
                    this.$store.commit("status", {
                        type: "success",
                        message: "Thank you, your message has been sent. Please check your e-mail to verify your message."
                    });
                } catch (e) {
                    try {
                        console.error(e.response.data);
                        this.errors = e.response.data;
                    } catch (e) {
                        console.error(e);
                    }
                }
                this.processing = false;
            }
        }
    }
</script>
