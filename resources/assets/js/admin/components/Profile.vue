<template>
	<div>
        <errors v-model="errors"></errors>
	    <div class="card">
	        <div class="card-header">
	        	My Profile
	        </div>
	        <div class="card-body" v-if="user">
	        	<form @submit="submit">
		            <b-form-group label="Name" label-for="name">
		                <b-form-input
		                    :disabled="processing"
		                    :required="true"
		                    :state="errors.has('name') ? false : null"
		                    autofocus
		                    id="name"
		                    placeholder="Enter your name..."
		                    tabindex="1"
		                    type="text"
		                    v-model.trim="user.name"
		                >
		                </b-form-input>
		                <b-form-invalid-feedback v-if="errors.has('name')">
		                    {{ errors.get('name').join(' ').trim() }}
		                </b-form-invalid-feedback>
		            </b-form-group>
		            <b-form-group label="E-mail address" label-for="email">
		                <b-form-input
		                    :disabled="processing"
		                    :required="true"
		                    :state="errors.has('email') ? false : null"
		                    autofocus
		                    id="email"
		                    placeholder="Enter your e-mail address..."
		                    tabindex="1"
		                    type="email"
		                    v-model.trim="user.email"
		                >
		                </b-form-input>
		                <b-form-invalid-feedback v-if="errors.has('email')">
		                    {{ errors.get('email').join(' ').trim() }}
		                </b-form-invalid-feedback>
		            </b-form-group>
		            <b-form-group label="Password" label-for="password">
		                <b-form-input
		                    :disabled="processing"
		                    :required="true"
		                    :state="errors.has('password') ? false : null"
		                    autofocus
		                    id="password"
		                    placeholder="Enter your password..."
		                    tabindex="1"
		                    type="password"
		                    v-model.trim="user.password"
		                >
		                </b-form-input>
		                <b-form-invalid-feedback v-if="errors.has('password')">
		                    {{ errors.get('password').join(' ').trim() }}
		                </b-form-invalid-feedback>
		                <div class="form-text">
		                	<small>Please enter your password again if you update your e-mail address.</small>
		                </div>
		            </b-form-group>
		            <div class="container-fluid">
		            	<div class="row">
		            		<div class="col">
					            <b-form-group label="New Password" label-for="new_password">
					                <b-form-input
					                    :disabled="processing"
					                    :required="true"
					                    :state="errors.has('new_password') ? false : null"
					                    autofocus
					                    id="new_password"
					                    placeholder="Enter your new password..."
					                    tabindex="1"
					                    type="password"
					                    v-model.trim="user.new_password"
					                >
					                </b-form-input>
					                <b-form-invalid-feedback v-if="errors.has('new_password')">
					                    {{ errors.get('new_password').join(' ').trim() }}
					                </b-form-invalid-feedback>
					            </b-form-group>
		            		</div>
		            		<div class="col">
					            <b-form-group label="New Password Confirmation" label-for="new_password_confirmation">
					                <b-form-input
					                    :disabled="processing"
					                    :required="true"
					                    :state="errors.has('new_password_confirmation') ? false : null"
					                    autofocus
					                    id="new_password_confirmation"
					                    placeholder="Enter your new password..."
					                    tabindex="1"
					                    type="password"
					                    v-model.trim="user.new_password_confirmation"
					                >
					                </b-form-input>
					                <b-form-invalid-feedback v-if="errors.has('new_password_confirmation')">
					                    {{ errors.get('new_password_confirmation').join(' ').trim() }}
					                </b-form-invalid-feedback>
					            </b-form-group>
		            		</div>
		            	</div>
		            </div>
		        	<div class="mt-3">
		        		<b-button type="submit" variant="primary">Update</b-button>
		        	</div>
		        </form>
	        </div>
       </div>
	</div>
</template>
<script>
	'use strict'
	import ErrorsAndProcessing from '~/js/mixins/ErrorsAndProcessing'
	import ProcessIfNotProcessing from '~/js/mixins/ProcessIfNotProcessing'

    import bButton from 'bootstrap-vue/es/components/button/button'
    import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'
    import bFormInput from 'bootstrap-vue/es/components/form-input/form-input'
    import bFormInvalidFeedback from 'bootstrap-vue/es/components/form/form-invalid-feedback'
    // import bFormTextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea'

    export default {
        components: {
            bButton,
            bFormGroup,
            bFormInput,
            bFormInvalidFeedback,
            // bFormTextarea,
        },
		mixins: [
			ErrorsAndProcessing,
			ProcessIfNotProcessing,
		],
		data() {
			return {
				user: undefined
			}
		},
		beforeMount() {
			this.retrieveUser()
		},
		methods: {
			retrieveUser() {
				axios.get('/api/admin/profile').then(response => {
					this.user = response.data
				}).catch(e => {
					console.error(e)
					this.errors = e.response.data
				})
			},
			submit() {
				this.processIfNotProcessing(
					axios.patch('/api/admin/profile').then(response => {
						this.user = response.data
						this.$store.state.notifications = [{
							type: 'success',
							message: 'Profile updated'
						}]
					}).catch(e => {
						console.error(e)
						this.errors = e.response.data
						this.$store.state.notifications = [{
							type: 'danger',
							message: 'Profile could not be updated'
						}]
					})
				)
			}
		}
	}
</script>