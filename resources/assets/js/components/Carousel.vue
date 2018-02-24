<template>
    <div v-if="images" @keyup.escape="exitFullscreen" :id="componentID" :class="{ 'carousel-fullscreen': isFullscreen }" class="carousel">
        <div class="carousel-primary">
            <font-awesome-icon v-if="isFullscreen" class="arrows-icon" :icon="['far', 'compress-alt']" @click="exitFullscreen"></font-awesome-icon>
            <font-awesome-icon v-else class="arrows-icon" :icon="['far', 'expand-alt']" @click="activateFullscreen(`#${componentID}`)"></font-awesome-icon>
            <div :id="owlID" class="owl-carousel" role="button">
                <responsive-image v-for="(path, index) in images"
                                 :alt="index"
                                 :data-index="index"
                                 :key="path"
                                 :ratio-x="calculateRatioX"
                                 :ratio-y="isFullscreen && showPagination ? calculateRatioY - (calculateRatioY / paginatorItemCount) : calculateRatioY"
                                 :src="path"
                >
                </responsive-image>
            </div>
        </div>
        <div :id="paginatorOwlID" class="owl-carousel mt-5 carousel-paginator d-none d-md-block" role="button" v-if="showPagination">
            <responsive-image v-for="(path, index) in images"
                             :key="path"
                             :src="path"
                             :alt="index"
                             :ratio-x="calculateRatioX"
                             :ratio-y="calculateRatioY"
                             :data-index="index"
            >
            </responsive-image>
        </div>
    </div>
</template>
<script>
    "use strict";
    import * as screenfull from "screenfull";
    export default {
        props: {
            images: {
                type: Array,
                required: true
            },
            ratioX: {
                type: String|Number,
                required: true
            },
            ratioY: {
                type: String|Number,
                required: true
            },
            showPagination: Boolean
        },
        data() {
            return {
                owl: undefined,
                owlID: undefined,
                componentID: undefined,
                paginatorOwlID: undefined,
                paginatorCarousel: undefined,
                isFullscreen: false,
                paginatorItemCount: 0
            };
        },
        computed: {
            calculateRatioX() {
                return this.isFullscreen ? window.outerWidth : this.ratioX;
            },
            calculateRatioY() {
                return this.isFullscreen ? window.outerHeight : this.ratioY;
            }
        },
        mounted() {
            screenfull.on("change", () => {
                this.isFullscreen = screenfull.isFullscreen;
            });

            this.componentID = btoa(Math.random()).substring(0, 12);
            this.owlID = btoa(Math.random()).substring(0, 12);
            this.paginatorOwlID = btoa(Math.random()).substring(0, 12);

            $(document).ready(() => {
                if (this.showPagination) {
                    this.paginatorCarousel = $(`#${this.paginatorOwlID}`).owlCarousel({
                        center: true,
                        autoplay: false,
                        responsiveClass: true,
                        responsive: {
                            0: {
                                items: 0
                            },
                            768: {
                                items: 3
                            },
                            992: {
                                items: 5
                            },
                            1200: {
                                items: 7
                            },
                            1600: {
                                items: 9
                            },
                            1920: {
                                items: 11
                            },
                            2560: {
                                items: 15
                            }
                        },
                        margin: 5,
                        lazyLoad: true,
                        loop: true,
                        mouseDrag: false,
                    });
                }

                this.owl = $(`#${this.owlID}`).owlCarousel({
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

                if (this.showPagination) {
                    this.owl.on("changed.owl.carousel", event => {
                        this.paginatorCarousel.trigger("to.owl.carousel", event.page.index, 3000);
                        this.attachNavigationEvents();
                    });
                    this.owl.on("resize.owl.carousel", event => {
                        this.paginatorItemCount = this.$el.querySelectorAll(".carousel-paginator .owl-item.active").length;
                    });
                    this.attachNavigationEvents();
                    this.owl.on("initialized.owl.carousel", event => {
                        this.paginatorItemCount = this.$el.querySelectorAll(".carousel-paginator .owl-item.active").length;
                    });
                }

                $(`#${this.owlID}`).on("click", () => {
                    this.owl.trigger("next.owl.carousel");
                });
            });
        },
        methods: {
            activateFullscreen(selector) {
                screenfull.request(
                    selector ? document.querySelector(selector) : document.documentElement
                );
            },
            exitFullscreen() {
                screenfull.exit();
            },
            attachNavigationEvents() {
                let t = this;
                $(`#${this.paginatorOwlID} .owl-item`).one("click", function () {
                    t.owl.trigger("to.owl.carousel", this.childNodes[0].dataset.index, 3000);
                });
            }
        }
    }
</script>
