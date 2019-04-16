<template>
  <v-container>
    <v-layout text-xs-center wrap column>
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
          {{ isLogin ? "ออกจากระบบ" : "ลงชื่อเข้าใช้" }}
        </v-btn>
        <p v-if="isLogin">
          ลงชื่อเข้าใช้ด้วยชื่อ :
          {{ name }} E-mail : {{ email }}
        </p>
      </v-flex>

      <v-flex>
        <v-btn color="success" to="a">Applicant</v-btn>
        <v-btn color="success" to="q">Question</v-btn>
        <v-btn color="success" to="s">Sum</v-btn>
        <v-btn color="success" to="r">Role</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { signIn, signOut } from "./../core/auth";
import firebase from "./../core/firebase";
export default {
  computed: {
    isLogin() {
      return this.$store.state.is.login;
    },
    name() {
      return firebase.auth().currentUser.displayName;
    },
    email() {
      return firebase.auth().currentUser.email;
    }
  },
  methods: {
    loginBtn: function() {
      if (this.isLogin) {
        signOut();
      } else {
        signIn();
      }
    }
  }
};
</script>

<style></style>
