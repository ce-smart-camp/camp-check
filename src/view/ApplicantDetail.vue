<template>
  <v-container grid-list-xl>
    <v-layout v-if="reg" wrap>
      <v-flex xs12>
        <v-card :dark="isDark('info')" :color="getColor('info')">
          <v-card-title primary-title>
            <h3 class="headline mb-0">ข้อมูลส่วนตัว</h3>
            <v-spacer />
            <h2>
              คะแนน : {{ check.sum ? check.sum.info || 0 : 0 }} || รวมกับคำถาม :
              {{ check.sum ? check.sum.all || 0 : 0 }}
            </h2>
          </v-card-title>
          <v-card-actions>
            <v-btn color="orange darken-2" dark @click="$router.go(-1)"
              ><v-icon dark left>arrow_back</v-icon>ย้อนกลับ</v-btn
            >
          </v-card-actions>
          <v-card-text class="text-xs-center">
            <v-pagination
              v-model="page"
              :length="$store.state.list.reg.length"
              total-visible="10"
            ></v-pagination>
          </v-card-text>

          <ScoreToolbar
            :id="id"
            field="info"
            @canChange="val => (canChangePage['info'] = val)"
          />
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h4 class="display-1">ตรวจสอบข้อมูล</h4>
          </v-card-title>
          <CamperInfo :form="reg.info" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">การติดต่อ</h5>
          </v-card-title>
          <CamperContact :form="reg.contact" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">ข้อมูลสุขภาพ</h5>
          </v-card-title>
          <CamperHealth :form="reg.health" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">ที่อยู่</h5>
          </v-card-title>
          <CamperAddress :form="reg.address" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">การศึกษา</h5>
          </v-card-title>
          <CamperEdu :form="reg.edu" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">ผู้ปกครอง</h5>
          </v-card-title>
          <CamperParent :form="reg.parent" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">ประวัติการเข้าค่าย</h5>
          </v-card-title>
          <CamperPass :form="reg.pass" readonly />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CamperInfo from "./../components/camper_info";
import CamperContact from "./../components/camper_contact";
import CamperHealth from "./../components/camper_health";
import CamperAddress from "./../components/camper_address";
import CamperEdu from "./../components/camper_edu";
import CamperParent from "./../components/camper_parent";
import CamperPass from "./../components/camper_pass";

import colorConvert from "color-convert";

import ScoreToolbar from "./../components/ScoreToolbar";

export default {
  components: {
    CamperInfo,
    CamperContact,
    CamperHealth,
    CamperAddress,
    CamperEdu,
    CamperParent,
    CamperPass,
    ScoreToolbar
  },
  data() {
    return {
      canChangePage: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    check() {
      this.$store.dispatch("checkStoreCheck", this.id);
      return this.$store.getters.getByID("check", this.id);
    },
    reg() {
      return this.$store.getters.getByID("reg", this.id);
    },
    page: {
      get() {
        return Number(this.$store.state.key.reg[this.id]) + 1;
      },
      set(value) {
        if (
          Object.keys(this.canChangePage).every(key => this.canChangePage[key])
        )
          this.$router.replace({
            name: "aid",
            params: { id: this.$store.state.list.reg[value - 1].id }
          }); // !!router name
      }
    }
  },
  created() {
    this.$store.dispatch("init", "reg");
    this.$store.dispatch("init", "check");
  },
  mounted() {
    document.addEventListener("keyup", this.nextPage);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.nextPage);
  },
  methods: {
    getColor(feild) {
      return typeof this.check.mark[feild] === "string" &&
        this.check.mark[feild] !== null
        ? this.check.mark[feild]
        : this.check.mark[feild] === true
        ? "#424242"
        : "#FFFFFF";
    },
    isDark(feild) {
      let rawHex = this.getColor(feild).substr(1);
      return colorConvert.hex.lab(rawHex)[0] < 56;
    },
    nextPage(event) {
      if (Object.keys(this.canChangePage).every(key => this.canChangePage[key]))
        if (event.keyCode == 37 && this.page > 1) {
          this.page--;
        } else if (
          event.keyCode == 39 &&
          this.page < this.$store.state.list.reg.length
        ) {
          this.page++;
        }
    }
  }
};
</script>
