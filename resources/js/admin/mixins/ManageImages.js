'use strict'
import ErrorsAndProcessing from '~/js/mixins/ErrorsAndProcessing'

export default {
    mixins: [
        ErrorsAndProcessing
    ],
    methods: {
            assignImages(object, images) {
                console.log(images)
                this.$store.state.notifications = [{
                    type: 'success',
                    message: 'Images uploaded'
                }]
                images.forEach(image => {
                    object.images.push(Object.assign({}, image))
                })
            },
            async deleteImage(object, image, index) {
                try {
                    const response = await axios.delete(`/api/admin/images/${image.id}`)
                    if (response.data) {
                        this.$store.state.notifications = [{
                            type: 'success',
                            message: 'Image deleted'
                        }]
                        this.$delete(object.images, index)
                    }
                } catch (e) {
                    console.error(e.response.data)
                    this.errors = e.response.data
                }
            }
    }
}
