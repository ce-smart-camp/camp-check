<template>
  <v-card-text>
    <div class="my-3">
      <p>
        4.
        น้องๆคิดว่าในค่ายของเราจะใช้อุปกรณ์ทางอิเล็กทรอนิกส์หรือโมดูลอะไรบ้างลองยกตัวอย่างมาให้มากที่สุด
      </p>
    </div>
    <v-textarea
      v-model="form.item1"
      class="nolabel"
      rows="8"
      box
      single-line
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <div class="my-3">
      <p>
        5. จากรูป จงตอบคำถามต่อไปนี้<br />
        1) เมื่อต่อวงจรตามรูปจะเกิดอะไรขึ้น
        และจงหาความดันตกคร่อมของตัวต้านทานแต่ละตัว<br />
        2) ถ้านำแบตความดัน 9V มาต่อเพิ่มที่จุด A
        โดยให้ขั้วบวกต่อเข้ากับตัวต้านทาน R2 จะเกิดอะไรขึ้น
        และจงหาความดันตกคร่อมของตัวต้านทานแต่ละตัว
      </p>
      <v-img
        :src="require('../assets/question/q-2-2.webp')"
        contain
        max-height="370px"
      ></v-img>
    </div>
    <v-textarea
      v-model="form.item2"
      class="nolabel"
      rows="8"
      box
      single-line
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <div class="my-3">
      <p>
        6. จากวงจรด้านล่าง ถ้าถ่าน 9V ยังมีประจุอยู่ หากกดสวิตซ์จะเกิดอะไรขึ้น
      </p>
      <v-img
        :src="require('../assets/question/q-2-3.webp')"
        contain
        max-height="270px"
      ></v-img>
    </div>
    <v-textarea
      v-model="form.item3"
      class="nolabel"
      rows="8"
      box
      single-line
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
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
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    form: {
      item1: null,
      item2: null,
      item3: null
    }
  }),
  watch: {
    form: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true
    },
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
