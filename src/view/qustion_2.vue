<template>
  <v-card-text>
    <div class="my-3">
      <p>
        5. ถ้าโลกกำลังจะแตกในอีก 1นาที
        น้องๆจะทำอะไรก่อนโลกจะแตก(ไม่เกี่ยวกับครอบครัว) เพราะอะไร
      </p>
    </div>
    <v-textarea
      v-model="form.item1"
      class="nolabel"
      rows="8"
      box
      single-line
      readonly
    />
    <div class="my-3">
      <p>
        6. ถ้าน้องสามารถเลือกเป็นคนกล้าหาญ หรือเป็นคนมีเมตตา
        ได้อย่างใดอย่างหนึ่งน้องจะเลือกเป็นอะไร เพราะอะไร
      </p>
    </div>
    <v-textarea
      v-model="form.item2"
      class="nolabel"
      rows="8"
      box
      single-line
      readonly
    />
    <div class="my-3">
      <p>
        7. ถ้าน้องต้องเลือกจับกลุ่มทำงานกับคน 2คน ใน 3คนต่อไปนี้ น้องจะเลือกใคร
        เพราะเหตุใด<br />
        <br />
        A. คนที่มนุษยสัมพันธ์แย่ พูดไม่รักษาน้ำใจ เก่งเฉพาะเรื่องที่สนใจ<br />
        B. คนที่ไม่เกรงใจ พูดเสียงดัง บ่นทุกสิ่งที่ไม่พอใจ ไม่มีความรับผิดชอบ<br />
        C. ทำงานเอาหน้า กลับกลอก มีมนุษยสัมพันธ์ดี<br />
      </p>
    </div>
    <v-textarea
      v-model="form.item3"
      class="nolabel"
      rows="8"
      box
      single-line
      readonly
    />
    <div class="my-3">
      <p>
        8. ขณะที่น้องเดินชมผลงานที่สร้างโดยวิศวกรคอมพิวเตอร์ชื่อดัง
        น้องเห็นผลงานชิ้นหนึ่ง และหยุดพิจารณาดูผลงานนั้นอยู่นาน ผลงานนั้นคือ…?
      </p>
    </div>
    <v-textarea
      v-model="form.item4"
      class="nolabel"
      rows="8"
      box
      single-line
      readonly
    />
  </v-card-text>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: function() {
        return {
          item1: null,
          item2: null,
          item3: null,
          item4: null
        };
      }
    }
  }
};
</script>
