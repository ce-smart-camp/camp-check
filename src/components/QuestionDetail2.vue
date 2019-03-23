<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <AcademicLogic :form="qus.logic" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <AcademicElect :form="qus.elect" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <AcademicPro :form="qus.pro" />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <AcademicIOT :form="qus.iot" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AcademicLogic from "./../view/academic_logic";
import AcademicElect from "./../view/academic_elect";
import AcademicPro from "./../view/academic_pro";
import AcademicIOT from "./../view/academic_iot";

export default {
  components: {
    AcademicLogic,
    AcademicElect,
    AcademicPro,
    AcademicIOT
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
