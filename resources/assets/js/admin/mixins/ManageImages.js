export default {
    methods: {
            assignImages(object, images) {
                console.log(images);
                this.$store.commit("status", {
                    type: "success",
                    message: "Images uploaded"
                });
                images.forEach(image => {
                    object.images.push(Object.assign({}, image));
                });
            },
            async deleteImage(object, image, index) {
                try {
                    const response = await axios.delete(`/api/admin/images/${image.id}`);
                    if (response.data) {
                        this.$store.commit("status", {
                            type: "success",
                            message: "Image deleted"
                        });
                        this.$delete(object.images, index);
                    }
                } catch (e) {
                    console.error(e.response.data);
                }
            }
    }
}
