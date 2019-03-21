<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex sm6 xs12>
        <v-text-field v-model="form.name" label="ชื่อ" readonly />
      </v-flex>

      <v-flex sm6 xs12>
        <v-text-field v-model="form.surname" label="นามสกุล" readonly />
      </v-flex>

      <v-flex sm6 xs12>
        <v-combobox
          v-model="form.relation"
          label="ความเกี่ยวข้อง"
          :items="itemsRelation"
          readonly
        />
      </v-flex>

      <v-flex sm6 xs12>
        <v-text-field v-model="form.tel" label="หมายเลขโทรศัพท์" readonly />
      </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: () => ({
    itemsRelation: [
      "บิดา",
      "คุณพ่อ",
      "มารดา",
      "คุณแม่",
      "พี่",
      "พี่ชาย",
      "พี่สาว",
      "คุณปู่",
      "คุณย่า",
      "คุณตา",
      "คุณยาย",
      "คุณลุง",
      "คุณป้า",
      "คุณน้า",
      "คุณอา"
    ],
    form: {
      name: null,
      surname: null,
      relation: null,
      tel: null
    }
  }),
  watch: {
    value: {
      handler(val) {
        this.form = val;
      },
      deep: true
    }
  },
  mounted: function() {
    if (this.value !== null) {
      Object.keys(this.form).forEach(key => {
        this.form[key] = this.value[key] || null;
      });
    }
    this.$emit("input", this.form);
  }
};
</script>
