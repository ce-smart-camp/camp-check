<template>
  <div class="text-xs-center">
    <v-img :src="imageUrl" max-height="300" contain />

    <v-alert
      :value="readonly && (imageUrl === '' || imgMD5 === '')"
      type="warning"
    >
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
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "อัปโหลด"
    },
    filename: {
      type: String,
      default: "image"
    }
  },
  data: () => ({
    imageUrl: "",
    fileRef: null,
    imgMD5: ""
  }),
  watch: {
    value(val) {
      this.imgMD5 = val;
      if (val !== "") this.loadImg();
    }
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
