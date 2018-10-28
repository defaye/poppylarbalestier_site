<template>
    <div class="container-fluid">
        <h1>Pages</h1>
        <errors v-model="errors"></errors>
        <div class="container-fluid mb-3">
            <div class="row d-none d-md-flex py-3 bg-dark text-white">
                <div class="col-md-2"><strong>#</strong></div>
                <div class="col-md-4"><strong>Title</strong></div>
                <div class="col-md-3"><strong>Component</strong></div>
                <div class="col-md-2"><strong>Published?</strong></div>
                <div class="col-md-1"></div>
            </div>
            <div class="highlight-children">
                <div v-if="pages.length" v-for="(page, index) in pages" @dblclick="open(`/admin/pages/${page.id}`)"
                    class="row text-center text-md-left py-3 border-top" :style="index % 2 ? 'background-color: #f3f3f3' : false">
                    <div class="col-12 col-md-2">
                        <span class="d-md-none">#</span>
                        <a :href="`/admin/pages/${page.id}`">{{ page.id }}</a>
                    </div>
                    <div class="col-12 col-md-4"><a :href="`/admin/pages/${page.id}`">{{ page.title }}</a></div>
                    <div class="col-12 col-md-3"><em><small class="text-dark">{{ page.component && page.component.name }}</small></em></div>
                    <div class="col-12 col-md-2">
                        <span role="button" @click="togglePublished(page)">
                        <!-- <font-awesome-layers role="button" @click="togglePublished(page)"> -->
                            <!-- <font-awesome-icon class="text-light" icon="circle"></font-awesome-icon> -->
                            <font-awesome-icon v-if="page.published" class="text-warning" :icon="['fas', 'lightbulb']" title="Published"></font-awesome-icon>
                            <font-awesome-icon v-else class="text-warning" :icon="['fal', 'lightbulb']" title="Un-published"></font-awesome-icon>
                        <!-- </font-awesome-layers> -->
                        </span>
                    </div>
                    <div class="col-12 col-md-1">
                        <font-awesome-icon class="text-danger" :icon="['fal', 'times-square']" title="Delete" v-b-modal="'delete-' + page.id"></font-awesome-icon>
                        <b-modal :id="'delete-' + page.id" variant="danger" @ok="remove(page)" ok-title="Confirm">
                            Are you sure?
                        </b-modal>
                    </div>
                </div>
                <div v-else class="row"><div class="col">There are no pages to show.</div></div>
            </div>
        </div>
        <pagination v-model="pagination"></pagination>
        <a class="btn btn-primary w-100 mt-3" href="/admin/pages/new">New</a>
    </div>
</template>
<script>
    'use strict'
    import ErrorsAndProcessing from '../../mixins/ErrorsAndProcessing'
    import bModal from 'bootstrap-vue/es/components/modal/modal'
    import vBModal from 'bootstrap-vue/es/directives/modal/modal'

    export default {
        components: {
            bModal
        },
        directives: {
            'b-modal': vBModal
        },
        mixins: [
            ErrorsAndProcessing
        ],
        data() {
            return {
                pages: [],
                pagination: undefined
            }
        },
        async mounted() {
            try {
                this.processing = true
                const response = await axios.get("/api/admin/pages", {
                    params: {
                        page: this.getPage(),
                        per_page: this.getPerPage(15),
                        with: ["component"]
                    }
                })
                this.pages = response.data.data
                this.pagination = response.data.meta
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
        methods: {
            open(link) {
                window.location.href = link
            },
            getPage() {
                const url = new URL(window.location.href)
                const params = url.searchParams
                return url.searchParams.get("page")
            },
            getPerPage(def = 15) {
                const url = new URL(window.location.href)
                const params = url.searchParams
                return url.searchParams.get("per_page") || def
            },
            async togglePublished(page) {
                try {
                    this.processing = true
                    const response = await axios.patch(`/api/admin/pages/${page.id}`, Object.assign(page, { published: !page.published }))
                    page = response.data
                    this.$store.state.notifications = [{
                        type: "success",
                        message: "Page " + (page.published ? "published" : "un-published")
                    }]
                    this.errors.clear()
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
            remove(page) {
                if (this.processing) {
                    return
                }
                this.processing = true
                axios.delete('/api/admin/pages/' + page.id).then(response => {
                    this.$delete(this.pages, _.findIndex(this.pages, { id: page.id }))
                })
                .catch(error => this.errors = error.response.data)
                .then(() => this.processing = false)
            }
        }
    }
</script>
