<template>
  <v-card-text>
    <v-textarea
      v-model="form.disease"
      label="โรคประจำตัว"
      rows="3"
      readonly
      auto-grow
    />
    <v-textarea
      v-model="form.drug"
      label="ยาที่แพ้"
      rows="3"
      readonly
      auto-grow
    />
    <v-textarea
      v-model="form.food"
      label="อาหารที่แพ้"
      rows="3"
      readonly
      auto-grow
    />
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
      disease: null,
      drug: null,
      food: null
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
