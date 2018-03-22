<style lang="scss">
    .dragarea {
        min-height: 1rem;
    }
</style>
<template>
    <div>
        <errors v-model="errors"></errors>
        <div class="row mb-3">
            <div class="col mb-1">
                <div class="card">
                    <div class="card-header">
                        Navigation
                    </div>
                    <draggable v-model="enabled" class="list-group list-group-flush dragarea" element="ul" :options="{ group: 'navigation' }">
                        <li class="list-group-item" v-for="page in enabled">{{ page.name }}</li>
                    </draggable>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        Available Pages
                    </div>
                    <draggable v-model="disabled" class="list-group list-group-flush dragarea" element="ul" :options="{ group: 'navigation' }">
                        <li class="list-group-item" v-for="page in disabled">{{ page.name }}</li>
                    </draggable>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button class="btn btn-primary w-100" :disabled="processing" @click.prevent="submit">Update</button>
            </div>
        </div>
    </div>
</template>
<script>
    "use strict";
    import draggable from "vuedraggable";

    export default {
        components: {
            draggable,
        },
        data() {
            return {
                processing: false,
                errors: undefined,
                enabled: [],
                disabled: []
            }
        },
        async mounted() {
            try {
                this.processing = true;
                this.errors = undefined;
                const response = await axios.get("/api/admin/navigation");
                this.enabled = _.filter(response.data, item => item.id);
                this.disabled = _.filter(response.data, item => !item.id);
            } catch (e) {
                try {
                    console.error(e.response.data);
                    this.errors = e.response.data;
                } catch (e) {
                    console.error(e);
                }
            }
            this.processing = false;
        },
        methods: {
            async submit() {
                try {
                    this.processing = true;
                    this.errors = undefined;
                    const response = await axios.post("/api/admin/navigation", { items: this.enabled });
                    this.enabled = _.filter(response.data, item => item.id);
                    this.disabled = _.filter(response.data, item => !item.id);
                } catch (e) {
                    try {
                        console.error(e.response.data);
                        this.errors = e.response.data;
                    } catch (e) {
                        console.error(e);
                    }
                }
                this.processing = false;
            },
        }

    }
</script>
