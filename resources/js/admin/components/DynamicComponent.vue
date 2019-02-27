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
    import ErrorsAndProcessing from '~/js/mixins/ErrorsAndProcessing'
    import ProcessIfNotProcessing from '~/js/mixins/ProcessIfNotProcessing'
    import 'prismjs'
    import 'prismjs/themes/prism.css'
    import PrismEditor from 'vue-prism-editor'
    import 'vue-prism-editor/dist/VuePrismEditor.css'

    export default {
        components: {
            PrismEditor
        },
        mixins: [
            ErrorsAndProcessing,
            ProcessIfNotProcessing
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
            retrieveComponent(id) {
                if (id) {
                    this.processIfNotProcessing(
                        axios.get(`/api/admin/components/${id}`).then(response => {
                            console.log(response.data)
                            this.component = response.data
                        }).catch(e => {
                            console.error(e)
                            this.errors = e.response.data
                        })
                    )
                }
            },
            submit() {
                this.processIfNotProcessing(
                    axios({
                        method: this.component.id ? 'PATCH' : 'POST',
                        url: `/api/admin/components` + (this.component.id ? `/${this.component.id}` : ''),
                        data: this.component
                    }).then(response => {
                        if (this.component.id) {
                            window.history.pushState(
                                response.data, 
                                'Edit component', 
                                `/admin/components/${response.data.id}`
                            )
                        }
                        this.component = response.data
                        this.$store.state.notifications = [{
                            type: 'success',
                            message: `Component ${this.component.id ? 'updated' : 'created'}`
                        }]
                        this.errors.clear()
                    }).catch(e => {
                        console.error(e)
                        this.errors = e.response.data
                    })
                )
            }
        }

    }
</script>
