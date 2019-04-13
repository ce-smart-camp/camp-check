<template>
  <v-container grid-list-xl>
    <v-layout v-if="reg" wrap>
      <v-flex xs12>
        <v-card :dark="check.mark['info']">
          <v-card-title primary-title>
            <h3 class="headline mb-0">ข้อมูลส่วนตัว</h3>
            <v-spacer />
            <h2>
              คะแนน : {{ check.sum ? check.sum.info || 0 : 0 }} || รวม :
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

          <v-toolbar>
            <v-text-field
              :value="check['info']"
              type="number"
              single-line
              hide-details
              placeholder="คะแนน"
              style="max-width: 70px;"
              class="pt-0"
              @change="v => updateData('score', 'info', v)"
            ></v-text-field>
            <v-divider class="mx-3" vertical />
            <v-text-field
              :value="check.comment['info']"
              single-line
              hide-details
              placeholder="Comment"
              class="pt-0"
              @change="v => updateData('comment', 'info', v)"
            ></v-text-field>
            <v-divider class="mx-3" vertical />
            <v-btn-toggle
              :value="check.mark['info']"
              label="MARK THIS"
              class="transparent"
              @change="v => updateData('mark', 'info', v)"
            >
              <v-btn :value="true" flat>
                <v-icon>star</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-toolbar>
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

import db from "./../core/db";

export default {
  components: {
    CamperInfo,
    CamperContact,
    CamperHealth,
    CamperAddress,
    CamperEdu,
    CamperParent,
    CamperPass
  },
  data() {
    return {
      check: { mark: {}, comment: {} },
      storeUnsub: null
    };
  },
  computed: {
    reg() {
      return this.$store.getters.getByID("reg", this.$route.params.id);
    },
    page: {
      get() {
        return Number(this.$store.state.key.reg[this.$route.params.id]) + 1;
      },
      set(value) {
        this.$router.replace({
          name: "aid",
          params: { id: this.$store.state.list.reg[value - 1].id }
        }); // !!router name
      }
    }
  },
  mounted() {
    this.setupCheck();
  },
  methods: {
    updateData(Key, key, value) {
      if (typeof value === "undefined") value = null;
      var data = {};
      if (Key !== "score") {
        data[Key] = {};
        data[Key][key] = value;
      } else {
        data[key] = Number(value);
      }
      db.collection("check")
        .doc(this.$route.params.id)
        .set(data, { merge: true });
    },
    setupCheck() {
      if (this.storeUnsub !== null) this.storeUnsub();

      this.check = this.$store.getters.getByID(
        "check",
        this.$route.params.id
      ) || {
        comment: {},
        mark: {},
        sum: {}
      };

      this.storeUnsub = this.$store.subscribe(mutation => {
        if (mutation.type === "editData" || mutation.type === "addData") {
          if (
            mutation.payload.key === "check" &&
            mutation.payload.val.id === this.$route.params.id
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
