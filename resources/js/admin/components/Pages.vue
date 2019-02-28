<template>
    <div class="container-fluid">
        <h1>Pages</h1>
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
                    key: 'component',
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
            :items="editablePages"
            hover 
            sortable
            stacked="lg"
        >
            <template slot="title" slot-scope="data">
                <a :href="'/admin/pages/' + data.item.id">{{ data.value }}</a>
            </template>
            <template slot="component" slot-scope="data">
                <a :href="'/admin/components/' + data.value.id">{{ data.value.name }}</a>
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
            v-model="showPageStagedForDestroyConfirmationModal"
            @confirmed="remove(pageStagedForDestroy)"
        />

        <b-pagination
            :per-page="perPage"
            :total-rows="editablePages.length"
            v-if="editablePages && editablePages.length"
            v-model="currentPage"
        />

        <b-button
            class="w-100 mt-3"
            href="/admin/pages/new"
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
                editablePages: [],
                pages: [],
                pageStagedForDestroy: undefined,
                showPageStagedForDestroyConfirmationModal: false,
            }
        },
        beforeMount() {
            this.processIfNotProcessing(
                axios.get('/api/admin/pages', {
                        params: {
                            with: ['component']
                        }
                    })
                .then(response => {
                    this.setPages(response.data)
                })
                .catch(e => {
                    console.error(e.response.data)
                    this.errors = e.response.data
                })
            )
        },
        methods: {
            setPages(page) {
                this.pages = Object.assign([], page)
                this.editablePages = Object.assign([], page)
            },
            moment,
            truncate(text, opts) {
                const defaultOptions = {
                    length: 512,
                    separator: /\n+/,
                    omission: ''
                }

                return _.truncate(
                    text, 
                    typeof opts === 'object' 
                        ? Object.assign(defaultOptions, opts) 
                        : defaultOptions
                )
            },
            togglePublished(page) {
                this.processIfNotProcessing(
                    axios.patch(
                        `/api/admin/pages/${page.id}`, 
                        Object.assign(
                            page, 
                            {
                                published: !page.published
                            }
                        )
                    )
                        .then(response => {
                            this.setPages(response.data)
                            this.$store.state.notifications = [{
                                type: 'success',
                                message: 'Page ' + (page.published ? 'published' : 'un-published')
                            }]
                            this.errors.clear()
                        })
                        .catch(e => {
                            console.error(e.response.data)
                            this.errors = e.response.data
                        })
                )
            },
            remove(page) {
                this.processIfNotProcessing(
                    axios.delete('/api/admin/pages/' + page.id)
                        .then(response => {
                            this.$delete(this.editablePages, _.findIndex(this.editablePages, { id: page.id }))
                            this.pages = Object.assign([], this.editablePages)
                        })
                        .catch(error => this.errors = error.response.data)
                )
            },
            setPageForDestroy(page) {
                this.pageStagedForDestroy = page
                this.showPageStagedForDestroyConfirmationModal = true
            },
            onDragChange(e) {

                console.log('onDragChange(e)')
                console.log(e)

                // if (this.processing) {
                //     return
                // }
                // this.processing = true
                // axios.patch('/api/admin/sort/pages', {
                //     page: e.moved.element.id,
                //     newOrder: this.pages[e.moved.newIndex].order
                // }).then(response => {
                //     this.$store.state.notifications = [{
                //         type: "success",
                //         message: "Page re-ordered."
                //     }]
                // }).catch(error => {
                //     console.error(error.response.data)
                // }).then(() => {
                //     this.processing = false
                // })
            }
        }
    }
</script>
