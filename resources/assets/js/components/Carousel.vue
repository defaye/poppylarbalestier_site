<template>
    <div v-if="images" class="owl-carousel" @click="nextImage" role="button">
        <responsive-image v-for="(path, index) in images" :key="index" :src="path" :alt="index" :ratio-x="4" :ratio-y="3"></responsive-image>
    </div>
</template>
<script>
    "use strict";
    export default {
        props: {
            images: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                owl: undefined
            };
        },
        mounted() {
            $(document).ready(() => {
                this.owl = $(".owl-carousel").owlCarousel({
                    animateIn: "fadeIn",
                    animateOut: "fadeOut",
                    autoplay: true,
                    autoplayHoverPause: true,
                    autoplaySpeed: 5000,
                    autoplayTimeout: 5000,
                    items: 1,
                    lazyLoad: true,
                    loop: true,
                    mouseDrag: false,
                });
            });
        },
        methods: {
            nextImage() {
                this.owl.trigger("next.owl.carousel");
            }
        }
    }
</script>
