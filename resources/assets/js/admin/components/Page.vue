<template>
    <div>
        <h1>{{ page.id ? "Edit" : "New" }} page</h1>
        <alert></alert>
        <errors v-model="errors"></errors>
        <div>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" v-model="page.name" class="form-control" placeholder="Enter a name..." :disabled="processing">
            </div>
            <div class="form-group">
                <label for="body">Body</label>
                <textarea v-autosize class="form-control" name="body" id="body" aria-describedby="Body" placeholder="Write your page..." v-model="page.body" :disabled="processing"></textarea>
            </div>
            <div class="form-group" v-if="page.id">
                <label for="images">Images</label>
                <image-uploader :multiple="true" @change="assignImages" :url="`/api/admin/pages/${page.id}/images`" class="form-group"></image-uploader>
                <div v-if="page.hasOwnProperty('images') && page.images.length" class="form-group">
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-1" v-for="(image, index) in page.images">
                            <div class="card">
                                <div class="card-header">
                                    <span>Delete</span>
                                    <button type="button" class="close" aria-label="Unstage image">
                                        <span aria-hidden="true" @click.prevent="deleteImage(image, index)">&times;</span>
                                    </button>
                                </div>
                                <div class="card-body">
                                    <div class="embed-responsive embed-responsive-4by3 rounded">
                                        <div class="embed-responsive-item" :style="`background-image: url(${image.path}); background-position: center; background-size: cover; background-repeat: no-repeat;`" :name="image.name"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <image-handler :multiple="true" @change="handleChosenImages" :url="`/api/admin/pages/${page.id}/images`"></image-handler> -->
            </div>
            <div class="form-group" v-if="page.id">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="published" name="published" v-model="page.published" :disabled="processing">
                    <label class="custom-control-label" for="published">Published</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary w-100 form-group" @click="submit" :disabled="processing">
                <span v-if="page.id">Update</span>
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
                page: {
                    name: undefined,
                    body: undefined,
                    published: undefined,
                    images: []
                }
            }
        },
        mounted() {
            window.onpopstate = event => {
                document.title = event.state.title;
                this.page = event.state;
            };
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
                        this.page = response.data;
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
            },
            assignImages(images) {
                console.log(images);
                this.$store.commit("status", {
                    type: "success",
                    message: "Images uploaded"
                });
                images.forEach(image => {
                    this.page.images.push(Object.assign({}, image));
                });
            },
            async deleteImage(image, index) {
                try {
                    const response = await axios.delete(`/api/admin/images/${image.id}`);
                    if (response.data) {
                        this.$store.commit("status", {
                            type: "success",
                            message: "Image deleted"
                        });
                        this.$delete(this.page.images, index);
                    }
                } catch (e) {
                    console.error(e.response.data);
                }
            }
        }

    }
</script>
