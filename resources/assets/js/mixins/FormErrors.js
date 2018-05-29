"use strict"
export default {
    computed: {
        errors() {
            const errors = this.formErrors;
            return (function () {
                return {
                    errors: typeof errors !== "undefined" && errors,
                    message: errors && errors.hasOwnProperty("message") && errors.message,
                    has(error) {
                        return errors && errors.hasOwnProperty("errors") && errors.errors.hasOwnProperty(error)
                    },
                    get(error) {
                        return this.has(error) && errors.errors[error]
                    },
                    first(error) {
                        return this.has(error) && this.get(error)[0]
                    },
                    isEmpty() {
                        return errors !== "undefined"
                    }
                }
            })()
        }
    }
}
