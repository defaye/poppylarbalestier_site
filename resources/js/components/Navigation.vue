<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <button 
            aria-controls="headerNavigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
            class="navbar-toggler mb-1"
            data-target="#headerNavigation"
            data-toggle="collapse"
            type="button"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="headerNavigation">
            <ul class="navbar-nav mx-auto">
                <li
                    :key="item.id"
                    class="nav-item"
                    v-for="item in items"
                    v-if="item.position > 0"
                >
                    <a
                        :href="`/${item.slug}`"
                        :title="item.name"
                        @click.prevent="navigateTo(`/${item.slug}`)"
                        class="nav-link text-uppercase"
                        v-html="item.title"
                    />
                </li>
            </ul>
            <!-- <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> -->
        </div>
    </nav>
</template>
<script>
    'use strict'
    export default {
        data() {
            return {
                items: []
            }
        },
        beforeMount() {
            axios.get('/api/navigation').then(response => {
                this.items = response.data
            }).catch(e => {
                console.error(e)
            })
        },
        methods: {
            navigateTo(path) {
                $('.navbar-collapse').collapse('hide')
                this.$store.dispatch('load', path)
            }
        }
    }
</script>
