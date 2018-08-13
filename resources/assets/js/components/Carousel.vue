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
        watch: {
            images(images) {
                this.reconfigure();
            }
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
            window.addEventListener('load', this.configure, true);
        },
        beforeDestroy() {
            window.removeEventListener('load', this.configure, true);
        },
        methods: {
            configure() {
                if (screenfull.enabled) {
                    screenfull.on("change", () => {
                        this.isFullscreen = screenfull.isFullscreen;
                    });
                }

                this.componentID = btoa(Math.random()).substring(0, 12);
                this.owlID = btoa(Math.random()).substring(0, 12);
                this.paginatorOwlID = btoa(Math.random()).substring(0, 12);

                this.$nextTick(() => {
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
                                    items: 5
                                },
                                1600: {
                                    items: 5
                                },
                                1920: {
                                    items: 5
                                },
                                2560: {
                                    items: 5
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
            reconfigure() {
                this.owl && this.owl.off();
                $(`#${this.owlID}`).off();
                $(`#${this.paginatorOwlID}`).off();
                $(".owl-carousel").owlCarousel("destroy");
                this.owl = undefined;
                this.owlID = undefined;
                this.componentID = undefined;
                this.paginatorOwlID = undefined;
                this.paginatorCarousel = undefined;
                this.isFullscreen = false;
                this.paginatorItemCount = 0;
                this.configure();
            },
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
                $(`#${this.paginatorOwlID} .owl-item`).on("click", function () {
                    t.owl.trigger("to.owl.carousel", this.childNodes[0].dataset.index, 3000);
                });
            }
        },
        render(h) {
            const t = this;
            if (this.images && this.images.length) {
                return h(
                    "div",
                    {
                        attrs: {
                            id: t.componentID,
                        },
                        class: {
                            carousel: true
                        },
                        on: {
                            keyup(e) {
                                if (e.keyCode === 27) {
                                    return t.exitFullscreen();
                                }
                            }
                        }
                    },
                    [
                        h(
                            "div",
                            {
                                class: {
                                    "carousel-primary": true,
                                    "carousel-fullscreen": t.isFullscreen
                                }
                            },
                            [
                                (
                                    screenfull.enabled ?
                                        screenfull.isFullscreen ?
                                        h(
                                            "font-awesome-layers",
                                            {
                                                attrs: {
                                                    role: "button"
                                                },
                                                class: {
                                                    "fa-3x": true,
                                                    "arrows-icon": true
                                                },
                                                on: {
                                                    click: t.exitFullscreen
                                                }
                                            },
                                            [
                                                h(
                                                    "font-awesome-icon",
                                                    {
                                                        attrs: {
                                                            icon: "circle",
                                                            style: "color: rgba(128, 67, 152, 0.25);"
                                                        }
                                                    }
                                                ),
                                                h(
                                                    "font-awesome-icon",
                                                    {
                                                        attrs: {
                                                            transform: "shrink-6",
                                                            style: "color: white;"
                                                        },
                                                        props: {
                                                            icon: ['far', 'compress-alt'],
                                                        }
                                                    }
                                                )
                                            ]
                                        )
                                        :
                                        h(
                                            "font-awesome-layers",
                                            {
                                                attrs: {
                                                    role: "button"
                                                },
                                                class: {
                                                    "fa-3x": true,
                                                    "arrows-icon": true
                                                },
                                                on: {
                                                    click(e) {
                                                        t.activateFullscreen(`#${t.componentID} .carousel-primary`);
                                                    }
                                                },
                                            },
                                            [
                                                h(
                                                    "font-awesome-icon",
                                                    {
                                                        attrs: {
                                                            icon: "circle",
                                                            style: "color: rgba(128, 67, 152, 0.25);"
                                                        }
                                                    }
                                                ),
                                                h(
                                                    "font-awesome-icon",
                                                    {
                                                        attrs: {
                                                            transform: "shrink-6",
                                                            style: "color: white;"
                                                        },
                                                        props: {
                                                            icon: ['far', 'expand-alt'],
                                                        }
                                                    }
                                                )
                                            ]
                                        )
                                    : undefined
                                ),
                                h(
                                    "div",
                                    {
                                        attrs: {
                                            id: t.owlID,
                                            role: "button"
                                        },
                                        class: {
                                            "owl-carousel": true
                                        }
                                    },
                                    t.images.map((image, index) =>
                                        h(
                                            "responsive-image",
                                            {
                                                attrs: {
                                                    "data-index": index,
                                                    "alt": image.reference
                                                },
                                                props: {
                                                    "key": image.reference,
                                                    "ratio-x": t.calculateRatioX,
                                                    "ratio-y": t.calculateRatioY,
                                                    "src": image.path
                                                }
                                            }
                                        )
                                    )
                                )
                            ]
                        ),
                        (
                            t.showPagination ?
                                h(
                                    "div",
                                    {
                                        attrs: {
                                            id: t.paginatorOwlID,
                                            role: "button"
                                        },
                                        class: {
                                            "owl-carousel": true,
                                            "mt-5": true,
                                            "carousel-paginator": true,
                                            "d-none": true,
                                            "d-md-block": true
                                        }
                                    },
                                    t.images.map((image, index) =>
                                        h(
                                            "responsive-image",
                                            {
                                                attrs: {
                                                    "data-index": index,
                                                    "alt": image.reference
                                                },
                                                props: {
                                                    "key": image.reference,
                                                    "ratio-x": t.calculateRatioX,
                                                    "ratio-y": t.calculateRatioY,
                                                    "src": image.path
                                                }
                                            }
                                        )
                                    )
                                )
                                :
                                undefined
                        )
                    ]
                )
            }
        }
    }
</script>
