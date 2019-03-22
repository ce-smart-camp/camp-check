<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex sm6>
        <v-text-field
          v-model="form.phone"
          label="หมายเลขโทรศัพท์"
          mask="## #### ####"
          readonly
        />
      </v-flex>

      <v-flex sm6>
        <v-text-field
          v-model="form.email"
          label="จดหมายอิเล็กทรอนิกส์"
          readonly
        />
      </v-flex>

      <v-flex sm6>
        <v-text-field v-model="form.fb" label="Facebook" readonly />
      </v-flex>

      <v-flex sm6>
        <v-text-field v-model="form.line" label="Line ID" readonly />
      </v-flex>

      <v-flex xs12>
        <v-textarea
          v-model="form.talent"
          label="ความสามารถพิเศษ"
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
          phone: null,
          email: null,
          fb: null,
          line: null,
          talent: null
        };
      }
    }
  }
};
</script>
