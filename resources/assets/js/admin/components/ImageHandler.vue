<template>
    <div>
        <label for="input" class="btn btn-primary w-100">Choose images</label>
        <input type="file" id="input" :multiple="multiple" @change="handleChange" style="display: none;" accept="image/*">
        <div v-if="images.length">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-1" v-for="(image, index) in images">
                    <div class="card">
                        <div class="card-header">
                            <span>{{ image.name }}</span>
                            <button type="button" class="close" aria-label="Unstage image">
                                <span aria-hidden="true" @click.prevent="$delete(images, index)">&times;</span>
                            </button>
                        </div>
                        <div class="card-block">
                            <div class="embed-responsive embed-responsive-4by3 rounded">
                                <div class="embed-responsive-item" :style="`background-image: url(${image.src}); background-position: center; background-size: cover; background-repeat: no-repeat;`" :title="image.name"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    "use strict";
    export default {
        props: {
            multiple: Boolean
        },
        data() {
            return {
                images: []
            }
        },
        watch: {
            images(images) {
                this.$emit("change", images.map(image => image.file));
            }
        },
        methods: {
            readFile(file) {
                return new Promise((resolve, reject) => {
                    let fr = new FileReader();
                    fr.onload = () => {
                        resolve(fr.result);
                    };
                    fr.readAsDataURL(file);
                });
            },
            handleChange(e) {
                Array.prototype.forEach.call(e.currentTarget.files, async file => {
                    if (/^image\//.test(file.type)) {
                        let src = await this.readFile(file);
                        console.log(file)
                        this.images.push({
                            file,
                            lastModified: file.lastModified,
                            lastModifiedDate: file.lastModifiedDate,
                            name: file.name,
                            size: file.size,
                            src,
                            type: file.type,
                        });
                    } else {
                        // console.error("Invalid format", file);
                    }
                })
            }
        }
    }
</script>
