<template>
  <v-card-text>
    <div class="my-3">
      <p>
        1.
        สมมติว่าน้องได้รับเครื่องมือที่ทำให้น้องเดินทางไปยังโลกอนาคตและย้อนกลับไปในอดีตได้
        น้องจะใช้เครื่องมือนี้ในการแก้ปัญหาด้านความเหลื่อมล้ำทางการศึกษาไทยที่เกิดขึ้นในปัจจุบันได้อย่างไร
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
        2. ให้น้องๆอธิบายตัวตนของตัวเองใน 3คำ และทำไมพี่ๆถึงต้องรับน้องเข้าค่าย
        CE Smart Camp #12
      </p>
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
        3. ถ้าพี่มีงานอย่างหนึ่งให้น้องทำซึ่งเป็นงานที่ยากมาก
        พี่ให้น้องจับคู่กับเพื่อนอีกหนึ่งคนและช่วยกันทำงาน
        โดยที่น้องเป็นคนที่เก่งมาก
        แต่เพื่อนของน้องเป็นคนที่ไม่มีทักษะทางด้านนี้มาก่อนเลย
        และงานนี้ไม่สามารถทำคนเดียวได้ น้องจะทำอย่างไรเพื่อให้งานนี้สำเร็จ
      </p>
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
    <div class="my-3">
      <p>
        4. ถ้ามีพลังวิเศษสามารถทำอะไรก็ได้ น้องๆจะใช้พลังวิเศษนั้นทำอะไร
        เพราะอะไร
      </p>
    </div>
    <v-textarea
      v-model="form.item4"
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
      item3: null,
      item4: null
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
