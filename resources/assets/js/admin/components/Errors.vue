<template>
    <div v-if="errors" class="form-group">
        <div v-if="'message' in errors">
            <div class="alert alert-danger" role="alert">
                <span v-html="errors.message"></span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true" @click="$emit('change', undefined)">&times;</span>
                </button>
            </div>
            <ul class="list-group" v-if="'errors' in errors">
                <li class="list-group-item" v-for="(lines, lineIndex) in errors.errors">
                    <div v-for="(error, errorIndex) in lines">
                        <span v-html="error"></span>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" @click="lines.length > 1 ? $delete(lines, errorIndex) : $delete(errors.errors, lineIndex)">&times;</span>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else-if="typeof errors === 'string'" class="alert alert-danger" role="alert">
            <span v-html="errors"></span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true" @click="$emit('change', undefined)">&times;</span>
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        model: {
            prop: "errors",
            event: "change",
        },
        props: {
            errors: Object,
            validator: value => {
                return "message" in value
            }
        }
    }
</script>
