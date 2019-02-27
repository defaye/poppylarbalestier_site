<!-- <template>
	<div>
	    <nav class="layout-nav">
	    	<a
	    		:href="link.href"
	    		:title="link.title"
	    		class="link"
	    		v-for="link in navigation"
	    		@click=""
	    	>
	    		<font-awesome-icon
	    			:icon="link.icon"
	    			class="fa-2x"
	    		/>
	    	</a>
	    </nav>
	</div>
</template> -->
<script>
	'use strict'
	export default {
		render(createElement) {
			return createElement(
				'nav',
				{
					class: 'layout-nav'
				},
				[
					this.navigation.map(link => {
						const options = {
							attrs: {
								href: link.href,
								title: link.title
							},
							class: 'link'
						}
						if (link.onClick) {
							options.on = {
								click: link.onClick
							}
						}
						return createElement(
							'a',
							options,
							[
								createElement(
									'font-awesome-icon',
									{
										class: 'fa-2x',
										attrs: {
											icon: link.icon
										}
									}
								)
							]
						)
					})
				]
			)
		},
		data() {
			return {
				navigation: [
					{
						href: '/admin',
						title: 'Home',
						icon: ['fal', 'home'],
					},
					{
						href: '/admin/navigation',
						title: 'Navigation',
						icon: ['fal', 'anchor'],
					},
					{
						href: '/admin/pages',
						title: 'Pages',
						icon: ['fal', 'file'],
					},
					{
						href: '/admin/posts',
						title: 'Posts',
						icon: ['fal', 'newspaper'],
					},
					{
						href: '/admin/components',
						title: 'Components',
						icon: ['fal', 'magic'],
					},
					{
						href: '/admin/profile',
						title: 'Profile',
						icon: ['fal', 'user-circle'],
					},
					{
						href: '/admin/logout',
						title: 'Logout',
						icon: ['fal', 'power-off'],
						onClick: this.logout
					},
				]
			}
		},
		methods: {
			logout(e) {
				e.preventDefault()
				return axios.post('/admin/logout').then(response => {
					window.open('/admin', '_self')
				}).catch(e => {
					console.error(e)
					this.$store.state.notifications = [{
						type: 'danger',
						message: 'Could not logout at this time.'
					}]
				})
			}
		}
	}
</script>