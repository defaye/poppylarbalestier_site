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
                <image-handler :multiple="true" @change="handleChosenImages"></image-handler>
            </div>
            <div class="form-group" v-if="post.id">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="published" name="published" v-model="post.published" :disabled="processing">
                    <label class="custom-control-label" for="published">Published</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" @click="submit" :disabled="processing">
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
                    published: undefined
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
                        let formData = new FormData();
                        formData.append("title", this.post.title);
                        formData.append("body", this.post.body);
                        formData.append("category", this.post.category);
                        formData.append("published", this.post.published);
                        formData.append("images[]", this.post.images);
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
            async handleChosenImages(files) {
                console.log("files")
                console.log(files)
            }
        }

    }
</script>
