<template>
  <v-container grid-list-xl>
    <v-layout wrap>
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
import CamperInfo from "./../view/camper_info";
import CamperContact from "./../view/camper_contact";
import CamperHealth from "./../view/camper_health";
import CamperAddress from "./../view/camper_address";
import CamperEdu from "./../view/camper_edu";
import CamperParent from "./../view/camper_parent";
import CamperPass from "./../view/camper_pass";

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
  computed: {
    reg() {
      return this.$store.state.list.reg[
        this.$store.state.key.reg[this.$route.params.id]
      ];
    }
  }
};
</script>
