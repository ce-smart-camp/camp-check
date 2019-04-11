<template>
  <div class="text-xs-center">
    <v-img v-if="value" :src="imageUrl" max-height="500" contain />

    <v-alert :value="!value" type="warning">
      น้องๆไม่ได้อัปโหลดรูปภาพ
    </v-alert>

    <v-btn v-if="imageUrl" color="success" :href="imageUrl" target="_blank"
      >ดูรูป</v-btn
    >
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
  watch: {
    value(val) {
      this.imageUrl = "";
      this.fileRef = null;
      if (val) this.loadImg();
    }
  },
  mounted() {
    if (this.value) this.loadImg();
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
        let id = this.$route.params.id;
        if (!id) id = this.$store.state.list.qus[this.$route.params.idNum].id;

        this.fileRef = firebase.storage().ref(id + "/" + this.filename);
      }
    }
  }
};
</script>
