'use strict'
export default {
    get() {
        return this.$store.getters.errors
    },
    set(errors) {
        this.$set(this.$store.commit('errors', errors))
    }
}
