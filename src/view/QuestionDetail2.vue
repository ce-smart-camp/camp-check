<template>
  <v-container grid-list-xl>
    <v-layout v-if="form" wrap>
      <v-flex xs12>
        <v-card :dark="check.mark['info']">
          <v-card-title primary-title>
            <h3 class="headline mb-0">ตรวจคำตอบ คำถาม</h3>
            <h1>Part 2</h1>
            <v-spacer />
            <h2>
              MARK :
              {{
                check.mark ? (check.mark.sum ? check.mark.sum.q2 || 0 : 0) : 0
              }}
              /
              {{
                check.mark ? (check.mark.sum ? check.mark.sum.sum || 0 : 0) : 0
              }}
              || คะแนน : {{ check.sum ? check.sum.q2 || 0 : 0 }} /
              {{ check.sum ? check.sum.sum || 0 : 0 }}
            </h2>
          </v-card-title>
          <v-card-actions>
            <v-btn color="orange darken-2" dark @click="$router.go(-1)"
              ><v-icon dark left>arrow_back</v-icon>ย้อนกลับ</v-btn
            ><v-spacer /><v-btn
              color="purple"
              dark
              :to="{ name: 'qid1', params: { idNum: $route.params.idNum } }"
              replace
              >คำถาม Part 1</v-btn
            >
          </v-card-actions>
          <v-card-text class="text-xs-center">
            <v-pagination
              v-model="page"
              :length="$store.state.list.qus.length"
              total-visible="10"
            ></v-pagination>
          </v-card-text>

          <ScoreToolbar :id="id" field="info" />
        </v-card>
      </v-flex>

      <v-flex v-for="qus in questions" :key="qus.item" xs12>
        <v-card :dark="check.mark[qus.item]">
          <v-card-text>
            <div class="mb-3">
              <p v-if="typeof qus.text === 'string'">{{ qus.text }}</p>
              <p v-else>
                <template v-for="(sub, index) in qus.text"
                  >{{ sub }}<br :key="`${qus.item}-qus-${index}`"
                /></template>
              </p>
              <v-img
                v-if="qus.img"
                :src="qus.img"
                contain
                max-height="300px"
              ></v-img>
            </div>

            <transition v-if="qus.imgUp" name="fade" mode="out-in">
              <ImgUp
                :key="form[qus.key1][qus.key2]"
                v-model="form[qus.key1][qus.key2]"
                :filename="qus.imgUp"
              />
            </transition>
            <transition-group
              v-else-if="qus.key2a"
              name="fade"
              mode="out-in"
              tag="div"
            >
              <v-textarea
                v-for="(subQ, index) in qus.key2a"
                :key="`${qus.item}-${subQ.key}`"
                v-model="form[qus.key1][subQ.key]"
                rows="3"
                :label="subQ.text"
                box
                readonly
                hide-details
                auto-grow
                :class="index !== 0 ? 'mt-3' : ''"
              />
            </transition-group>
            <transition v-else name="fade" mode="out-in">
              <v-textarea
                :key="form[qus.key1][qus.key2]"
                v-model="form[qus.key1][qus.key2]"
                rows="5"
                box
                single-line
                hide-details
                readonly
                auto-grow
              />
            </transition>
          </v-card-text>

          <ScoreToolbar :id="id" :field="qus.item" />
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
import ScoreToolbar from "./../components/ScoreToolbar";
import ImgUp from "./../components/imageUpload";

