<template>
  <div>
    <button
      @click="$refs['staged-files'].show()"
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
      style="display: none"
      type="file"
    />
    <BModal ref="staged-files" title="Upload Images" size="lg">
      <template #default>
        <label for="input" class="btn btn-primary w-100 mb-3"
          >Choose images</label
        >
        <div v-if="images.length">
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-4 col-xl-3 mb-1"
              v-for="(image, index) in images"
              :key="index"
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
        </div>
      </template>
      <template #modal-footer>
        <button
          :disabled="processing"
          @click.prevent="upload"
          class="btn btn-primary w-100 mt-2"
          type="button"
          v-if="images.length"
        >
          Upload
        </button>
        <button
          class="btn btn-secondary mt-2"
          data-dismiss="modal"
          type="button"
        >
          Cancel
        </button>
      </template>
    </BModal>
  </div>
</template>
<script>
"use strict";
import ProcessIfNotProcessing from "~/js/mixins/ProcessIfNotProcessing";
import { BModal } from "bootstrap-vue";

export default {
  components: {
    BModal,
  },
  mixins: [ProcessIfNotProcessing],
  props: {
    multiple: Boolean,
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      images: [],
    };
  },
  computed: {
    processing: {
      get() {
        return this.$store.state.processing;
      },
      set(processing) {
        this.$store.state.processing = processing === true;
      },
    },
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
      this.$refs["staged-files"].show();

      Array.prototype.forEach.call(e.currentTarget.files, async (file) => {
        if (/^image\//.test(file.type)) {
          let src = await this.readFile(file);
          this.images.push({
            file,
            src,
          });
        } else {
          console.error("Invalid format", file);
        }
      });
    },
    upload() {
      const formData = new FormData();
      this.images.forEach((image) => {
        formData.append("images[]", image.file);
      });
      const uploadPromise = axios
        .post(this.url, formData)
        .then((response) => {
          this.images = [];
          this.$emit("change", response.data);
          this.$refs["staged-files"].hide();
        })
        .catch((e) => {
          console.error(e);
          this.errors = e.response.data;
        });

      this.processIfNotProcessing(uploadPromise)
    },
    download(image) {
      window.open(image.src, "_blank");
    },
  },
};
</script>
