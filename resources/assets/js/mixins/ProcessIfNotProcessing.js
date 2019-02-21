'use strict'
export default {
    methods: {
        processIfNotProcessing(promise) {
            if (this.processing) {
                return
            }
            this.processing = true
            return promise.finally(e => {
                this.processing = false
            })
        }
    }
}
