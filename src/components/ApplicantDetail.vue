<template>
  <v-container grid-list-xl>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h4 class="display-1">ตรวจสอบข้อมูล</h4>
          </v-card-title>
          <CamperInfo v-model="reg.info" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">การติดต่อ</h5>
          </v-card-title>
          <CamperContact v-model="reg.contact" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">ข้อมูลสุขภาพ</h5>
          </v-card-title>
          <CamperHealth v-model="reg.health" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">ที่อยู่</h5>
          </v-card-title>
          <CamperAddress v-model="reg.address" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">การศึกษา</h5>
          </v-card-title>
          <CamperEdu v-model="reg.edu" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">ผู้ปกครอง</h5>
          </v-card-title>
          <CamperParent v-model="reg.parent" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h5 class="headline">ประวัติการเข้าค่าย</h5>
          </v-card-title>
          <CamperPass v-model="reg.pass" readonly />
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
  data: () => ({
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
    }
  }),
  mounted: function() {
    var docRef = db.collection("reg").doc(this.$route.params.id);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          this.reg = doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
};
</script>
