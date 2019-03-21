<template>
  <v-form ref="form" v-model="valid">
    <h4 class="display-1 text-xs-center">ตรวจสอบข้อมูล</h4>
    <CamperInfo v-model="form.reg.info" readonly />
    <v-divider />
    <h5 class="headline mt-4 text-xs-center">การติดต่อ</h5>
    <CamperContact v-model="form.reg.contact" readonly />
    <v-divider />
    <h5 class="headline mt-4 text-xs-center">ข้อมูลสุขภาพ</h5>
    <CamperHealth v-model="form.reg.health" readonly />
    <v-divider />
    <h5 class="headline mt-4 text-xs-center">ที่อยู่</h5>
    <CamperAddress v-model="form.reg.address" readonly />
    <v-divider />
    <h5 class="headline mt-4 text-xs-center">การศึกษา</h5>
    <CamperEdu v-model="form.reg.edu" readonly />
    <v-divider />
    <h5 class="headline mt-4 text-xs-center">ผู้ปกครอง</h5>
    <CamperParent v-model="form.reg.parent" readonly />
    <v-divider />
    <h5 class="headline mt-4 text-xs-center">ประวัติการเข้าค่าย</h5>
    <CamperPass v-model="form.reg.pass" readonly />
    <v-divider />
    <h5 class="headline mt-4 text-xs-center">คำถาม Part 1</h5>
    <Question1 v-model="form.qus.q1" readonly class="pb-0" />
    <Question2 v-model="form.qus.q2" readonly class="py-0" />
    <Question3 v-model="form.qus.q3" readonly class="py-0" />
    <v-divider />
    <h5 class="headline mt-4 text-xs-center">คำถาม Part 2</h5>
    <AcademicLogic v-model="form.qus.logic" readonly class="pb-0" />
    <AcademicElect v-model="form.qus.elect" readonly class="py-0" />
    <AcademicPro v-model="form.qus.pro" readonly class="py-0" />
    <AcademicIot v-model="form.qus.iot" readonly class="pt-0" />
    <v-divider />
    <v-card-text class="text-xs-center">
      <h5 class="headline my-4">พร้อมจะส่งใบสมัครแล้วใช่ไหม</h5>
      <p>
        น้องเก่งมากที่ทำมาถึงตรงนี้ได้ พี่เห็นคำถามพี่ก็ท้อแล้ว
      </p>
      <v-btn color="success" :disabled="disable" @click="submitForm">
        &nbsp;ส่งใบสมัคร&nbsp;&nbsp;<v-icon>send</v-icon>
      </v-btn>
    </v-card-text>
  </v-form>
</template>

<script>
import CamperInfo from "./../view/camper_info";
import CamperContact from "./../view/camper_contact";
import CamperHealth from "./../view/camper_health";
import CamperAddress from "./../view/camper_address";
import CamperEdu from "./../view/camper_edu";
import CamperParent from "./../view/camper_parent";
import CamperPass from "./../view/camper_pass";
import Question1 from "./../view/qustion_1";
import Question2 from "./../view/qustion_2";
import Question3 from "./../view/qustion_3";
import AcademicLogic from "./../view/academic_logic";
import AcademicElect from "./../view/academic_elect";
import AcademicPro from "./../view/academic_pro";
import AcademicIot from "./../view/academic_iot";
import bus from "../core/bus";

export default {
  components: {
    CamperInfo,
    CamperContact,
    CamperHealth,
    CamperAddress,
    CamperEdu,
    CamperParent,
    CamperPass,
    Question1,
    Question2,
    Question3,
    AcademicLogic,
    AcademicElect,
    AcademicPro,
    AcademicIot
  },
  props: {
    value: {
      type: Object,
      default: function() {
        return {};
      }
    },
    show: Boolean,
    disable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valid: false,
    form: {
      reg: {
        fb_id: null,
        info: null,
        contact: null,
        health: null,
        address: null,
        edu: null,
        parent: null,
        pass: null,
        created_at: null,
        update_at: null
      },
      qus: {
        logic: null,
        elect: null,
        pro: null,
        iot: null,
        update_at: null,
        completed_at: null
      }
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
        this.validate();
      },
      deep: true
    },
    show(val) {
      if (val) this.validate();
    }
  },
  mounted: function() {
    if (this.value !== null) {
      Object.keys(this.form).forEach(key => {
        this.form[key] = this.value[key] || null;
      });
    }

    this.validate();
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    submitForm() {
      this.validate();
      if (!this.valid) {
        bus.$emit(
          "dialog.on",
          "รูปแบบคำตอบของน้องไม่ถูกต้อง ขอให้น้องกลับไปแก้ไขคำตอบที่กรอกด้วย"
        );
      } else {
        bus.$emit("dialog.on", {
          msg:
            "ถ้าส่งคำตอบไปแล้วน้องๆจะไม่สามารถกลับมาแก้ไขได้แล้ว น้องๆต้องการจะส่งคำตอบใช่หรือไม่",
          confirm: true,
          callback: () => {
            this.form.qus.completed_at = "new-data";
            bus.$emit("step.go", 0);
            bus.$emit("reg.close", false);
            bus.$emit("qus.close", false);
          }
        });
      }
    }
  }
};
</script>
