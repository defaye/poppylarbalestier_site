export default {
    data() {
        return {
            processing: false
        }
    },
    methods: {
        processing(callback) {
            this.processing = true;
            callback && callback.call(this);
            this.processing = false;
        }
    }
}
