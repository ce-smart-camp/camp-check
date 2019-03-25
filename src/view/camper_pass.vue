<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex sm7 xs12>
        <v-text-field v-model="form.camp1" label="ค่ายที่ 1" readonly />
      </v-flex>

      <v-flex sm5 xs12>
        <v-text-field
          v-model="form.camp1_uni"
          label="มหาวิทยาลัย / หน่วยงาน"
          readonly
        />
      </v-flex>

      <v-flex sm7 xs12>
        <v-text-field v-model="form.camp2" label="ค่ายที่ 2" readonly />
      </v-flex>

      <v-flex sm5 xs12>
        <v-text-field
          v-model="form.camp2_uni"
          label="มหาวิทยาลัย / หน่วยงาน"
          readonly
        />
      </v-flex>

      <v-flex sm7 xs12>
        <v-text-field v-model="form.camp3" label="ค่ายที่ 3" readonly />
      </v-flex>

      <v-flex sm5 xs12>
        <v-text-field
          v-model="form.camp3_uni"
          label="มหาวิทยาลัย / หน่วยงาน"
          readonly
        />
      </v-flex>

      <v-flex xs12>
        <v-textarea
          v-model="form.knowFrom"
          label="รู้จักค่ายนี้มาจากที่ไหน"
          rows="3"
          readonly
          auto-grow
        />
      </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: function() {
        return {
          camp1: null,
          camp1_uni: null,
          camp2: null,
          camp2_uni: null,
          camp3: null,
          camp3_uni: null,
          knowFrom: null
        };
      }
    }
  }
};
</script>
