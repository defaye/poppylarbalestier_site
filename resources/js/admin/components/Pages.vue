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
                        class="text-warning"
                        :icon="[
                            (data.item.published ? 'fas' : 'fal'), 
                            'lightbulb'
                        ]"
                        :title="data.item.published ? 'Published' : 'Un-Published'"
                    />
                </span>  
            </template>
            <template slot="delete" slot-scope="data">
                <font-awesome-icon
                    :icon="['fal', 'times-square']"
                    class="text-danger"
                    title="Delete"
                    v-b-modal="'delete-' + data.item.id"
                />
                <b-modal 
                    :id="'delete-' + data.item.id" 
                    @ok="remove(data.item)" 
                    ok-title="Confirm"
                    variant="danger" 
                >
                    Are you sure?
                </b-modal>
            </template>
        </b-table>

        <b-pagination
            :per-page="perPage"
            :total-rows="editablePages.length"
            v-if="editablePages && editablePages.length"
            v-model="currentPage"
        />



        <a class="btn btn-primary w-100 mt-3" href="/admin/pages/new">New</a>
    </div>
</template>
<script>
    'use strict'
    /**
     * Import third-party plugins
     */
    import bModal from 'bootstrap-vue/es/components/modal/modal'
    import bPagination from 'bootstrap-vue/es/components/pagination/pagination'
    import bTable from 'bootstrap-vue/es/components/table/table'
    import draggable from 'vuedraggable'
    import moment from 'moment'
    import vBModal from 'bootstrap-vue/es/directives/modal/modal'

    /**
     * Import project plugins
     */
    import ErrorsAndProcessing from '~/js/mixins/ErrorsAndProcessing'
    import ProcessIfNotProcessing from '~/js/mixins/ProcessIfNotProcessing'

    export default {
        components: {
            draggable,
            bModal,
            bPagination,
            bTable,
        },
        directives: {
            'b-modal': vBModal
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
                    try {
                        console.error(e.response.data)
                        this.errors = e.response.data
                    } catch (e) {
                        console.error(e)
                    }
                })
            )
        },
        methods: {
            setPages(data) {
                this.pages = Object.assign([], data)
                this.editablePages = Object.assign([], data)
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
            open(link) {
                window.location.href = link
            },
            togglePublished(page) {
                this.processIfNotProcessing(
                    axios.patch(`/api/admin/pages/${page.id}`, Object.assign(page, { published: !page.published }))
                        .then(response => {
                            page = response.data
                            this.$store.state.notifications = [{
                                type: "success",
                                message: "Page " + (page.published ? "published" : "un-published")
                            }]
                            this.errors.clear()
                        })
                        .catch(e => {
                            try {
                                console.error(e.response.data)
                                this.errors = e.response.data
                            } catch (e) {
                                console.error(e)
                            }
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
