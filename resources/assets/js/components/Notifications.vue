<template>
    <transition
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutUp"
    >
        <div
            v-if="notifications && 0 in notifications && notifications[0].message"
            class="fixed-top p-5 w-100 alert text-center"
            :class="notifications[0].type && `alert-${notifications[0].type}` || 'alert-info'"
            role="alert"
            @click.prevent="$delete(notifications, 0)"
        >
            {{ notifications[0].message }}
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
            notifications: {
                get() {
                    return this.$store.state.notifications
                },
                set(notifications) {
                    this.$store.state.notifications = notifications
                }
            }
        },
        methods: {
            onKeyup(e) {
                if (e.keyCode && e.keyCode === 27) { // escape
                    this.$delete(this.notifications, 0)
                }
            }
        },
        beforeDestroy() {
            window.removeEventListener('keyup', this.onKeyup)
        }
    }
</script>
