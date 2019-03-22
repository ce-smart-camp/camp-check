<template>
  <div class="text-xs-center">
    <v-img :src="imageUrl" max-height="500" contain />

    <v-alert :value="value === ''" type="warning">
      น้องๆไม่ได้อัปโหลดรูปภาพ
    </v-alert>
  </div>
</template>

<script>
import firebase from "./../core/firebase";

export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    filename: {
      type: String,
      default: "image"
    }
  },
  data: () => ({
    imageUrl: "",
    fileRef: null
  }),
  mounted() {
    if (this.value !== "") this.loadImg();
  },
  methods: {
    loadImg() {
      this.setupFileRef();

      this.fileRef
        .getDownloadURL()
        .then(url => {
          this.imageUrl = url;
        })
        .catch(function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              break;
            default:
              throw error;
          }
        });
    },

    setupFileRef() {
      if (this.fileRef === null) {
        var filePath = this.$route.params.id + "/" + this.filename;
        this.fileRef = firebase.storage().ref(filePath);
      }
    }
  }
};
</script>
