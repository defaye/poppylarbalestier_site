<template>
    <ul class="pagination" v-if="pagination">
        <li v-if="pagination.current_page === 1" class="page-item disabled">
            <span class="page-link">
                <font-awesome-icon :icon="['fal', 'chevron-double-left']"></font-awesome-icon>
            </span>
        </li>
        <li v-else class="page-item">
            <a :href="urlWithPage(pagination.current_page - 1)" rel="prev" class="page-link">
                <font-awesome-icon :icon="['fal', 'chevron-double-left']"></font-awesome-icon>
            </a>
        </li>
        <li v-for="number in range(1, pages + 1)" class="page-item" :class="{ active: number === pagination.current_page }">
            <a v-if="number !== pagination.current_page" :href="urlWithPage(number)" class="page-link">{{ number }}</a>
            <span v-else class="page-link">{{ pagination.current_page }}</span>
        </li>
        <li v-if="pagination.has_more_pages" class="page-item">
            <a :href="urlWithPage(pagination.current_page + 1)" rel="next" class="page-link">
                <font-awesome-icon :icon="['fal', 'chevron-double-right']"></font-awesome-icon>
            </a>
        </li>
        <li v-else class="page-item disabled">
            <span class="page-link">
                <font-awesome-icon :icon="['fal', 'chevron-double-right']"></font-awesome-icon>
            </span>
        </li>
    </ul>
</template>
<script>
    'use strict'
    export default {
        model: {
            prop: 'pagination',
            event: 'change'
        },
        props: {
            pagination: Object
        },
        computed: {
            pages() {
                return Math.ceil(this.pagination.total / this.pagination.per_page)
            }
        },
        methods: {
            range() {
                return _.range(...arguments)
            },
            urlWithPage(number) {
                const url = new URL(window.location)
                const params = url.searchParams
                params.set('page', number)
                return url.toString()
            }
        }
    }
</script>
