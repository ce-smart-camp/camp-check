<template>
  <v-container grid-list-xl>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card>
          <Question1 :form="qus.q1" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <Question2 :form="qus.q2" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <Question3 :form="qus.q3" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Question1 from "./../view/qustion_1";
import Question2 from "./../view/qustion_2";
import Question3 from "./../view/qustion_3";

export default {
  components: {
    Question1,
    Question2,
    Question3
  },
  computed: {
    qus() {
      return this.$store.state.list.qus[
        this.$store.state.key.qus[this.$route.params.id]
      ];
    }
  }
};
</script>
