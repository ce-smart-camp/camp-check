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
    form: {
      type: Object,
      default: function() {
        return {
          school: null,
          province: null,
          class: null,
          plan: null,
          gpax: null
        };
      }
    }
  },
  data: () => ({
    gradesOptions
  }),
  computed: {
    classRaw() {
      if (typeof grades[this.form.class] !== "undefined") {
        return {
          value: this.form.class,
          text: grades[this.form.class]
        };
      } else {
        return this.form.class;
      }
    }
  }
};
</script>
