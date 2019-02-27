'use strict'
export default {
    get() {
        return this.$store.state.processing === true
    },
    set(processing) {
        this.$store.state.processing = processing === true
    }
}
