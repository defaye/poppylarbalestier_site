<template>
	<div class="PostsGallery" v-if="posts && posts.length">
	    <div class="container">
	        <div class="row">
	            <div
	                :key="post.id"
	                @click.prevent="emitLoadEvent(`/${page.slug}/${post.slug}`)"
	                class="d-flex align-content-stretch flex-wrap col-12 col-lg-4"
	                role="button"
	                v-for="post in posts"
	            >
	                <a
	                	:href="`/${page.slug}/${post.slug}`"
	                	@click.prevent="emitLoadEvent(`/${page.slug}/${post.slug}`)"
	                	class="PostsGallery--header"
	                	v-html="post.title"
	                />

	                <!-- <img 
	                	:alt="post.title"
	                	:src="post.images[0].path" 
	                	class="w-100 Frame" 
	                > -->
	                <responsive-image
	                    :alt="post.title"
	                    :ratio-x="826"
	                    :ratio-y="551"
	                    :src="post.images[0].path"
	                	class="w-100 Frame" 
	                />
	            </div>
	        </div>
	    </div>
	</div>
</template>
<script>
	'use strict'
	import emitLoadEvent from '~/js/functions/emitLoadEvent'

	export default {
		props: {
			page: {
				type: Object,
				// required: true,
				// validator: page => {
				// 	return page.hasOwnProperty('posts') && Array.isArray(page.posts)
				// 		&& (array => array.filter(o => 'object' === typeof o).length === array.length)(page.posts)
				// }
			},
		},
		computed: {
			posts() {
				return (this.page && this.page.posts) 
					? this.orderBy(this.page.posts, 'order')
					: undefined
			}
		},
		methods: {
			emitLoadEvent,
            orderBy(array, by) {
                return array.sort(
                    (a, b) => a[by] < b[by] ? -1 : a[by] > b[by] ? 1 : 0
                )
            },
		},
	}
</script>