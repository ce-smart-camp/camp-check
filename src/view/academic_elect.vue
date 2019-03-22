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
      readonly
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
        6. จากวงจรด้านล่าง ถ้าถ่าน 9V ยังมีประจุอยู่ หากกดสวิตซ์จะเกิดอะไรขึ้น
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
