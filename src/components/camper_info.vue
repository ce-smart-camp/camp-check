<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex xs12>
        <ImgUp v-model="form.pic" filename="pic_profile" />
      </v-flex>

      <v-flex md3 sm4 xs12>
        <v-text-field
          v-model="form.nid"
          label="เลขประจำตัวประชาชนไทย"
          mask="#-####-#####-##-#"
          readonly
        />
      </v-flex>

      <v-flex md3 sm4 xs12>
        <v-text-field v-model="form.name" label="ชื่อ" readonly />
      </v-flex>

      <v-flex md4 sm4 xs12>
        <v-text-field v-model="form.surname" label="นามสกุล" readonly />
      </v-flex>

      <v-flex md2 sm4 xs12>
        <v-text-field v-model="form.nickname" label="ชื่อเล่น" readonly />
      </v-flex>

      <v-flex md3 sm4>
        <v-select
          v-model="form.gender"
          :items="option.gender"
          label="เพศ"
          prepend-icon="wc"
          readonly
        />
      </v-flex>

      <v-flex md3 sm4>
        <v-text-field
          v-model="form.birth"
          label="วันเกิด"
          prepend-icon="cake"
          readonly
        />
      </v-flex>

      <v-flex md3 sm6>
        <v-select
          v-model="form.religion"
          :items="option.religion"
          label="ศาสนา"
          readonly
        />
      </v-flex>

      <v-flex md3 sm6>
        <v-select
          v-model="form.shirt"
          :items="option.shirtSize"
          label="ขนาดเสื้อ"
          readonly
        />
      </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
import ImgUp from "./../components/imageUpload";

const Options = options =>
  Object.entries(options).map(([value, text]) => ({ value, text }));

const religions = {
  atheist: "ไม่นับถือศาสนา",
  buddhist: "ศาสนาพุทธ",
  christianity: "ศาสนาคริสต์",
  islam: "ศาสนาอิสลาม",
  other: "ศาสนาอื่นๆ"
};

const genders = {
  man: "ชาย",
  female: "หญิง",
  other: "เพศอื่นๆ",
  unspecified: "ไม่ระบุ"
};

const shirtSizes = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL"
};

const religionOptions = Options(religions);
const genderOptions = Options(genders);
const shirtSizeOptions = Options(shirtSizes);

export default {
  components: {
    ImgUp
  },
  props: {
    form: {
      type: Object,
      default: function() {
        return {
          pic: "",
          nid: null,
          name: null,
          surname: null,
          nickname: null,
          gender: null,
          birth: null,
          religion: null,
          shirt: null
        };
      }
    }
  },
  data: () => ({
    option: {
      gender: genderOptions,
      religion: religionOptions,
      shirtSize: shirtSizeOptions
    }
  })
};
</script>
