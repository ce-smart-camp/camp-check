<template>
  <v-container grid-list-xl>
    <v-layout v-if="form" wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h3 class="headline mb-0">ตรวจคำตอบ คำถาม Part 1</h3>
            <v-spacer />
            <h2>
              MARK :
              {{
                check.mark ? (check.mark.sum ? check.mark.sum.q1 || 0 : 0) : 0
              }}
              || คะแนน : {{ check.sum ? check.sum.q1 || 0 : 0 }} || รวม :
              {{ check.sum ? check.sum.sum || 0 : 0 }}
            </h2>
          </v-card-title>
          <v-card-actions>
            <v-btn color="orange darken-2" dark @click="$router.go(-1)"
              ><v-icon dark left>arrow_back</v-icon>ย้อนกลับ</v-btn
            ><v-spacer /><v-btn
              color="purple"
              dark
              :to="{ name: 'qid2', params: { idNum: $route.params.idNum } }"
              replace
              >คำถาม Part 2</v-btn
            >
          </v-card-actions>
          <v-card-text class="text-xs-center">
            <v-pagination
              v-model="page"
              :length="$store.state.list.qus.length"
              total-visible="10"
            ></v-pagination>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex v-for="qus in questions" :key="qus.item" xs12>
        <v-card :dark="check.mark[qus.item]">
          <v-card-text>
            <div class="my-3">
              <p v-if="typeof qus.text === 'string'">{{ qus.text }}</p>
              <p v-else>
                <template v-for="sub in qus.text"
                  >{{ sub }}<br :key="sub"
                /></template>
              </p>
            </div>
            <transition name="fade" mode="out-in">
              <v-textarea
                :key="form[qus.key1][qus.key2]"
                v-model="form[qus.key1][qus.key2]"
                :name="qus.item"
                rows="5"
                single-line
                readonly
                box
                auto-grow
              />
            </transition>

            <v-layout>
              <v-flex xs4>
                <v-text-field
                  :value="check[qus.item]"
                  class="mt-0 pt-0"
                  type="number"
                  label="คะแนน"
                  outline
                  placeholder="0.00"
                  @change="v => updateData('score', qus.item, v)"
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-checkbox
                  :value="check.mark[qus.item]"
                  label="MARK THIS"
                  @change="v => updateData('mark', qus.item, v)"
                ></v-checkbox>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  :value="check.comment[qus.item]"
                  label="Comment"
                  @change="v => updateData('comment', qus.item, v)"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex>
        <v-card>
          <v-card-text class="text-xs-center">
            <v-pagination
              v-model="page"
              :length="$store.state.list.qus.length"
              total-visible="10"
            ></v-pagination>
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
      check: { mark: {}, comment: {} },
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
      ],
      storeUnsub: null
    };
  },
  computed: {
    form() {
      return this.$store.state.list.qus[this.$route.params.idNum];
    },
    page: {
      get() {
        return Number(this.$route.params.idNum) + 1;
      },
      set(value) {
        this.$router.replace({ name: "qid1", params: { idNum: value - 1 } }); // !!router name
      }
    }
  },
  mounted() {
    this.setupCheck();
  },
  methods: {
    updateData(Key, key, value) {
      var data = {};
      if (Key !== "score") {
        data[Key] = {};
        data[Key][key] = value;
      } else {
        data[key] = Number(value);
      }
      db.collection("check")
        .doc(this.form.id)
        .set(data, { merge: true });
    },
    setupCheck() {
      if (this.storeUnsub !== null) this.storeUnsub();

      if (this.form) {
        this.check = this.$store.getters.getByID("check", this.form.id) || {
          comment: {},
          mark: {},
          sum: {}
        };
      }

      this.storeUnsub = this.$store.subscribe(mutation => {
        if (mutation.type === "editData" || mutation.type === "addData") {
          if (
            mutation.payload.key === "check" &&
            mutation.payload.val.id === this.form.id
          ) {
            this.check = mutation.payload.val;
          }
        }
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.setupCheck();
  },
  beforeRouteLeave(to, from, next) {
    if (this.storeUnsub !== null) this.storeUnsub();
    next();
  }
};
</script>
