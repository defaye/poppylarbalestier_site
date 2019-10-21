<template>
    <div>
        <h1>{{ page.id ? "Edit" : "New" }} page</h1>
        <errors v-model="errors"></errors>
        <div class="card">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: tab === 'main' }" href="#" @click.prevent="changeTabTo('main')">Main</a>
                    </li>
                    <li class="nav-item" v-if="page.id">
                        <a class="nav-link" :class="{ active: tab === 'images' }" href="#" @click.prevent="changeTabTo('images')">Images</a>
                    </li>
                    <li class="nav-item" v-if="page.id">
                        <a class="nav-link" :class="{ active: tab === 'posts' }" href="#" @click.prevent="changeTabTo('posts')">Posts</a>
                    </li>
                </ul>
            </div>
            <div class="card-body" v-if="tab === 'main'">
                <b-form-group
                    label="Title"
                    label-for="title"
                >
                    <b-form-input
                        id="title"
                        type="text"
                        :disabled="processing"
                        :state="errors.has('title') ? false : null"
                        v-model.trim="page.title"
                        :required="true"
                        autofocus
                        tabindex="1"
                        placeholder="Enter a title..."
                    >
                    </b-form-input>
                    <b-form-invalid-feedback v-if="errors.has('title')">
                        {{ errors.get('title').join(' ').trim() }}
                    </b-form-invalid-feedback>
                    <small class="form-text">This is the text that will appear in the title bar of the page only.</small>
                </b-form-group>
                <b-form-group
                    label="Name"
                    label-for="name"
                >
                    <b-form-input
                        id="name"
                        type="text"
                        :disabled="processing"
                        :state="errors.has('name') ? false : null"
                        v-model.trim="page.name"
                        :required="true"
                        tabindex="1"
                        placeholder="Enter a name..."
                    >
                    </b-form-input>
                    <b-form-invalid-feedback v-if="errors.has('name')">
                        {{ errors.get('name').join(' ').trim() }}
                    </b-form-invalid-feedback>
                    <small class="form-text">If the page name is used in the component template, it will be used.</small>
                </b-form-group>
                <b-form-group
                    label="Body Prefix"
                    label-for="body_prefix"
                >
                    <prism-editor
                        v-model="page.body_prefix"
                        :disabled="processing"
                        :line-numbers="true"
                        aria-describedby="Body Prefix"
                        class="mb-3"
                        id="body_prefix"
                        language="vue"
                        name="body_prefix"
                        required
                        tabindex="1"
                        v-autosize
                    />
                    <!-- <b-form-textarea
                        id="body_prefix"
                        :disabled="processing"
                        :state="errors.has('body_prefix') ? false : null"
                        v-model="page.body_prefix"
                        v-autosize
                        :required="true"
                        tabindex="1"
                    > -->
                    </b-form-textarea>
                    <small class="form-text">This section is intended for structured data (written in HTML).</small>
                    <b-form-invalid-feedback v-if="errors.has('body_prefix')">
                        {{ errors.get('body_prefix').join(' ').trim() }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    label="Body (Text)"
                    label-for="body"
                >
                    <b-form-textarea
                        id="body"
                        :disabled="processing"
                        :state="errors.has('body') ? false : null"
                        v-model="page.body"
                        v-autosize
                        :required="true"
                        tabindex="1"
                        rows="10"
                        placeholder="Write your page content..."
                    >
                    </b-form-textarea>
                    <b-form-invalid-feedback v-if="errors.has('body')">
                        {{ errors.get('body').join(' ').trim() }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    label="Body Suffix"
                    label-for="body_suffix"
                >
                    <prism-editor
                        v-model="page.body_suffix"
                        :disabled="processing"
                        :line-numbers="true"
                        aria-describedby="Body Suffix"
                        class="mb-3"
                        id="body_suffix"
                        language="vue"
                        name="body_suffix"
                        required
                        tabindex="1"
                        v-autosize
                    />
                    <!-- <b-form-textarea
                        id="body_suffix"
                        :disabled="processing"
                        :state="errors.has('body_suffix') ? false : null"
                        v-model="page.body_suffix"
                        v-autosize
                        :required="true"
                        tabindex="1"
                    > -->
                    </b-form-textarea>
                    <small class="form-text">This section is intended for structured data (written in HTML).</small>
                    <b-form-invalid-feedback v-if="errors.has('body_suffix')">
                        {{ errors.get('body_suffix').join(' ').trim() }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <div class="form-group" v-if="page.id">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="published" name="published" v-model="page.published" :disabled="processing">
                        <label class="custom-control-label" for="published">Published</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="component">Component</label>
                    <select name="component" id="component" v-model="page.component_id" class="form-control" :disabled="processing">
                        <option v-for="component in components" :value="component.id">{{ component.name }}</option>
                    </select>
                </div>
            </div>
            <div class="card-body" v-else-if="page.id && tab === 'images'">
                <div class="form-group" v-if="page.id">
                    <label for="images">Images</label>
                    <image-uploader :multiple="true" @change="assignImages(page, $event)" :url="`/api/admin/pages/${page.id}/images`" class="form-group"></image-uploader>
                    <div v-if="page.hasOwnProperty('images') && page.images.length" class="form-group">
                        <draggable v-model="page.images" class="row" element="div">
                            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-1" v-for="(image, index) in page.images">
                                <div class="card">
                                    <div class="card-header">
                                        <span>Delete</span>
                                        <button type="button" class="close" aria-label="Unstage image">
                                            <span aria-hidden="true" @click.prevent="deleteImage(page, image, index)">&times;</span>
                                        </button>
                                    </div>
                                    <div class="card-body">
                                        <div class="embed-responsive embed-responsive-4by3 rounded" @dblclick="download(image)">
                                            <div class="embed-responsive-item" :style="`background-image: url(${image.path}); background-position: center; background-size: cover; background-repeat: no-repeat;`" :name="image.name"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </draggable>
                    </div>
                    <!-- <image-handler :multiple="true" @change="handleChosenImages" :url="`/api/admin/pages/${page.id}/images`"></image-handler> -->
                </div>
            </div>
            <div class="card-body" v-else-if="page.id && tab === 'posts'">
                <page-posts v-model="page.posts"></page-posts>
            </div>
        </div>
        <div class="mt-3">
            <button type="submit" class="btn btn-primary w-100 form-group" @click="submit" :disabled="processing">
                <span v-if="page.id">Update</span>
                <span v-else>Create</span>
            </button>
        </div>
    </div>
</template>
<script>
    'use strict'
    import draggable from 'vuedraggable'
    import ManageImages from '~/js/admin/mixins/ManageImages.js'
    import Tabs from '~/js/admin/mixins/Tabs.js'

    import ErrorsAndProcessing from '~/js/mixins/ErrorsAndProcessing'
    import ProcessIfNotProcessing from '~/js/mixins/ProcessIfNotProcessing'

    import {
        // BButton,
        // BFormCheckbox,
        BFormGroup,
        BFormInput,
        BFormInvalidFeedback,
        BFormTextarea,
    } from 'bootstrap-vue'

    import 'prismjs'
    import 'prismjs/themes/prism.css'
    import PrismEditor from 'vue-prism-editor'
    import 'vue-prism-editor/dist/VuePrismEditor.css'

    export default {
        components: {
            // BButton,
            // BFormCheckbox,
            BFormGroup,
            BFormInput,
            BFormInvalidFeedback,
            BFormTextarea,
            draggable,
            PrismEditor,
        },
        mixins: [
            ErrorsAndProcessing,
            ManageImages,
            ProcessIfNotProcessing,
            Tabs
        ],
        data() {
            return {
                page: {
                    title: undefined,
                    name: undefined,
                    body_prefix: undefined,
                    body: undefined,
                    body_suffix: undefined,
                    published: undefined,
                    component_id: undefined,
                    images: [],
                    posts: []
                },
                components: []
            }
        },
        mounted() {
            window.onpopstate = event => {
                document.title = event.state.title
                this.page = event.state
            }
        },
        beforeMount() {
            axios.get('/api/admin/components').then(response => {
                if (response.data.length) {
                    this.components = response.data
                    this.page.component_id = this.components[0].id
                } else {
                    this.errors = { message: 'You need to create a component template before you create a page.' }
                }
            }).catch(e => {
                console.error(e)
                this.errors = e.response.data
            }).finally(() => {
                const url = new URL(window.location.href)
                const regex = /^\/admin\/pages\/(\d+)$/
                if (regex.test(url.pathname)) {
                    const matches = regex.exec(url.pathname)
                    this.retrievePage(matches[1])
                } else {
                    this.retrievePage()
                }
            })
        },
        methods: {
            retrievePage(id) {
                if (id) {
                    this.processIfNotProcessing(
                        axios.get(`/api/admin/pages/${id}`).then(response => {
                            console.log(response.data)
                            this.page = response.data
                            
                        }).catch(e => {
                            console.error(e)
                            this.errors = e.response.data
                        })
                    )
                }
            },
            submit() {
                const isUpdateMode = 'number' === typeof this.page.id
                this.processIfNotProcessing(
                    axios({
                        data: this.page,
                        method: isUpdateMode ? 'PATCH' : 'POST',
                        url: '/api/admin/pages' + (isUpdateMode ? ('/' + this.page.id) : ''),
                    }).then(response => {
                        this.$store.state.notifications = [{
                            type: 'success',
                            message: 'Page ' + (isUpdateMode ? 'updated' : 'created'),
                        }]
                        if (isUpdateMode) {
                            // this.page = response.data
                        } else {
                            this.page = response.data
                            window.history.pushState(
                                Object.assign(
                                    {}, 
                                    response.data
                                ), 
                                'Edit page', 
                                `/admin/pages/${response.data.id}`
                            )
                        }
                        this.errors.clear()
                    }).catch(e => {
                        console.error(e)
                        this.errors = e.response.data
                    })
                )
            },
            download(image) {
                window.open(image.path, '_blank')
            }
        }
    }
</script>
