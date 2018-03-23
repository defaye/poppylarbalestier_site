<template>
    <div v-if="status" class="form-group">
        <div class="alert" :class="status.hasOwnProperty('type') ? `alert-${status.type}` : 'alert-info'" role="alert">
            <span v-html="status.message"></span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true" @click="$store.commit('status', undefined)">&times;</span>
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            status() {
                return this.$store.state.status
            }
        }
    }
</script>
