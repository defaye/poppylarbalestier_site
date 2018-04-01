<template>
    <div>
        <h1>{{ component.id ? "Edit" : "New" }} component</h1>
        <alert></alert>
        <errors v-model="errors"></errors>
        <div>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" v-model="component.name" class="form-control" placeholder="Enter a name..." :disabled="processing">
            </div>
            <div class="form-group">
                <label for="body">Body</label>
                <textarea v-autosize class="form-control" name="body" id="body" aria-describedby="Body" placeholder="Write your component..." v-model="component.body" :disabled="processing"></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100 form-group" @click="submit" :disabled="processing">
                <span v-if="component.id">Update</span>
                <span v-else>Create</span>
            </button>
        </div>
    </div>
</template>
<script>
    "use strict";
    export default {
        data() {
            return {
                processing: false,
                errors: undefined,
                component: {
                    name: undefined,
                    body: undefined,
                },
            }
        },
        mounted() {
            window.onpopstate = event => {
                document.title = event.state.title;
                this.component = event.state;
            };
            const url = new URL(window.location.href);
            const regex = /^\/admin\/components\/(\d+)$/;
            if (regex.test(url.pathname)) {
                const matches = regex.exec(url.pathname);
                this.retrieveComponent(matches[1]);
            } else {
                this.retrieveComponent();
            }
        },
        methods: {
            async retrieveComponent(id) {
                try {
                    if (id) {
                        this.processing = true;
                        const response = await axios.get(`/api/admin/components/${id}`);
                        console.log(response.data);
                        this.component = response.data;
                    }
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
            async submit() {
                try {
                    this.processing = true;
                    if (this.component.id) {
                        const response = await axios.patch(`/api/admin/components/${this.component.id}`, this.component);
                        this.component = response.data;
                        this.$store.commit("status", {
                            type: "success",
                            message: "Component updated"
                        });
                    } else {
                        const response = await axios.post("/api/admin/components", this.component);
                        window.history.pushState(Object.assign({}, response.data), "Edit component", `/admin/components/${response.data.id}`);
                        this.component = response.data;
                        this.$store.commit("status", {
                            type: "success",
                            message: "Component created"
                        });
                    }
                    this.errors = undefined;
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