export default {
  components: {
    ImgUp,
    ScoreToolbar
  },
  data() {
    return {
      questions: [
        {
          text: `1. พี่กระต่ายเป็นเศรษฐีรวยระดับพันล้าน วันหนึ่งนึกสนุกจึงได้มอบภารกิจให้พี่เจตซึ่งเป็นลูกน้อง
            โดยให้ทำการหาว่าโทรศัพท์ของพี่กระต่ายจะพังเมื่อตกจากตึกชั้นที่ต่ำสุดชั้นใดจากตึกที่มี 1,000 ชั้น!!! โดยพี่กระต่ายมีโทรศัพท์ให้ใช้ทดลอง Drop test
            ครั้งนี้อยู่ทั้งหมด 10 เครื่อง น้องๆจะช่วยพี่เจตหาคำตอบของภารกิจนี้ได้อย่างไร`,
          key1: "logic",
          key2: "item1",
          item: "q2-1"
        },
        {
          text: `2. ในงานเลี้ยงปีใหม่ของรุ่นพี่สตาฟ CE Smart Camp ครั้งที่12 มีการจับฉลากกันเพื่อลุ้นรางวัล โดย MC ได้บอกกับผู้ร่วมงานว่า
            ถุงที่เราจะใช้จับรางวัลกันในค่ำคืนแห่งความสุขนี้ จะมีคูปองที่ไม่ใช่มูลค่า 10บาทสองใบ มีคูปองที่ไม่ใช่มูลค่า 100บาทสองใบ
            และมีคูปองที่ไม่ใช่มูลค่า 1000บาทสองใบ พี่ๆสตาฟที่เข้าร่วมงานจึงอยากรู้ว่า ถุงที่ใช้จับรางวัลนั้นมีคูปองอยู่กี่ใบ
            จึงอยากให้น้องๆช่วยพี่ๆคิดพร้อมแสดงวิธีการหาคำตอบให้พี่ๆหน่อย`,
          key1: "logic",
          key2: "item2",
          item: "q2-2"
        },
        {
          text: [
            `3. สมบัติ มีเพื่อนคือ สมชายและสมหญิง ที่สนิทกันมาตั้งแต่สมัยเด็กๆ แต่ทั้งสมชายและสมหญิง ต่างไม่รู้วันเกิดของสมบัติ
            วันหนึ่งสมชายจึงไปหาสมบัติเพื่อถามวันเกิด แต่สมบัติไม่บอกทั้งหมด โดยให้สมชายเลือกที่จะรู้วันหรือเดือนอย่างใดอย่างหนึ่ง สมบัติจึงเลือกเดือน
            และได้เรียกสมหญิงให้มาถามวันเกิด แต่สมบัติก็ไม่บอกทั้งหมดเช่นเดียวกับสมชาย โดยให้เลือกเอาอย่างใดอย่างหนึ่ง สมหญิงจึงเลือกวัน
            แต่ก่อนที่สมบัติจะบอกคำตอบแก่ทั้งสอง สมบัติได้ให้ตัวเลือกวันเกิดมาทั้งหมดสิบข้อ`,
            ``,
            `2 มกราคม / 3 มกราคม / 6 มกราคม / 4 กุมภาพันธ์ / 5 กุมภาพันธ์ / 1 มีนาคม / 3 มีนาคม / 1 เมษายน / 2 เมษายน / 4 เมษายน`,
            ``,
            `จากนั้นสมบัติจึงบอกวันแก่สมหญิง และเดือนแก่สมชาย เสร็จแล้วทั้งสมชาย และสมหญิงเริ่มจึงคุยกัน`,
            ``,
            `สมชาย : เราไม่รู้ว่าวันเกิดของสมบัติอะ แต่เรารู้ว่าสมหญิงก็ไม่รู้เหมือนกัน`,
            `สมหญิง : ตอนแรกก็ไม่รู้นะว่าวันเกิดของสมบัติคือวันไหน แต่ตอนนี้รู้ละ`,
            `สมชาย : อ่าวหรอ งั้นตอนนี้เราก็รู้ละว่าวันเกิดสมบัติคือวันอะไร`,
            ``,
            `จงหาวันเกิดของสมบัติพร้อมแสดงวิธีการหา`
          ],
          key1: "logic",
          key2: "item3",
          item: "q2-3"
        },
        {
          text: `4. น้องๆคิดว่าในค่ายของเราจะใช้อุปกรณ์ทางอิเล็กทรอนิกส์หรือโมดูลอะไรบ้างลองยกตัวอย่างมาให้มากที่สุด`,
          key1: "elect",
          key2: "item1",
          item: "q2-4"
        },
        {
          text: [
            `5. จากรูป จงตอบคำถามต่อไปนี้`,
            `1) เมื่อต่อวงจรตามรูปจะเกิดอะไรขึ้น และจงหาความดันตกคร่อมของตัวต้านทานแต่ละตัว`,
            `2) ถ้านำแบตความดัน 9V มาต่อเพิ่มที่จุด A โดยให้ขั้วบวกต่อเข้ากับตัวต้านทาน R2 จะเกิดอะไรขึ้น และจงหาความดันตกคร่อมของตัวต้านทานแต่ละตัว`
          ],
          img: require("../assets/question/q-2-2.png"),
          key1: "elect",
          key2: "item2",
          item: "q2-5"
        },
        {
          text: `6. จากวงจรด้านล่าง ถ้าถ่าน 9V ยังมีประจุอยู่ หากกดสวิตซ์จะเกิดอะไรขึ้น`,
          img: require("../assets/question/q-2-3.png"),
          key1: "elect",
          key2: "item3",
          item: "q2-6"
        },
        {
          text: [
            `7. น้องเคยเขียนโปรแกรมหรือไม่ ถ้าเคยเขียน เขียนภาษาอะไรได้บ้าง ลองเขียนโปรแกรมภาษานั้นให้แสดงข้อความว่า`,
            `<code>\\* “CE*Smart*Camp” #12 */</code>`
          ],
          key1: "pro",
          key2: "item1",
          item: "q2-7"
        },
        {
          text: [
            `8. จาก Code arduino ด้านล่าง พี่ๆอยากให้น้องหาจุดผิด ที่ทำให้โปรแกรมไม่สามารถทำงานได้พร้อมแก้ไขให้ถูกต้อง (ถ้ามี)
            และแสดงผลลัพธ์ที่ได้ออกมาจากการทำงานของโปรแกรม`,
            `(เขียนบรรทัดที่ผิด+จุดที่ผิด พร้อมแก้ไขให้ถูกต้อง)`
          ],
          img: require("../assets/question/q-3-2.png"),
          key1: "pro",
          key2: "item2",
          item: "q2-8"
        },
        {
          text: [
            `9. การที่ใบสมัครที่น้องกำลังทำนี้ จะเดินทางมาถึงพี่ๆได้ พี่ๆอยากรู้ขั้นตอนดำเนินการทั้งหมดตั้งแต่เริ่มรู้จักค่ายนี้จนกว่าน้องๆจะติดค่าย
            CE Smart Camp #12 พี่ๆจึงอยากให้น้องลองเขียน Flowchart ให้พี่ๆ โดยต้องมีสัญลักษณ์ที่พี่ๆกำหนดให้ด้านล่างนี้เป็นส่วนประกอบ`,
            `(Hint : ขั้นตอนดำเนินการอยู่ในเว็บไซต์สมัคร)`
          ],
          img: require("../assets/question/q-3-3.png"),
          imgUp: "q-3-3",
          key1: "pro",
          key2: "item3",
          item: "q2-9"
        },
        {
          text: `10. IoT(Internet of Things) ที่เริ่มได้ยินกันติดหูกันในปัจจุบันนั้นก็คือ การที่อุปกรณ์อิเล็กทรอนิกส์อะไรก็ตามนั้นสามารถเชื่อมโยงสู่โลกอินเตอร์เน็ตได้
            และแนวโน้มที่กำลังจะมาแรงเกี่ยวกับ IoT ในอนาคตอันใกล้นี้ก็คือ “Smart Home” พี่ๆจึงอยากให้น้องๆคิดโปรเจคขึ้นมาโปรเจคนึงที่เกี่ยวกับ “Smart Home”
            โดยโปรเจคนั้นจะต้องสามารถทำได้จริง อธิบายรายละเอียดเกี่ยวกับโปรเจคนั้นคร่าวๆ และตอบคำถามเหล่านี้ได้`,
          key1: "iot",
          key2: "item1",
          key2a: [
            { text: `อธิบายรายละเอียดเกี่ยวกับโปรเจค`, key: "item1" },
            { text: `ทำไมน้องๆถึงเลือกทำโปรเจคนี้ขึ้นมา`, key: "item2" },
            { text: `ของที่ใช้ในการทำโปรเจคมีอะไรบ้าง`, key: "item3" },
            {
              text: `โปรเจคที่คิดออกมาใครสามารถนำไปใช้ได้บ้าง อย่างไร`,
              key: "item4"
            },
            { text: `สามารถนำไปต่อยอดได้อย่าง`, key: "item5" }
          ],
          item: "q2-10"
        },
        {
          text: `11) EXTRA ข้อไหนที่น้องๆคิดว่ายากสุด ไม่อยากทำ`,
          key1: "iot",
          key2: "item9",
          item: "q2-11"
        }
      ]
    };
  },
  computed: {
    id() {
      return this.form.id;
    },
    check() {
      this.$store.dispatch("checkStoreCheck", this.id);
      return this.$store.getters.getByID("check", this.id);
    },
    form() {
      return this.$store.state.list.qus[this.$route.params.idNum];
    },
    page: {
      get() {
        return Number(this.$route.params.idNum) + 1;
      },
      set(value) {
        this.$router.replace({ name: "qid2", params: { idNum: value - 1 } }); // !!router name
      }
    }
  },
  created() {
    this.$store.dispatch("init", "check");
    this.$store.dispatch("init", "qus");
  }
};
</script>
