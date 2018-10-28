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
                        autofocus
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
                    label="Body"
                    label-for="body"
                >
                    <b-form-textarea
                        id="body"
                        :disabled="processing"
                        :state="errors.has('body') ? false : null"
                        v-model="page.body"
                        v-autosize
                        :required="true"
                        autofocus
                        tabindex="1"
                        placeholder="Write your page content..."
                    >
                    </b-form-textarea>
                    <b-form-invalid-feedback v-if="errors.has('body')">
                        {{ errors.get('body').join(' ').trim() }}
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
                                        <div class="embed-responsive embed-responsive-4by3 rounded">
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
    "use strict"
    import draggable from "vuedraggable"
    import ManageImages from "../mixins/ManageImages.js"
    import Tabs from "../mixins/Tabs.js"

    import ErrorsAndProcessing from '../../mixins/ErrorsAndProcessing'

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
            ManageImages,
            Tabs
        ],
        data() {
            return {
                page: {
                    title: undefined,
                    name: undefined,
                    body: undefined,
                    published: undefined,
                    component_id: undefined,
                    images: [],
                    posts: []
                },
                components: []
            }
        },
        async mounted() {
            window.onpopstate = event => {
                document.title = event.state.title
                this.page = event.state
            }
            try {
                const response = await axios.get("/api/admin/components")
                if (response.data.length) {
                    this.components = response.data
                    this.page.component_id = this.components[0].id
                } else {
                    this.errors = { message: "You need to create a component template before you create a page." }
                }
            } catch (e) {
                try {
                    console.error(e.response.data)
                    this.errors = e.response.data
                } catch (e) {
                    console.error(e)
                }
            }
            const url = new URL(window.location.href)
            const regex = /^\/admin\/pages\/(\d+)$/
            if (regex.test(url.pathname)) {
                const matches = regex.exec(url.pathname)
                this.retrievePage(matches[1])
            } else {
                this.retrievePage()
            }
        },
        methods: {
            async retrievePage(id) {
                try {
                    if (id) {
                        this.processing = true
                        const response = await axios.get(`/api/admin/pages/${id}`)
                        console.log(response.data)
                        this.page = response.data
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
                    if (this.page.id) {
                        const response = await axios.patch(`/api/admin/pages/${this.page.id}`, this.page)
                        // this.page = response.data
                        this.$store.state.notifications = [{
                            type: "success",
                            message: "Page updated"
                        }]
                    } else {
                        const response = await axios.post("/api/admin/pages", this.page)
                        window.history.pushState(Object.assign({}, response.data), "Edit page", `/admin/pages/${response.data.id}`)
                        this.page = response.data
                        this.$store.state.notifications = [{
                            type: "success",
                            message: "Page created"
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
            }
        }

    }
</script>
