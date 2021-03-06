<template>
  <v-toolbar dense>
    <v-text-field
      v-model.number="score"
      type="number"
      single-line
      hide-details
      placeholder="คะแนน"
      style="max-width: 70px;"
      :class="{ 'pt-0': true, orange: !inputScore }"
      :disabled="!enable"
      @input="debounceScore"
    ></v-text-field>
    <v-divider class="mx-3" vertical />
    <v-text-field
      v-model="comment"
      single-line
      hide-details
      placeholder="Comment"
      :class="{ 'pt-0': true, orange: !inputComment }"
      :disabled="!enable"
      @input="debounceComment"
    ></v-text-field>
    <v-divider class="mx-3" vertical />
    <v-menu :close-on-content-click="false" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          flat
          style="min-width: 0px;width: 36px;margin-left: 0px;margin-right: 0px;"
          v-on="on"
        >
          <v-icon>format_color_fill</v-icon>
        </v-btn>
      </template>

      <compact-picker v-model="mark" />
    </v-menu>
  </v-toolbar>
</template>

<script>
import debounce from "lodash.debounce";

import { Compact } from "vue-color";

import db from "./../core/db";

export default {
  components: {
    "compact-picker": Compact
  },
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
  data() {
    return {
      inputScore: true,
      inScore: null,
      inputComment: true,
      inComment: null
    };
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
    score: {
      get() {
        return this.check[this.field];
      },
      set(val) {
        this.inScore = val;
        this.inputScore = false;
      }
    },
    comment: {
      get() {
        return this.check.comment[this.field];
      },
      set(val) {
        this.inComment = val;
        this.inputComment = false;
      }
    },
    mark: {
      get() {
        var raw = this.check.mark[this.field];
        if (raw === true) return "#000000";
        if (raw === null || raw === false || raw === undefined)
          return "#FFFFFF";
        return raw;
      },
      set(value) {
        this.updateData("mark", value.hex);
      }
    }
  },
  watch: {
    id() {
      this.inScore = this.score;
      this.inComment = this.comment;
    },
    score(val) {
      this.inputScore = val == this.inScore;
    },
    comment(val) {
      this.inputComment = val == this.inComment;
    },
    inputScore() {
      this.$emit("canChange", this.inputScore && this.inputComment);
    },
    inputComment() {
      this.$emit("canChange", this.inputScore && this.inputComment);
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
        data[this.field] = value;
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
    }, 500)
  }
};
</script>

<style scoped>
.vc-compact {
  width: 245px;
}
</style>
