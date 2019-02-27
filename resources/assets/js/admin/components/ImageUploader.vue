<template>
    <div>
        <button
            @click="modal('show')"
            class="btn btn-primary w-100"
            type="button"
        >
            Upload Images
        </button>
        <input
            :multiple="multiple"
            @change="handleChange"
            accept="image/*"
            id="input"
            style="display: none;"
            type="file"
        >
        <div id="staged-files" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Upload Images</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label for="input" class="btn btn-primary w-100 mb-3">Choose images</label>
                        <div v-if="images.length">
                            <div class="row">
                                <div
                                    class="col-12 col-md-6 col-lg-4 col-xl-3 mb-1"
                                    v-for="(image, index) in images"
                                >
                                    <div class="card">
                                        <div class="card-header">
                                            <span>{{ image.file.name }}</span>
                                            <button
                                                :disabled="processing"
                                                aria-label="Unstage image"
                                                class="close"
                                                type="button"
                                            >
                                                <span
                                                    @click.prevent="$delete(images, index)"
                                                    aria-hidden="true"
                                                >
                                                    &times;
                                                </span>
                                            </button>
                                        </div>
                                        <div class="card-body">
                                            <div
                                                class="embed-responsive embed-responsive-4by3 rounded"
                                                @dblclick="download(image)"
                                            >
                                                <div
                                                    :style="`background-image: url(${image.src}); background-position: center; background-size: cover; background-repeat: no-repeat;`"
                                                    :title="image.name"
                                                    class="embed-responsive-item"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="row">
                                <div class="col">
                                    <button class="btn btn-primary w-100 mt-2" @click.prevent="upload">Upload</button>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            :disabled="processing"
                            @click.prevent="upload"
                            class="btn btn-primary w-100 mt-2"
                            type="button"
                            v-if="images.length"
                        >
                            Upload
                        </button>
                        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                        <button
                            class="btn btn-secondary mt-2"
                            data-dismiss="modal"
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
<!--         <div v-if="images.length">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-1" v-for="(image, index) in images">
                    <div class="card">
                        <div class="card-header">
                            <span>{{ image.name }}</span>
                            <button type="button" class="close" aria-label="Unstage image">
                                <span aria-hidden="true" @click.prevent="deleteImage(index)">&times;</span>
                            </button>
                        </div>
                        <div class="card-body">
                            <div class="embed-responsive embed-responsive-4by3 rounded">
                                <div class="embed-responsive-item" :style="`background-image: url(${image.path}); background-position: center; background-size: cover; background-repeat: no-repeat;`" :title="image.name"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
    'use strict'
    import ProcessIfNotProcessing from '~/js/mixins/ProcessIfNotProcessing'

    export default {
        mixins: [
            ProcessIfNotProcessing
        ],
        props: {
            multiple: Boolean,
            url: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                images: []
            }
        },
        // watch: {
        //     images(images) {
        //         this.$emit('change', images)
        //         // this.$emit('change', images.map(image => image.file))
        //     }
        // },
        // mounted() {
        //     $('#staged-files').on('hidden.bs.modal', e => {
        //         // console.log(e)
        //     })
        // },
        computed: {
            processing: {
                get() {
                    return this.$store.state.processing
                },
                set(processing) {
                    this.$store.state.processing = processing === true
                }
            }
        },
        methods: {
            modal(options) {
                $('#staged-files').modal(options)
            },
            readFile(file) {
                return new Promise((resolve, reject) => {
                    let fr = new FileReader()
                    fr.onload = () => {
                        resolve(fr.result)
                    }
                    fr.readAsDataURL(file)
                })
            },
            handleChange(e) {
                this.modal('show')
                Array.prototype.forEach.call(
                    e.currentTarget.files,
                    new Promise((resolve, reject) => {
                        try {
                            if (/^image\//.test(file.type)) {
                                this.readFile(file).then(src => {
                                    resolve(
                                        this.images.push({
                                            file,
                                            src
                                        })
                                    )
                                }).catch(e => {
                                    reject(e)
                                })
                                // this.images.push({
                                //     file,
                                //     lastModified: file.lastModified,
                                //     lastModifiedDate: file.lastModifiedDate,
                                //     name: file.name,
                                //     size: file.size,
                                //     src,
                                //     type: file.type,
                                // })
                            } else {
                                // console.error('Invalid format', file)
                            }           
                        } catch (e) {
                            reject(e)
                        }
                    })
                )
                // Array.prototype.forEach.call(e.currentTarget.files, async file => {
                //     if (/^image\//.test(file.type)) {
                //         let src = await this.readFile(file)
                //         this.images.push({
                //             file,
                //             src
                //         })
                //         // this.images.push({
                //         //     file,
                //         //     lastModified: file.lastModified,
                //         //     lastModifiedDate: file.lastModifiedDate,
                //         //     name: file.name,
                //         //     size: file.size,
                //         //     src,
                //         //     type: file.type,
                //         // })
                //     } else {
                //         // console.error('Invalid format', file)
                //     }
                // })
            },
            upload() {
                this.processWhilstNotProcessing(
                    (() => {
                            const formData = new FormData()
                            this.images.forEach(image => {
                                formData.append('images[]', image.file)
                            })
                            return axios.post(this.url, formData).then(response => {
                                this.images = []
                                this.$emit('change', response.data)
                                this.modal('hide')
                            }).catch(e => {
                                console.error(e)
                                this.errors = e.response.data
                            })
                            
                        }
                    )()
                )
            },
            // handleChange(e) {
            //     Array.prototype.forEach.call(e.currentTarget.files, async file => {
            //         if (/^image\//.test(file.type)) {
            //             // let src = await this.readFile(file)
            //             let formData = new FormData()
            //             formData.append("image", file)
            //             try {
            //                 let response = await axios.post(this.url, formData)
            //                 this.images.push(response.data)
            //             } catch (e) {
            //                 this.errors = e.response.data
            //                 return
            //             }
            //             console.log(file)
            //             // this.images.push({
            //             //     file,
            //             //     lastModified: file.lastModified,
            //             //     lastModifiedDate: file.lastModifiedDate,
            //             //     name: file.name,
            //             //     size: file.size,
            //             //     src,
            //             //     type: file.type,
            //             // })
            //         } else {
            //             // console.error("Invalid format", file)
            //         }
            //     })
            // },
            cancelUpload() {

            },
            download(image) {
                window.open(image.src, '_blank')
            }
        }
    }
</script>
