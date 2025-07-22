<template>
	<b-modal  
	    :ok-variant="variant"
	    :visible="visible"
	    @change="$emit('change', $event)" 
	    @ok="$emit('confirmed')"
	    ok-title="Confirm" 
	>
	    <slot>Are you sure?</slot>
	</b-modal>
</template>
<script>
	'use strict'
	import { BModal } from 'bootstrap-vue'

	export default {
		components: {
			BModal,
		},
		props: {
			visible: {
				type: Boolean,
				required: true
			},
			variant: {
				type: String,
				default: 'danger',
			},
		},
		model: {
			event: 'change',
			prop: 'visible',
		},
	}
</script>