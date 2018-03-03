<template>
    <div>
        <div v-if="'message' in errors" class="alert alert-danger" role="alert">
            <span v-html="errors.message"></span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true" @click="$emit('change', undefined)">&times;</span>
            </button>
        </div>
        <!-- <ul class="list-group" v-if="'errors' in errors">
            <li class="list-group-item" v-for="(group, list) in errors.errors">
                <p v-for="e in list" v-html="e"></p>
            </li>
        </ul> -->

    </div>
</template>
<script>
    export default {
        model: {
            prop: "errors",
        },
        props: {
            errors: Object,
            validator: value => {
                return "message" in value;
            }
        },
        data() {
            return {
                //
            }
        },
        methods: {

        },
        mounted() {

        }
    }
</script>
