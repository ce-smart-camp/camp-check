<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex sm3>
        <v-text-field v-model="form.number" label="บ้านเลขที่" readonly />
      </v-flex>

      <v-flex sm3>
        <v-text-field v-model="form.moo" label="หมู่ที่" mask="##" readonly />
      </v-flex>

      <v-flex sm6>
        <v-text-field v-model="form.alley" label="ตรอก / ซอย" readonly />
      </v-flex>

      <v-flex sm4>
        <v-text-field v-model="form.village" label="หมู่บ้าน" readonly />
      </v-flex>

      <v-flex sm4>
        <v-text-field v-model="form.road" label="ถนน" readonly />
      </v-flex>

      <v-flex sm4>
        <v-text-field v-model="form.subdistrict" label="ตำบล / แขวง" readonly />
      </v-flex>

      <v-flex sm4>
        <v-text-field v-model="form.district" label="อำเภอ / เขต" readonly />
      </v-flex>

      <v-flex sm4>
        <v-text-field v-model="form.province" label="จังหวัด" readonly />
      </v-flex>

      <v-flex sm4>
        <v-text-field v-model="form.pcode" label="รหัสไปรษณีย์" readonly />
      </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: function() {
        return {
          number: null,
          moo: null,
          alley: null,
          village: null,
          road: null,
          subdistrict: null,
          district: null,
          province: null,
          pcode: null
        };
      }
    }
  }
};
</script>
