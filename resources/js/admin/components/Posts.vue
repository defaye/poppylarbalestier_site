<template>
    <div class="container-fluid">
        <h1>Posts</h1>
        <errors v-model="errors"></errors>
        <b-table 
            :fields="[
                {
                    key: 'title',
                    sortable: true,
                },
                // {
                //     key: 'body',
                //     sortable: false,
                //     formatter: value => truncate(value, { length: 42, omission: '...' }),
                // },
                {
                    key: 'category',
                    sortable: true,
                },
                {
                    key: 'published',
                    sortable: true,
                },
                {
                    key: 'created_at',
                    label: 'Created',
                    sortable: true,
                    formatter: value => moment(value).fromNow(),
                },
                {
                    key: 'updated_at',
                    label: 'Updated',
                    sortable: true,
                    formatter: value => moment(value).fromNow(),
                },
                'delete',
            ]"
            :current-page="currentPage"
            :per-page="perPage"
            :items="editablePosts"
            @row-dblclicked="window.open('/admin/posts/' + $event.id, '_self')"
            hover 
            sortable
            stacked="lg"
        >
            <template slot="title" slot-scope="data">
                <a :href="'/admin/posts/' + data.item.id">{{ data.value }}</a>
            </template>
            <template slot="category" slot-scope="data">
                <a :href="'/admin/categories/' + data.value.id">{{ data.value.name }}</a>
            </template>
            <template slot="published" slot-scope="data">
                <span
                    role="button"
                    @click="togglePublished(data.item)"
                >
                    <font-awesome-icon
                        :icon="[
                            (data.item.published ? 'fas' : 'fal'), 
                            'lightbulb'
                        ]"
                        :title="data.item.published ? 'Published' : 'Un-Published'"
                        class="fa-2x text-warning"
                    />
                </span>  
            </template>
            <template 
                slot="delete" 
                slot-scope="data"
            >
                <font-awesome-icon
                    :icon="[
                        'fal',
                        'times-square'
                    ]"
                    @click="setPageForDestroy(data.item)"
                    class="fa-2x text-danger"
                    title="Delete"
                />
            </template>
        </b-table>


        <confirmation-modal
            v-model="showPostStagedForDestroyConfirmationModal"
            @confirmed="remove(postStagedForDestroy)"
        />

        <b-pagination
            :per-page="perPage"
            :total-rows="editablePosts.length"
            v-if="editablePosts && editablePosts.length"
            v-model="currentPage"
        />

        <b-button
            class="w-100 mt-3"
            href="/admin/posts/new"
            variant="primary"
        >
            New
        </b-button>
    </div>
</template>
<script>
    'use strict'
    /**
     * Import third-party plugins
     */
    import bButton from 'bootstrap-vue/es/components/button/button'
    import bPagination from 'bootstrap-vue/es/components/pagination/pagination'
    import bTable from 'bootstrap-vue/es/components/table/table'
    // import draggable from 'vuedraggable'
    import moment from 'moment'

    /**
     * Import project plugins
     */
    import confirmationModal from '~/js/components/ConfirmationModal'
    import ErrorsAndProcessing from '~/js/mixins/ErrorsAndProcessing'
    import ProcessIfNotProcessing from '~/js/mixins/ProcessIfNotProcessing'

    export default {
        components: {
            confirmationModal,
            // draggable,
            bButton,
            bPagination,
            bTable,
        },
        mixins: [
            ErrorsAndProcessing,
            ProcessIfNotProcessing,
        ],
        data() {
            return {
                currentPage: 1,
                perPage: 20,
                editablePosts: [],
                posts: [],
                postStagedForDestroy: undefined,
                showPostStagedForDestroyConfirmationModal: false,
            }
        },
        beforeMount() {
            this.processIfNotProcessing(
                axios.get('/api/admin/posts', {
                        params: {
                            with: ['category']
                        }
                    })
                .then(response => {
                    this.setPosts(response.data)
                })
                .catch(e => {
                    console.error(e.response.data)
                    this.errors = e.response.data
                })
            )
        },
        methods: {
            moment,
            setPosts(post) {
                this.posts = Object.assign([], post)
                this.editablePosts = Object.assign([], post)
            },
            togglePublished(post) {
                this.processIfNotProcessing(
                    axios.patch(
                        `/api/admin/posts/${post.id}`, 
                        Object.assign(
                            post, 
                            {
                                published: !post.published
                            }
                        )
                    )
                        .then(response => {
                            this.$store.state.notifications = [{
                                type: 'success',
                                message: 'Post ' + (post.published ? 'published' : 'un-published')
                            }]
                            this.errors.clear()
                        })
                        .catch(e => {
                            console.error(e.response.data)
                            this.errors = e.response.data
                        })
                )
            },
            remove(post) {

                this.processIfNotProcessing(
                    axios.delete('/api/admin/posts/' + post.id)
                        .then(response => {
                            this.$delete(this.editablePosts, _.findIndex(this.editablePosts, { id: post.id }))
                            this.posts = Object.assign([], this.editablePosts)
                            this.$store.state.notifications = [{
                                type: 'success',
                                message: 'Post deleted.',
                            }]
                        })
                        .catch(error => this.errors = error.response.data)
                )
            }
        }
    }
</script>
