<template>
    <div>
        <h1>{{ component.id ? "Edit" : "New" }} component</h1>
        <errors v-model="errors"></errors>
        <div>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" v-model="component.name" class="form-control" placeholder="Enter a name..." :disabled="processing">
            </div>

            <prism-editor
                :code="component.body"
                :disabled="processing"
                :line-numbers="true"
                aria-describedby="Body"
                class="mb-3"
                id="body"
                language="vue"
                name="body"
            >
            </prism-editor>
            <button type="submit" class="btn btn-primary w-100 form-group" @click="submit" :disabled="processing">
                <span v-if="component.id">Update</span>
                <span v-else>Create</span>
            </button>
        </div>
    </div>
</template>
<script>
    'use strict'
    import ErrorsAndProcessing from '../../mixins/ErrorsAndProcessing'
    import 'prismjs'
    import 'prismjs/themes/prism.css'
    import PrismEditor from 'vue-prism-editor'
    import 'vue-prism-editor/dist/VuePrismEditor.css'

    export default {
        components: {
            PrismEditor
        },
        mixins: [
            ErrorsAndProcessing
        ],
        data() {
            return {
                component: {
                    name: undefined,
                    body: undefined,
                },
            }
        },
        mounted() {
            window.onpopstate = event => {
                document.title = event.state.title
                this.component = event.state
            }
            const url = new URL(window.location.href)
            const regex = /^\/admin\/components\/(\d+)$/
            if (regex.test(url.pathname)) {
                const matches = regex.exec(url.pathname)
                this.retrieveComponent(matches[1])
            } else {
                this.retrieveComponent()
            }
        },
        methods: {
            async retrieveComponent(id) {
                try {
                    if (id) {
                        this.processing = true
                        const response = await axios.get(`/api/admin/components/${id}`)
                        console.log(response.data)
                        this.component = response.data
                    }
                } catch (e) {
                    try {
                        console.error(e.response.data)
                        this.errors = e.response.data
                    } catch (e) {
                        console.error(e)
                    }
                }
                this.processing = false
            },
            async submit() {
                try {
                    this.processing = true
                    if (this.component.id) {
                        const response = await axios.patch(`/api/admin/components/${this.component.id}`, this.component)
                        this.component = response.data
                        this.$store.state.notifications = [{
                            type: 'success',
                            message: 'Component updated'
                        }]
                    } else {
                        const response = await axios.post('/api/admin/components', this.component)
                        window.history.pushState(Object.assign({}, response.data), 'Edit component', `/admin/components/${response.data.id}`)
                        this.component = response.data
                        this.$store.state.notifications = [{
                            type: 'success',
                            message: 'Component created'
                        }]
                    }
                    this.errors.clear()
                } catch (e) {
                    try {
                        console.error(e.response.data)
                        this.errors = e.response.data
                    } catch (e) {
                        console.error(e)
                    }
                }
                this.processing = false
            },
        }

    }
</script>
