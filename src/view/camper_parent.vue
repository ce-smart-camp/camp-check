<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex sm6 xs12>
        <v-text-field v-model="form.name" label="ชื่อ" readonly />
      </v-flex>

      <v-flex sm6 xs12>
        <v-text-field v-model="form.surname" label="นามสกุล" readonly />
      </v-flex>

      <v-flex sm6 xs12>
        <v-text-field v-model="form.relation" label="ความเกี่ยวข้อง" readonly />
      </v-flex>

      <v-flex sm6 xs12>
        <v-text-field
          v-model="form.tel"
          label="หมายเลขโทรศัพท์"
          mask="## #### ####"
          readonly
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
          name: null,
          surname: null,
          relation: null,
          tel: null
        };
      }
    }
  }
};
</script>
