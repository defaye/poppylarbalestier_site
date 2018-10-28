<template>
    <div>
        <form method="POST" action="/admin/login" @submit.prevent="submit">

            <b-form-group
                horizontal
                :label-cols="4"
                breakpoint="lg"
                label="E-Mail Address"
                label-for="email"
            >
                <b-form-input
                    id="email"
                    type="email"
                    :disabled="processing"
                    :state="errors.has('email') ? false : null"
                    v-model.trim="form.email"
                    :required="true"
                    autofocus
                    tabindex="1"
                    :formatter="v => v ? v.toLowerCase() : v"
                >
                </b-form-input>
                <b-form-invalid-feedback v-if="errors.has('email')">
                    {{ errors.get('email').join(' ').trim() }}
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                horizontal
                :label-cols="4"
                breakpoint="lg"
                label="Password"
                label-for="password"
            >
                <b-form-input
                    type="password"
                    id="password"
                    :state="errors.has('password') ? false : null"
                    v-model="form.password"
                    :required="true"
                >
                </b-form-input>
                <b-form-invalid-feedback v-if="errors.has('password')">
                    {{ errors.get('password').join(' ').trim() }}
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                horizontal
                :label-cols="4"
                breakpoint="lg"
            >
                <b-form-checkbox id="remember"
                    v-model="form.remember"
                    :value="true"
                    :unchecked-value="false"
                >
                    Remember Me
                </b-form-checkbox>
            </b-form-group>

            <b-form-group
                horizontal
                :label-cols="4"
                breakpoint="lg"
            >
                <b-button variant="primary" type="submit">Login</b-button>

                <a class="btn btn-link" href="/admin/password/reset">
                    Forgot Your Password?
                </a>
            </b-form-group>

        </form>
    </div>
</template>
<script>
    'use strict'
    import bButton from 'bootstrap-vue/es/components/button/button'
    import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox'
    import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'
    import bFormInput from 'bootstrap-vue/es/components/form-input/form-input'
    import bFormInvalidFeedback from 'bootstrap-vue/es/components/form/form-invalid-feedback'
    import ErrorsAndProcessing from '../../mixins/ErrorsAndProcessing'

    export default {
        mixins: [
            ErrorsAndProcessing
        ],
        components: {
            bButton,
            bFormCheckbox,
            bFormGroup,
            bFormInput,
            bFormInvalidFeedback
        },
        data() {
            return {
                form: {
                    email: undefined,
                    password: undefined,
                    remember: false
                }
            }
        },
        methods: {
            submit() {
                if (this.processing) {
                    return
                }
                this.processing = true
                axios.post('/admin/login', this.form)
                    .then(response => {
                        window.location.href = '/admin'
                    })
                    .catch(error => {
                        this.errors = error.response.data
                        console.error(error.response.data)
                    })
                    .then(() => {
                        this.processing = false
                    })
            }
        }
    }
</script>
