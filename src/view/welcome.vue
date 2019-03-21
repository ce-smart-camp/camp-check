<template>
  <div class="pa-3 text-xs-center">
    <v-img
      class="mb-3"
      contain
      height="256"
      :src="require('../assets/logo-camp.min.svg')"
    />
    <h3 class="title font-weight-light mb-2">
      <span>ยินดีต้อนรับน้อง เข้าสู่ระบบรับสมัครค่าย</span>
    </h3>
    <div class="py-4">
      <v-btn color="#4267b2" dark @click="loginBtn">
        <icon name="facebook" />&nbsp;&nbsp;{{ loginBtnText }}
      </v-btn>
      <p>
        {{ loginText }}
      </p>
    </div>
    <p>
      น้องๆอย่าท้อกับการตอบคำถามนะ<br />
      <br />
      ระบบนี้จะบันทึกข้อมูลทุกครั้ง <b>"ที่เปลี่ยนหน้า"</b><br />
      น้องๆ สามารถข้ามไปยังหน้าอื่นได้ด้วยการกดที่แถบเมนูด้านข้าง <br />
      น้องๆ สามารถกลับมาแก้ไขข้อมูลในภายหลังได้ โดยลงชื่อเข้าใช้บัญชี Facebook
      ด้วยบัญชีเดิม<br />
      ช่องที่จำเป็นต้องกรอก อาจจะไม่ต้องกรอกในตอนแรก แต่ต้องกรอกก่อนที่จะส่ง
      <br />
      ในหน้าจอสัมผัส สามารถใช้การปัดซ้าย-ขวาเพื่อเปลื่ยนหน้าได้
    </p>
  </div>
</template>

<script>
import Icon from "vue-awesome/components/Icon";
import bus from "./../core/bus";
import firebase from "./../core/firebase";
import { signIn, signOut } from "./../core/auth";

Icon.register({
  facebook: {
    width: 216,
    height: 216,
    d:
      "M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9 11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1 11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2 15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3 11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"
  }
});

export default {
  components: {
    icon: Icon
  },
  data: () => ({ loginBtnText: "", isLogin: false, loginText: "" }),
  watch: {
    isLogin() {
      this.changeText();
    }
  },
  mounted() {
    bus.$on("user.change", val => (this.isLogin = val));

    this.isLogin = !!firebase.auth().currentUser;

    this.changeText();
  },
  methods: {
    loginBtn: function() {
      if (this.isLogin) {
        signOut();
      } else {
        signIn();
      }
    },
    changeText: function() {
      if (this.isLogin) {
        this.loginBtnText = "ออกจากระบบ";
        this.loginText =
          "น้องลงชื่อเข้าใช้ด้วยชื่อ " +
          firebase.auth().currentUser.providerData[0].displayName;
      } else {
        this.loginBtnText = "ลงชื่อเข้าใช้ด้วย Facebook";
        this.loginText = "";
      }
    }
  }
};
</script>

<style scoped>
span {
  font-family: "Kanit", sans-serif;
}
</style>
