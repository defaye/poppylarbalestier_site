<template>
    <div>
        <h1>{{ page.id ? "Edit" : "New" }} page</h1>
        <alert></alert>
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
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" id="title" v-model="page.title" class="form-control" placeholder="Enter a title..." :disabled="processing">
                    <small class="form-text">This is the text that will appear in the title bar of the page only.</small>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" v-model="page.name" class="form-control" placeholder="Enter a name..." :disabled="processing">
                    <small class="form-text">If the page name is used in the component template, it will be used.</small>
                </div>
                <div class="form-group">
                    <label for="body">Body</label>
                    <textarea v-autosize class="form-control" name="body" id="body" aria-describedby="Body" placeholder="Write your page..." v-model="page.body" :disabled="processing"></textarea>
                </div>
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
    "use strict";
    import draggable from "vuedraggable";
    import ManageImages from "../mixins/ManageImages.js";
    import Tabs from "../mixins/Tabs.js";

    export default {
        components: {
            draggable
        },
        mixins: [
            ManageImages,
            Tabs
        ],
        data() {
            return {
                processing: false,
                errors: undefined,
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
                document.title = event.state.title;
                this.page = event.state;
            };
            try {
                const response = await axios.get("/api/admin/components");
                if (response.data.length) {
                    this.components = response.data;
                    this.page.component_id = this.components[0].id;
                } else {
                    this.errors = { message: "You need to create a component template before you create a page." };
                }
            } catch (e) {
                try {
                    console.error(e.response.data);
                    this.errors = e.response.data;
                } catch (e) {
                    console.error(e);
                }
            }
            const url = new URL(window.location.href);
            const regex = /^\/admin\/pages\/(\d+)$/;
            if (regex.test(url.pathname)) {
                const matches = regex.exec(url.pathname);
                this.retrievePage(matches[1]);
            } else {
                this.retrievePage();
            }
        },
        methods: {
            async retrievePage(id) {
                try {
                    if (id) {
                        this.processing = true;
                        const response = await axios.get(`/api/admin/pages/${id}`);
                        console.log(response.data);
                        this.page = response.data;
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
                    if (this.page.id) {
                        const response = await axios.patch(`/api/admin/pages/${this.page.id}`, this.page);
                        // this.page = response.data;
                        this.$store.commit("status", {
                            type: "success",
                            message: "Page updated"
                        });
                    } else {
                        const response = await axios.post("/api/admin/pages", this.page);
                        window.history.pushState(Object.assign({}, response.data), "Edit page", `/admin/pages/${response.data.id}`);
                        this.page = response.data;
                        this.$store.commit("status", {
                            type: "success",
                            message: "Page created"
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
            }
        }

    }
</script>
