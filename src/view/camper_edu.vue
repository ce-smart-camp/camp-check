<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex sm8 xs12>
        <v-text-field v-model="form.school" label="โรงเรียน" readonly />
      </v-flex>

      <v-flex sm4 xs12>
        <v-text-field v-model="form.province" label="จังหวัด" readonly />
      </v-flex>

      <v-flex sm4 xs12>
        <v-combobox
          v-model="classRaw"
          label="ระดับชั้น (กำลังจะขึ้น)"
          :items="gradesOptions"
          readonly
        />
      </v-flex>

      <v-flex sm4 xs12>
        <v-text-field v-model="form.plan" label="แผนการศึกษา" readonly />
      </v-flex>

      <v-flex sm4 xs12>
        <v-text-field v-model="form.gpax" label="เกรดเฉลี่ย" readonly />
      </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
const Options = options =>
  Object.entries(options).map(([value, text]) => ({ value, text }));

const grades = {
  m4: "มัธยมศึกษาปีที่ 4",
  m5: "มัธยมศึกษาปีที่ 5",
  m6: "มัธยมศึกษาปีที่ 6",
  p1: "ปวช.1",
  p2: "ปวช.2",
  p3: "ปวช.3"
};

const gradesOptions = Options(grades);

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
    gradesOptions,
    classRaw: null,
    form: {
      school: null,
      province: null,
      class: null,
      plan: null,
      gpax: null
    }
  }),
  watch: {
    value: {
      handler(val) {
        this.form = val;
      },
      deep: true
    },
    "form.class"(val) {
      if (typeof grades[val] !== "undefined") {
        if (this.classRaw === null) this.classRaw = {};
        this.classRaw.value = val;
        this.classRaw.text = grades[val];
      } else {
        if (val != this.classRaw) this.classRaw = val;
      }
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
