<template>
    <div>
        <h1>{{ post.id ? "Edit" : "New" }} post</h1>
        <errors v-model="errors"></errors>
        <div class="card">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: tab === 'main' }" href="#" @click.prevent="changeTabTo('main')">Main</a>
                    </li>
                    <li class="nav-item" v-if="post.id">
                        <a class="nav-link" :class="{ active: tab === 'images' }" href="#" @click.prevent="changeTabTo('images')">Images</a>
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
                        v-model.trim="post.title"
                        :required="true"
                        autofocus
                        tabindex="1"
                        placeholder="Enter a title..."
                    >
                    </b-form-input>
                    <b-form-invalid-feedback v-if="errors.has('title')">
                        {{ errors.get('title').join(' ').trim() }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    label="Body"
                    label-for="body"
                >
                    <b-form-textarea
                        id="body"
                        :disabled="processing"
                        :state="errors.has('body') ? false : null"
                        v-model="post.body"
                        v-autosize
                        :required="true"
                        autofocus
                        tabindex="1"
                        placeholder="Write your post content..."
                    >
                    </b-form-textarea>
                    <b-form-invalid-feedback v-if="errors.has('body')">
                        {{ errors.get('body').join(' ').trim() }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                    label="Category"
                    label-for="category"
                >
                    <b-form-input
                        :disabled="processing"
                        :max="255"
                        :required="true"
                        :state="errors.has('category') ? false : null"
                        autofocus
                        id="category"
                        placeholder="Enter a category name..."
                        tabindex="1"
                        type="text"
                        v-model.trim="post.category.name"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback v-if="errors.has('category')">
                        {{ errors.get('category').join(' ').trim() }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <div class="form-group" v-if="post.id">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="published" name="published" v-model="post.published" :disabled="processing">
                        <label class="custom-control-label" for="published">Published</label>
                    </div>
                </div>
            </div>
            <div class="card-body" v-else-if="post.id && tab === 'images'">
                <div class="form-group">
                    <label for="images">Images</label>
                    <image-uploader :multiple="true" @change="assignImages(post, $event)" :url="`/api/admin/posts/${post.id}/images`" class="form-group"></image-uploader>
                    <div v-if="post.hasOwnProperty('images') && post.images.length" class="form-group">
                        <draggable v-model="post.images" class="row" element="div">
                            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-1" v-for="(image, index) in post.images">
                                <div class="card">
                                    <div class="card-header">
                                        <span>Delete</span>
                                        <button type="button" class="close" aria-label="Unstage image">
                                            <span aria-hidden="true" @click.prevent="deleteImage(post, image, index)">&times;</span>
                                        </button>
                                    </div>
                                    <div class="card-body">
                                        <div class="embed-responsive embed-responsive-4by3 rounded" @dblclick="download(image)">
                                            <div class="embed-responsive-item" :style="`background-image: url(${image.path}); background-position: center; background-size: cover; background-repeat: no-repeat;`" :title="image.name"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </draggable>
                    </div>
                    <!-- <image-handler :multiple="true" @change="handleChosenImages" :url="`/api/admin/posts/${post.id}/images`"></image-handler> -->
                </div>
            </div>
        </div>
        <div class="mt-3">
            <button type="submit" class="btn btn-primary w-100 form-group" @click="submit" :disabled="processing">
                <span v-if="post.id">Update</span>
                <span v-else>Create</span>
            </button>
        </div>
    </div>
</template>
<script>
    "use strict"
    import draggable from "vuedraggable"
    // import autosize from "autosize"
    import ManageImages from "../mixins/ManageImages.js"
    import Tabs from "../mixins/Tabs.js"

    import ErrorsAndProcessing from '../../mixins/ErrorsAndProcessing'
    import ProcessIfNotProcessing from '../../mixins/ProcessIfNotProcessing'

    // import bButton from 'bootstrap-vue/es/components/button/button'
    // import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox'
    import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'
    import bFormInput from 'bootstrap-vue/es/components/form-input/form-input'
    import bFormInvalidFeedback from 'bootstrap-vue/es/components/form/form-invalid-feedback'
    import bFormTextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea'

    export default {
        components: {
            // bButton,
            // bFormCheckbox,
            bFormGroup,
            bFormInput,
            bFormInvalidFeedback,
            bFormTextarea,
            draggable
        },
        mixins: [
            ErrorsAndProcessing,
            ProcessIfNotProcessing,
            ManageImages,
            Tabs
        ],
        data() {
            return {
                post: {
                    title: undefined,
                    body: undefined,
                    category: {
                        name: undefined,
                        description: undefined
                    },
                    published: undefined,
                    images: []
                },
                categories: undefined,
            }
        },
        mounted() {
            window.onpopstate = event => {
                document.title = event.state.title
                this.post = event.state
            }
            const url = new URL(window.location.href)
            const regex = /^\/admin\/posts\/(\d+)$/
            if (regex.test(url.pathname)) {
                const matches = regex.exec(url.pathname)
                this.retrievePost(matches[1])
            } else {
                this.retrievePost()
            }
            // this.retrieveCategories()
        },
        methods: {
            retrievePost(id) {
                if (id) {
                    this.processIfNotProcessing(
                        axios.get(`/api/admin/posts/${id}`).then(response => {
                            console.log(response.data)
                            this.post = response.data
                        }).catch(e => {
                            console.error(e.response.data)
                            this.errors = e.response.data
                        })
                    )
                }
            },
            /**
             * READ ME: THIS IS NOT CURRENTLY IMPLEMENTED. A DROPDOWN IS REQUIRED WITH NEW INPUT SUPPORT AS WELL.
             */
            retrieveCategories() {
                this.processIfNotProcessing(
                    axios.get("/api/admin/categories").then(response => {
                        this.categories = response.data
                    }).catch(e => {
                        console.error(e.response.data)
                        this.errors = e.response.data
                    })
                )
            },
            submit() {
                this.processIfNotProcessing(
                    axios({
                        method: this.post.id ? 'PATCH' : 'POST',
                        url: '/api/admin/posts' + (this.post.id ? `/${this.post.id}` : ''),
                        data: this.post
                    }).then(response => {
                        if (this.post.id) {
                            // this.post = response.data
                        } else {
                            window.history.pushState(response.data, 'Edit post', `/admin/posts/${response.data.id}`)
                            this.post = response.data
                        }
                        this.$store.state.notifications = [{
                            type: 'success',
                            message: 'Post ' + (this.post.id ? 'updated' : 'created')
                        }]
                        this.errors.clear()
                    }).catch(e => {
                        console.error(e.response.data)
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
