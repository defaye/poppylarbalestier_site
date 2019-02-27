'use strict'

const parseErrors = function (state, errors) {
    for (var property in errors) {
        if (!Array.isArray(errors[property])) {
            throw console.warn('PROPERTY: ' + property, errors[property], 'ERROR ASSIGNMENT FAILURE: ERROR IS NOT IN ARRAY FORMAT')
        }

        for (let error in errors[property]) {
            if (typeof error !== 'string') {
                throw console.warn('ITERABLE: ', d, 'ERROR ASSIGNMENT FAILURE: ERROR ITERABLE IS NOT IN STRING FORMAT')
            }
        }
    }
    state.errors = errors
    if (Object.values(errors).length === 1) {
        state.notifications = [{
            message: Object.values(errors)[0][0],
            type: 'danger',
            callback() {
                state.errors = {}
            }
        }]
    }
}

export default {
    state: {
        errors: {},
        processing: false,
        notifications: [],
    },
    getters: {
        errors(state) {
            return {
                hasAny() {
                    return typeof state.errors === 'object' && Object.keys(state.errors).length > 0
                },
                set(property, error) {
                    Vue.set(state.errors, property, [error])
                },
                append(property, error) {
                    this.has(property) ? Vue.set(state.errors, property, state.errors[property].concat([error]))
                        : this.set(property, error)
                },
                all() {
                    return this.hasAny() ? Object.keys(state.errors).map(error => {
                        return state.errors[error]
                    }) : []
                },
                has(error) {
                    return this.hasAny() && state.errors.hasOwnProperty(error)
                },
                get(error) {
                    return this.has(error) ? state.errors[error] : undefined
                },
                first(error) {
                    return this.has(error) ? this.get(error)[0] : undefined
                },
                clear(property) {
                    property ? Vue.delete(state.errors, property) : state.errors = {}
                }
            }
        }
    },
    mutations: {
        errors(state, errors) {
            if (typeof errors === 'object' && errors.hasOwnProperty('message') &&  typeof errors.message === 'string') {
                state.notifications = [{
                    message: errors.message,
                    type: 'danger',
                    callback() {
                        state.errors = {}
                    }
                }]
            }

            if (errors.hasOwnProperty('errors') && typeof errors.errors === 'object') {
                parseErrors(state, errors.errors)
            } else if (Object.values(errors).length > 0) {
                parseErrors(state, errors.errors)
            }
        }
    }
}
