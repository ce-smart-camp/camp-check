<template>
  <v-toolbar dense>
    <v-text-field
      :value="score"
      type="number"
      single-line
      hide-details
      placeholder="คะแนน"
      style="max-width: 70px;"
      class="pt-0"
      :disabled="!enable"
      @input="debounceScore"
    ></v-text-field>
    <v-divider class="mx-3" vertical />
    <v-text-field
      :value="comment"
      single-line
      hide-details
      placeholder="Comment"
      class="pt-0"
      :disabled="!enable"
      @input="debounceComment"
    ></v-text-field>
    <v-divider class="mx-3" vertical />
    <v-btn-toggle v-model="mark" class="transparent">
      <v-btn :value="true" flat :disabled="!enable">
        <v-icon>star</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-toolbar>
</template>

<script>
import debounce from "debounce";

import db from "./../core/db";

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    field: {
      type: String,
      required: true
    }
  },
  computed: {
    enable() {
      let role = this.field.split("-")[0];
      if (role !== "info")
        return this.$store.state.role[role] && this.$store.state.role.check;
      else
        return (
          (this.$store.state.role.q1 || this.$store.state.role.q2) &&
          this.$store.state.role.check
        );
    },
    check() {
      return this.$store.getters.getByID("check", this.id);
    },
    score() {
      return this.check[this.field];
    },
    comment() {
      return this.check.comment[this.field];
    },
    mark: {
      get() {
        return this.check.mark[this.field];
      },
      set(value) {
        this.updateData("mark", value);
      }
    }
  },
  methods: {
    updateData(type, value) {
      if (typeof value === "undefined") value = null;
      var data = {};
      if (type !== "score") {
        data[type] = {};
        data[type][this.field] = value;
      } else {
        data[this.field] = Number(value);
      }
      db.collection("check")
        .doc(this.id)
        .set(data, { merge: true });
    },
    debounceScore: debounce(function(val) {
      this.updateData("score", val);
    }, 500),
    debounceComment: debounce(function(val) {
      this.updateData("comment", val);
    }, 1000)
  }
};
</script>
