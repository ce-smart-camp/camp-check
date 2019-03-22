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
    value: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: () => ({
    form: {
      phone: null,
      email: null,
      fb: null,
      line: null,
      talent: null
    }
  }),
  watch: {
    value: {
      handler(val) {
        this.form = val;
      },
      deep: true
    }
  },
  mounted: function() {
    if (this.value !== null) {
      Object.keys(this.form).forEach(key => {
        this.form[key] = this.value[key] || null;
      });
    }
    this.$emit("input", this.form);
  }
};
</script>
