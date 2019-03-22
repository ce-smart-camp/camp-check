<template>
  <v-card-text>
    <div class="my-3">
      <p>
        9. มีวัตถุดิบ 10อย่าง โดยวัตถุดิบทุกอย่างสามารถนำไปนึ่ง ลวก ย่าง หรือทอด
        กระบวนการใดกระบวนการหนึ่ง ก่อนนำไปปรุงด้วยสูตรลับเฉพาะ
        หากเลือกวัตถุดิบมา 3อย่าง จะมีวิธีทำอาหารกี่วิธีจงแสดงวิธีทำ
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
        10. มีอะไรจะถามพี่ไหม
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
        11. EXTRA เลือกทำ 1ข้อ (หากทำมากกว่า 1
        ข้อจะคิดคะแนนข้อที่ได้น้อยที่สุด)<br />
        <br />
        A) จงเขียนอะไรก็ได้ที่คิดว่าพี่อ่านแล้วจะหัวเราะ<br />
        B) จงแต่งเรื่องราวที่ประกอบด้วยคำทุกคำต่อไปนี้ ["ไทยแลนด์ 4.0",
        "อัตราส่วนทองคำ", "ทฎษฎีสัมพันธ์ภาพพิเศษ", "DNA", "IoT", "ก็มาดิครับ",
        "ปัดทุ่มด้วยโพเดียม", "หมี่หยก", "BNK48", "PM 2.5"]<br />
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
          item3: null
        };
      }
    }
  }
};
</script>
