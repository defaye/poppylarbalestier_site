'use strict'

export default function (path) {
    this.$store.dispatch('load', path)
}