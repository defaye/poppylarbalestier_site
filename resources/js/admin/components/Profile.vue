<template>
	<div>
        <errors v-model="errors"></errors>
	    <div class="card">
	        <div class="card-header">
	        	My Profile
	        </div>
	        <div class="card-body" v-if="editableUser">
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
		                    v-model.trim="editableUser.name"
		                >
		                </b-form-input>
		                <div v-if="errors.has('name')" class="invalid-feedback">
		                    {{ errors.get('name').join(' ').trim() }}
		                </div>
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
		                    v-model.trim="editableUser.email"
		                >
		                </b-form-input>
		                <div v-if="errors.has('email')" class="invalid-feedback">
		                    {{ errors.get('email').join(' ').trim() }}
		                </div>
		            </b-form-group>
		            <b-form-group :label="'Password' + (isCurrentPasswordRequired ? ' (required)' : ' (optional)')" label-for="password">
		                <b-form-input
		                    :disabled="processing"
		                    :required="isCurrentPasswordRequired"
		                    :state="errors.has('password') ? false : null"
		                    autofocus
		                    id="password"
		                    placeholder="Enter your password..."
		                    tabindex="1"
		                    type="password"
		                    v-model.trim="editableUser.password"
		                >
		                </b-form-input>
		                <div v-if="errors.has('password')" class="invalid-feedback">
		                    {{ errors.get('password').join(' ').trim() }}
		                </div>
		                <div class="form-text">
		                	<small>Please enter your current password if you modify your e-mail address or password.</small>
		                </div>
		            </b-form-group>
		            <div>
		            	<div class="row">
		            		<div class="col">
					            <b-form-group label="New Password" label-for="new_password">
					                <b-form-input
					                    :disabled="processing"
					                    :required="editableUser.new_password_confirmation == true"
					                    :state="errors.has('new_password') ? false : null"
					                    autofocus
					                    id="new_password"
					                    placeholder="Enter your new password..."
					                    tabindex="1"
					                    type="password"
					                    v-model.trim="editableUser.new_password"
					                >
					                </b-form-input>
					                <div v-if="errors.has('new_password')" class="invalid-feedback">
					                    {{ errors.get('new_password').join(' ').trim() }}
					                </div>
					            </b-form-group>
		            		</div>
		            		<div class="col">
					            <b-form-group label="New Password Confirmation" label-for="new_password_confirmation">
					                <b-form-input
					                    :disabled="processing"
					                    :required="editableUser.new_password == true"
					                    :state="errors.has('new_password_confirmation') ? false : null"
					                    autofocus
					                    id="new_password_confirmation"
					                    placeholder="Enter your new password..."
					                    tabindex="1"
					                    type="password"
					                    v-model.trim="editableUser.new_password_confirmation"
					                >
					                </b-form-input>
					                <div v-if="errors.has('new_password_confirmation')" class="invalid-feedback">
					                    {{ errors.get('new_password_confirmation').join(' ').trim() }}
					                </div>
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
    // import bFormInvalidFeedback from 'bootstrap-vue/es/components/form/form-invalid-feedback'
    // import bFormTextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea'

    export default {
        components: {
            bButton,
            bFormGroup,
            bFormInput,
            // bFormInvalidFeedback,
            // bFormTextarea,
        },
		mixins: [
			ErrorsAndProcessing,
			ProcessIfNotProcessing,
		],
		data() {
			return {
				user: undefined,
				editableUser: undefined,
			}
		},
		computed: {
			isCurrentPasswordRequired() {
				return (this.user.email !== this.editableUser.email)
					|| (typeof this.editableUser.new_password === 'string' && this.editableUser.new_password !== '')
			}
		},
		beforeMount() {
			this.retrieveUser()
		},
		methods: {
			setUsers(user) {
				this.user = Object.assign({}, user)
				this.editableUser = Object.assign({}, user)
			},
			retrieveUser() {
				axios.get('/api/admin/profile').then(response => {
					this.setUsers(response.data)
				}).catch(e => {
					console.error(e)
					this.errors = e.response.data
				})
			},
			submit(event) {
				event.preventDefault()
				this.processIfNotProcessing(
					axios.patch('/api/admin/profile', this.editableUser).then(response => {
						this.setUsers(response.data)
						this.$store.state.notifications = [{
							type: 'success',
							message: 'Profile updated'
						}]
						this.errors.clear()
					}).catch(e => {
						this.errors = e.response.data
						console.error(e)
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
