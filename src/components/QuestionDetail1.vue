<template>
  <v-container grid-list-xl>
    <v-layout v-if="form" wrap>
      <v-flex v-for="qus in questions" :key="qus.item" xs12>
        <v-card>
          <v-card-text>
            <div class="my-3">
              <p v-if="typeof qus.text === 'string'">{{ qus.text }}</p>
              <p v-else>
                <template v-for="sub in qus.text"
                  >{{ sub }}<br :key="sub"
                /></template>
              </p>
            </div>
            <v-textarea
              v-model="form[qus.key1][qus.key2]"
              rows="5"
              single-line
              readonly
              box
              auto-grow
            />
            <v-text-field
              :value="check[qus.item]"
              class="mt-0 pt-0"
              type="number"
              label="คะแนน"
              outline
              placeholder="0.00"
              @change="v => updateData(qus.item, v)"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from "./../core/db";

export default {
  data() {
    return {
      check: {},
      questions: [
        {
          text: `1. สมมติว่าน้องได้รับเครื่องมือที่ทำให้น้องเดินทางไปยังโลกอนาคตและย้อนกลับไปในอดีตได้
            น้องจะใช้เครื่องมือนี้ในการแก้ปัญหาด้านความเหลื่อมล้ำทางการศึกษาไทยที่เกิดขึ้นในปัจจุบันได้อย่างไร`,
          key1: "q1",
          key2: "item1",
          item: "q1-1"
        },
        {
          text: `2. ให้น้องๆอธิบายตัวตนของตัวเองใน 3คำ และทำไมพี่ๆถึงต้องรับน้องเข้าค่าย CE Smart Camp #12`,
          key1: "q1",
          key2: "item2",
          item: "q1-2"
        },
        {
          text: `3. ถ้าพี่มีงานอย่างหนึ่งให้น้องทำซึ่งเป็นงานที่ยากมาก พี่ให้น้องจับคู่กับเพื่อนอีกหนึ่งคนและช่วยกันทำงาน โดยที่น้องเป็นคนที่เก่งมาก
            แต่เพื่อนของน้องเป็นคนที่ไม่มีทักษะทางด้านนี้มาก่อนเลย และงานนี้ไม่สามารถทำคนเดียวได้ น้องจะทำอย่างไรเพื่อให้งานนี้สำเร็จ`,
          key1: "q1",
          key2: "item3",
          item: "q1-3"
        },
        {
          text: `4. ถ้ามีพลังวิเศษสามารถทำอะไรก็ได้ น้องๆจะใช้พลังวิเศษนั้นทำอะไร เพราะอะไร`,
          key1: "q1",
          key2: "item4",
          item: "q1-4"
        },
        {
          text: `5. ถ้าโลกกำลังจะแตกในอีก 1นาที น้องๆจะทำอะไรก่อนโลกจะแตก(ไม่เกี่ยวกับครอบครัว) เพราะอะไร`,
          key1: "q2",
          key2: "item1",
          item: "q1-5"
        },
        {
          text: `6. ถ้าน้องสามารถเลือกเป็นคนกล้าหาญ หรือเป็นคนมีเมตตา ได้อย่างใดอย่างหนึ่งน้องจะเลือกเป็นอะไร เพราะอะไร`,
          key1: "q2",
          key2: "item2",
          item: "q1-6"
        },
        {
          text: [
            `7. ถ้าน้องต้องเลือกจับกลุ่มทำงานกับคน 2คน ใน 3คนต่อไปนี้ น้องจะเลือกใคร เพราะเหตุใด`,
            ``,
            `A. คนที่มนุษยสัมพันธ์แย่ พูดไม่รักษาน้ำใจ เก่งเฉพาะเรื่องที่สนใจ`,
            `B. คนที่ไม่เกรงใจ พูดเสียงดัง บ่นทุกสิ่งที่ไม่พอใจ ไม่มีความรับผิดชอบ`,
            `C. ทำงานเอาหน้า กลับกลอก มีมนุษยสัมพันธ์ดี`
          ],
          key1: "q2",
          key2: "item3",
          item: "q1-7"
        },
        {
          text: `8. ขณะที่น้องเดินชมผลงานที่สร้างโดยวิศวกรคอมพิวเตอร์ชื่อดัง น้องเห็นผลงานชิ้นหนึ่ง และหยุดพิจารณาดูผลงานนั้นอยู่นาน ผลงานนั้นคือ…?`,
          key1: "q2",
          key2: "item4",
          item: "q1-8"
        },
        {
          text: `9. มีวัตถุดิบ 10อย่าง โดยวัตถุดิบทุกอย่างสามารถนำไปนึ่ง ลวก ย่าง หรือทอด กระบวนการใดกระบวนการหนึ่ง ก่อนนำไปปรุงด้วยสูตรลับเฉพาะ
            หากเลือกวัตถุดิบมา 3อย่าง จะมีวิธีทำอาหารกี่วิธีจงแสดงวิธีทำ`,
          key1: "q3",
          key2: "item1",
          item: "q1-9"
        },
        {
          text: `10. มีอะไรจะถามพี่ไหม`,
          key1: "q3",
          key2: "item2",
          item: "q1-10"
        },
        {
          text: [
            `11. EXTRA เลือกทำ 1ข้อ (หากทำมากกว่า 1 ข้อจะคิดคะแนนข้อที่ได้น้อยที่สุด)`,
            ``,
            `A) จงเขียนอะไรก็ได้ที่คิดว่าพี่อ่านแล้วจะหัวเราะ`,
            `B) จงแต่งเรื่องราวที่ประกอบด้วยคำทุกคำต่อไปนี้ ["ไทยแลนด์ 4.0", "อัตราส่วนทองคำ", "ทฎษฎีสัมพันธ์ภาพพิเศษ", "DNA", "IoT", "ก็มาดิครับ", "ปัดทุ่มด้วยโพเดียม", "หมี่หยก", "BNK48", "PM 2.5"]`
          ],
          key1: "q3",
          key2: "item3",
          item: "q1-11"
        }
      ]
    };
  },
  computed: {
    form() {
      return this.$store.getters.getByID("qus", this.$route.params.id);
    }
  },
  mounted() {
    this.check = this.$store.getters.getByID("check", this.$route.params.id, {
      sum: { q1: 0, q2: 0 }
    });
    this.$store.subscribe(mutation => {
      if (mutation.type === "editData" || mutation.type === "addData") {
        if (
          mutation.payload.key === "check" &&
          mutation.payload.val.id === this.$route.params.id
        ) {
          this.check = mutation.payload.val;
        }
      }
    });
  },
  methods: {
    updateData(key, value) {
      var data = {};
      data[key] = Number(value);
      db.collection("check")
        .doc(this.$route.params.id)
        .set(data, { merge: true });
    }
  }
};
</script>
