<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <button class="navbar-toggler mb-1" type="button" data-toggle="collapse" data-target="#headerNavigation" aria-controls="headerNavigation" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="headerNavigation">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item" v-for="item in items" :key="item.id" v-if="item.position > 0">
                    <a :href="`/${item.slug}`" class="nav-link text-uppercase" :title="item.name" @click.prevent="navigateTo(`/${item.slug}`)">{{ item.title }}</a>
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
    "use strict"
    export default {
        data() {
            return {
                items: []
            }
        },
        async mounted() {
            try {
                const response = await axios.get("/api/navigation")
                this.items = response.data
            } catch (e) {
                console.error(e)
            }
        },
        methods: {
            navigateTo(path) {
                $(".navbar-collapse").collapse("hide")
                this.$store.dispatch('load', path)
            }
        }
    }
</script>
