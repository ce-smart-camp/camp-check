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
    form: {
      type: Object,
      default: function() {
        return {
          disease: null,
          drug: null,
          food: null
        };
      }
    }
  }
};
</script>
