<template>
    <div>
        <h1>{{ post.id ? "Edit" : "New" }} post</h1>
        <alert></alert>
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
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" id="title" v-model="post.title" class="form-control" placeholder="Enter a title..." :disabled="processing">
                </div>
                <div class="form-group">
                    <label for="body">Body</label>
                    <textarea v-autosize class="form-control" name="body" id="body" aria-describedby="Body" placeholder="Write your post..." v-model="post.body" :disabled="processing"></textarea>
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <input type="text" name="category" id="category" v-model="post.category.name" class="form-control" placeholder="Enter a category name..." max="255" :disabled="processing">

                    <!-- <select name="category" id="category" v-model="post.category">
                        <option v-for="option in categories" :value="option.value">{{ option.label }}</option>
                    </select> -->
                </div>
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
                                        <div class="embed-responsive embed-responsive-4by3 rounded">
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
    "use strict";
    import draggable from "vuedraggable";
    // import autosize from "autosize";
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
                document.title = event.state.title;
                this.post = event.state;
            };
            const url = new URL(window.location.href);
            const regex = /^\/admin\/posts\/(\d+)$/;
            if (regex.test(url.pathname)) {
                const matches = regex.exec(url.pathname);
                this.retrievePost(matches[1]);
            } else {
                this.retrievePost();
            }
            this.retrieveCategories();
        },
        methods: {
            async retrievePost(id) {
                try {
                    if (id) {
                        this.processing = true;
                        const response = await axios.get(`/api/admin/posts/${id}`);
                        console.log(response.data);
                        this.post = response.data;
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
            async retrieveCategories() {
                try {
                    this.processing = true;
                    const response = await axios.get("/api/admin/categories");
                    this.categories = response.data;
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
                    if (this.post.id) {
                        const response = await axios.patch(`/api/admin/posts/${this.post.id}`, this.post);
                        // this.post = response.data;
                        this.$store.commit("status", {
                            type: "success",
                            message: "Post updated"
                        });
                    } else {
                        const response = await axios.post("/api/admin/posts", this.post);
                        window.history.pushState(Object.assign({}, response.data), "Edit post", `/admin/posts/${response.data.id}`);
                        this.post = response.data;
                        this.$store.commit("status", {
                            type: "success",
                            message: "Post created"
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
