<template>
    <transition
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutUp"
    >
        <div
            v-if="status && status.message"
            class="fixed-top p-5 w-100 alert text-center"
            :class="status.type && `alert-${status.type}` || 'alert-info'"
            role="alert"
            @click.prevent="$store.commit('status', undefined)"
        >
            {{ status.message }}
        </div>
    </transition>
</template>
<script>
    'use strict'
    export default {
        mounted() {
            window.addEventListener('keyup', this.onKeyup)
        },
        computed: {
            status() {
                return this.$store.state.status
            }
        },
        methods: {
            onKeyup(e) {
                if (e.keyCode && e.keyCode === 27) { // escape
                    this.$store.commit('status', undefined)
                }
            }
        },
        beforeDestroy() {
            window.removeEventListener('keyup', this.onKeyup)
        }
    }
</script>
