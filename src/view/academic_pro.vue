<template>
  <v-card-text>
    <div class="my-3">
      <p>
        7. น้องเคยเขียนโปรแกรมหรือไม่ ถ้าเคยเขียน เขียนภาษาอะไรได้บ้าง
        ลองเขียนโปรแกรมภาษานั้นให้แสดงข้อความว่า<br />
        <center><code>\* “CE*Smart*Camp” #12 */</code></center>
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
        8. จาก Code arduino ด้านล่าง พี่ๆอยากให้น้องหาจุดผิด
        ที่ทำให้โปรแกรมไม่สามารถทำงานได้พร้อมแก้ไขให้ถูกต้อง (ถ้ามี)
        และแสดงผลลัพธ์ที่ได้ออกมาจากการทำงานของโปรแกรม<br />
        <i>(เขียนบรรทัดที่ผิด+จุดที่ผิด พร้อมแก้ไขให้ถูกต้อง)</i>
      </p>
      <v-img
        :src="require('../assets/question/q-3-2.webp')"
        contain
        max-height="450px"
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
        9. การที่ใบสมัครที่น้องกำลังทำนี้ จะเดินทางมาถึงพี่ๆได้
        พี่ๆอยากรู้ขั้นตอนดำเนินการทั้งหมดตั้งแต่เริ่มรู้จักค่ายนี้จนกว่าน้องๆจะติดค่าย
        CE Smart Camp #12 พี่ๆจึงอยากให้น้องลองเขียน Flowchart ให้พี่ๆ
        โดยต้องมีสัญลักษณ์ที่พี่ๆกำหนดให้ด้านล่างนี้เป็นส่วนประกอบ<br />
        <i>(Hint : ขั้นตอนดำเนินการอยู่ในเว็บไซต์สมัคร)</i>
      </p>
      <v-img
        :src="require('../assets/question/q-3-3.webp')"
        contain
        max-height="75px"
      ></v-img>
    </div>
    <ImgUp
      v-model="form.item3"
      :disabled="disable"
      :readonly="readonly"
      text="อัปโหลดรูปของคำตอบ"
      filename="q-3-3"
      class="pb-4"
    />
  </v-card-text>
</template>

<script>
import ImgUp from "./../components/imageUpload";

export default {
  components: {
    ImgUp
  },
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
      item3: ""
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
