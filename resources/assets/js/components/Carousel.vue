<style lang="scss">
    .paginator-carousel {
        .owl-item.active:not(.center) .embed-responsive .embed-responsive-item::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            background: none;
        }
        .owl-item.active.center .embed-responsive .embed-responsive-item::after {
            -webkit-transition: background .25s ease-in-out, opacity .2s ease-in-out;
            transition: background .25s ease-in-out, opacity .2s ease-in-out;
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 1;
            background: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 75%);
            background: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 75%);
            background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 75%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=1 );
        }
        .owl-stage-outer {
            padding-top: 1rem;
            &::before,
            &::after {
                content: "";
                display: block;
                position: absolute;
                text-decoration: none;
                top: 0;
                bottom: 0;
                width: .8rem;
                height: auto;
                z-index: 10;
                pointer-events: none;
                background-repeat: no-repeat;
                background-size: 1px 100%, .5rem 100%;
            }
            &::before {
                left: 0;
                background-image: linear-gradient(transparent, rgba(0, 0, 0, .2) 25%, rgba(0, 0, 0, .3) 75%, transparent), radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, .4), transparent);
                background-position: 0 0, 0 0;
            }
            &::after {
                right: 0;
                background-image: linear-gradient(transparent, rgba(0, 0, 0, .2) 25%, rgba(0, 0, 0, .3) 75%, transparent), radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, .4), transparent);
                background-position: 100% 0, 100% 0;
            }
        }
    }
</style>
<template>
    <div v-if="images">
        <div :id="mainId" class="owl-carousel" role="button">
            <responsive-image v-for="(path, index) in images" :key="path" :src="path" :alt="index" :ratio-x="ratioX" :ratio-y="ratioY" :data-index="index"></responsive-image>
        </div>
        <div :id="secondaryId" class="owl-carousel mt-5 paginator-carousel" role="button" v-if="paginator">
            <responsive-image v-for="(path, index) in images" :key="path" :src="path" :alt="index" :ratio-x="ratioX" :ratio-y="ratioY" :data-index="index"></responsive-image>
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
            ratioX: {
                type: String|Number,
                required: true
            },
            ratioY: {
                type: String|Number,
                required: true
            },
            paginator: Boolean
        },
        data() {
            return {
                main: undefined,
                mainId: undefined,
                secondary: undefined,
                secondaryId: undefined
            };
        },
        mounted() {
            this.mainId = btoa(Math.random()).substring(0, 12);
            this.secondaryId = btoa(Math.random()).substring(0, 12);

            $(document).ready(() => {
                if (this.paginator) {
                    this.secondary = $(`#${this.secondaryId}`).owlCarousel({
                        center: true,
                        autoplay: false,
                        responsiveClass: true,
                        responsive: {
                            0: {
                                items: 0
                            },
                            600: {
                                items: 3
                            },
                            1000: {
                                items: 5
                            }
                        },
                        margin: 1,
                        lazyLoad: true,
                        loop: true,
                        mouseDrag: false,
                    });
                }

                this.main = $(`#${this.mainId}`).owlCarousel({
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

                if (this.paginator) {
                    this.main.on("changed.owl.carousel", event => {
                        this.secondary.trigger("to.owl.carousel", event.page.index, 3000);
                        this.attachNavigationEvents();
                    });
                    this.attachNavigationEvents();
                }

                $(`#${this.mainId}`).on("click", () => {
                    this.main.trigger("next.owl.carousel");
                });
            });
        },
        methods: {
            attachNavigationEvents() {
                let t = this;
                $(`#${this.secondaryId} .owl-item`).one("click", function () {
                    t.main.trigger("to.owl.carousel", this.childNodes[0].dataset.index, 3000);
                });
            }
        }
    }
</script>
