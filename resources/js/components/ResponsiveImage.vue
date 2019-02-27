<style type='scss' scoped>
    .embed-responsive-item {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
<script>
    'use strict'
    export default {
        props: {
            alt: {
                type: String|Number,
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
            src: {
                type: String,
                required: true
            }
        },
        render(createElement) {
            return createElement(
                'div',
                {
                    class: {
                        'embed-responsive': true
                    },
                    style: {
                        'paddingTop': ((this.ratioY / this.ratioX) * 100) + '%'
                    }
                },
                [
                    createElement(
                        'div',
                        {
                            attrs: {
                                alt: this.alt
                            },
                            class: {
                                'embed-responsive-item': true
                            },
                            style: {
                                backgroundImage: `url('${this.src}')`
                            }
                        }
                    )
                ]
            )
        }
    }
</script>
