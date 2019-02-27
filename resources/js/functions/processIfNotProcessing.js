'use strict'
export default function (promise) {
    if (this.processing) {
        return
    }
    this.processing = true
    return promise.finally(e => {
        this.processing = false
    })
}
