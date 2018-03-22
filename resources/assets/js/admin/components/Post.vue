<template>
    <div>
        <h1>{{ post.id ? "Edit" : "New" }} post</h1>
        <errors v-model="errors"></errors>
        <div>
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
                <label for="images">Images</label>
                <image-uploader :multiple="true" @change="assignImages" :url="`/api/admin/posts/${post.id}/images`" class="form-group"></image-uploader>
                <div v-if="post.hasOwnProperty('images') && post.images.length" class="form-group">
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-1" v-for="(image, index) in post.images">
                            <div class="card">
                                <div class="card-header">
                                    <span>Delete</span>
                                    <button type="button" class="close" aria-label="Unstage image">
                                        <span aria-hidden="true" @click.prevent="deleteImage(image, index)">&times;</span>
                                    </button>
                                </div>
                                <div class="card-block">
                                    <div class="embed-responsive embed-responsive-4by3 rounded">
                                        <div class="embed-responsive-item" :style="`background-image: url(${image.path}); background-position: center; background-size: cover; background-repeat: no-repeat;`" :title="image.name"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <image-handler :multiple="true" @change="handleChosenImages" :url="`/api/admin/posts/${post.id}/images`"></image-handler> -->
            </div>
            <div class="form-group" v-if="post.id">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="published" name="published" v-model="post.published" :disabled="processing">
                    <label class="custom-control-label" for="published">Published</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary w-100 form-group" @click="submit" :disabled="processing">
                <span v-if="post.id">Update</span>
                <span v-else>Create</span>
            </button>
        </div>
    </div>
</template>
<script>
    "use strict";
    // import autosize from "autosize";
    export default {
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
                        this.post = response.data;
                    } else {
                        const response = await axios.post("/api/admin/posts", this.post);
                        window.history.pushState(Object.assign({}, response.data), "Edit post", `/admin/posts/${response.data.id}`);
                        this.post = response.data;

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
            assignImages(images) {
                console.log(images);
                images.forEach(image => {
                    this.post.images.push(Object.assign({}, image));
                });
            },
            async deleteImage(image, index) {
                try {
                    const response = await axios.delete(`/api/admin/images/${image.id}`);
                    if (response.data) {
                        this.$delete(this.post.images, index);
                    }
                } catch (e) {
                    console.error(e.response.data);
                }
            }
        }

    }
</script>
