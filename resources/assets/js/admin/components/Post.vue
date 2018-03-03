<template>
    <div>
        <errors v-model="errors"></errors>
        <form>
            <div class="form-group">
                <label for="body">Body</label>
                <textarea class="form-control" name="body" id="body" aria-describedby="Body" placeholder="Write your post..." v-model="post.body"></textarea>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select name="category" id="category" v-model="post.category">
                    <option v-for="option in categories" :value="option.value">{{ option.label }}</option>
                </select>
            </div>
            <!-- <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div> -->
            <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
        </form>
    </div>
</template>
<script>
    "use strict";
    // import autosize from "autosize";
    export default {
        data() {
            return {
                post: undefined,
                categories: undefined,
            }
        },
        mounted() {
            let url = new URL(window.location.href);
            let matches = /^\/admin\/posts\/(\d+)$/.exec(url.pathname);
            if (1 in matches) {
                this.retrievePost({ id: matches[1] });
            }
            this.retrieveCategories();
        },
        methods: {
            async retrievePost(params) {
                try {
                    this.post = await axios.get("/api/posts", {
                        params
                    });
                } catch (e) {
                    this.errors = e.response.data;
                }
            },
            async retrieveCategories() {
                try {
                    this.categories = await axios.get("/api/categories");
                } catch (e) {
                    this.errors = e.response.data;
                }
            },
            submit() {

            }
        }

    }
</script>
