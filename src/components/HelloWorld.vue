<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex>
        <v-btn color="info" @click="loginBtn">
          {{ loginBtnText }}
        </v-btn>
        <p>
          {{ loginText }}
        </p>
        <v-btn color="success" to="a">Applicant</v-btn>
        <v-btn color="success" to="q">Question</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { signIn, signOut } from "./../core/auth";
import firebase from "./../core/firebase";
export default {
  data: () => ({
    loginBtnText: "Login",
    loginText: "",
    isLogin: false
  }),
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.isLogin = !!user;
      this.changeText();
    });
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
          "ลงชื่อเข้าใช้ด้วยชื่อ " +
          firebase.auth().currentUser.providerData[0].displayName;
      } else {
        this.loginBtnText = "ลงชื่อเข้าใช้";
        this.loginText = "";
      }
    }
  }
};
</script>

<style></style>
