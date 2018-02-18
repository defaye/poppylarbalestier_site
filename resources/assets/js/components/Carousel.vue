<style type="scss" scoped>
    .embed-responsive-item {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
<template>
    <div v-if="images" class="owl-carousel" @click="nextImage">
        <div class="embed-responsive embed-responsive-4by3" v-for="(path, index) in images" :key="index">
            <div class="embed-responsive-item" :alt="index" :style="backgroundImageStyle(path)"></div>
        </div>
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
            },
            backgroundImageStyle(path) {
                return `background-image: url("${path}");`;
            }
        }
    }
</script>
