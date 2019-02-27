<template>
    <div>
        <div class="card" v-if="posts.length">
            <div class="card-header">Posts</div>
            <table class="table table-striped table-hover mb-0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                <draggable v-model="editablePosts" element="tbody" @change="onDragChange">
                    <tr v-for="post in editablePosts">
                        <td><a :href="`/admin/posts/${post.id}`" target="_blank">{{ post.id }}</a></td>
                        <td>{{ post.title }}</td>
                        <td>{{ post.category.name }}</td>
                        <td>
                            <button class="btn btn-danger w-100" :disabled="processing" @click.prevent="removePost(post)">
                                <font-awesome-icon class="icon-link" :icon="['fal', 'minus-octagon']"></font-awesome-icon>
                            </button>
                        </td>
                    </tr>
                </draggable>
                <!-- <tbody>
                    <tr v-for="post in posts">
                        <td><a :href="`/admin/posts/${post.id}`" target="_blank">{{ post.id }}</a></td>
                        <td>{{ post.title }}</td>
                        <td>{{ post.category.name }}</td>
                        <td>
                            <button class="btn btn-danger w-100" :disabled="processing" @click.prevent="removePost(post)">
                                <font-awesome-icon class="icon-link" :icon="['fal', 'minus-octagon']"></font-awesome-icon>
                            </button>
                        </td>
                    </tr>
                </tbody> -->
            </table>
        </div>
        <div class="card mt-3">
            <div class="card-header">Search posts</div>
            <div class="card-body">
                <errors v-model="errors"></errors>
                <p class="alert alert-info">Use wildcard <code>%</code> to match anything before or after e.g. <code>Jill and%</code> will find anything starting with <code>Jill and</code>.</p>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" name="title" id="title" maxlength="255" placeholder="Enter title..." v-model="search.title">
                </div>
                <div class="form-group">
                    <label for="body">Body</label>
                    <input type="text" class="form-control" name="body" id="body" maxlength="255" placeholder="Enter body..." v-model="search.body">
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <input type="text" class="form-control" name="category" id="category" maxlength="255" placeholder="Enter category..." v-model="search.category">
                </div>
                <button class="btn btn-primary w-100 mt-3" @click.prevent="submit">Search</button>
                <div class="form-text"><small>All searches are case-insensitive.</small></div>
            </div>
        </div>
        <div class="card mt-3" v-if="results.length">
            <div class="card-header">Results</div>
            <table class="table table-striped table-hover mb-0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in results">
                        <td><a :href="`/admin/posts/${post.id}`" target="_blank">{{ post.id }}</a></td>
                        <td>{{ post.title }}</td>
                        <td>{{ post.category.name }}</td>
                        <td>
                            <button class="btn btn-success w-100" :disabled="processing" @click.prevent="addPost(post)">
                                <font-awesome-icon class="icon-link" :icon="['fal', 'plus-octagon']"></font-awesome-icon>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    'use strict'
    import draggable from 'vuedraggable'
    import ErrorsAndProcessing from '~/js/mixins/ErrorsAndProcessing'

    export default {
        mixins: [
            ErrorsAndProcessing
        ],
        components: {
            draggable,
        },
        model: {
            prop: 'posts',
            event: 'change'
        },
        props: {
            posts: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                search: {
                    title: undefined,
                    category: undefined,
                    body: undefined,
                },
                results: [],
                editablePosts: []
            }
        },
        beforeMount() {
            this.editablePosts = _.sortBy(this.posts, 'order')
        },
        methods: {
            submit() {
                if (this.processing) {
                    return
                }
                this.processing = true
                this.errors.clear()
                axios.get('/api/admin/search/posts', {
                    params: this.search
                })
                .then(response => {
                    this.results = response.data
                })
                .catch(e => {
                    try {
                        console.error(e.response.data)
                        this.errors = e.response.data
                    } catch (e) {
                        console.error(e)
                    }
                })
                .then(response => {
                    this.processing = false
                })
            },
            addPost(post) {
                if (this.processing) {
                    return
                }
                try {
                    this.processing = true
                    let posts = this.posts
                    if (!_.find(posts, { id: post.id })) {
                        posts.push(Object.assign({}, post))
                        this.$emit('change', posts)
                        this.$store.state.notifications = [{
                            type: 'warning',
                            message: 'Post staged for assignment; update to commit changes'
                        }]
                    } else {
                        this.errors = { message: 'Post already assigned.' }
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
            removePost(post) {
                if (this.processing) {
                    return
                }
                try {
                    this.processing = true
                    let posts = this.posts
                    this.$delete(posts, _.findIndex(posts, { id: post.id }))
                    this.$emit('change', posts)
                    this.$store.state.notifications = [{
                        type: 'warning',
                        message: 'Post staged for un-assignment; update to commit changes'
                    }]
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
            onDragChange(e) {

                console.log('onDragChange(e)')
                console.log(e)

                if (this.processing) {
                    return
                }
                this.processing = true
                axios.patch(`/api/admin/page_post/sort`, {
                    page: this.$parent.page.id,
                    posts: this.editablePosts.map(p => p.id)
                }).then(response => {
                    this.$store.state.notifications = [{
                        type: 'success',
                        message: 'Post re-ordered.'
                    }]
                }).catch(error => {
                    console.error(error.response.data)
                }).then(() => {
                    this.processing = false
                })
            }
        }
    }
</script>
