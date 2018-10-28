'use strict'

export default {
    computed: {
        errors: {
            get() {
                return this.$store.getters.errors
            },
            set(errors) {
                this.$store.commit('errors', errors)
            }
        },
        processing: {
            get() {
                return this.$store.state.processing === true
            },
            set(processing) {
                this.$store.state.processing = processing === true
            }
        }
    },
}
