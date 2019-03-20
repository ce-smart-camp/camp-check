<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-data-table :headers="headers" :items="applicants" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.surname }}</td>
          <td class="text-xs-right">{{ props.item.gender }}</td>
          <td class="text-xs-right">
            {{ new Date(props.item.created_at).toString() }}
          </td>
          <td class="justify-center layout px-0">
            <v-btn
              flat
              icon
              color="indigo"
              :to="{ name: 'ApplicantDetail', params: { id: props.item.id } }"
            >
              <v-icon small class="mr-2 pl-2">insert_comment</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "Name", value: "name" },
        { text: "Surname", value: "surname" },
        { text: "Gender", value: "gender" },
        { text: "created_at", value: "created_at" },
        { text: "Actions", value: "name", sortable: false }
      ]
    };
  },
  computed: {
    applicants: function() {
      return this.$store.state.applicants;
    }
  },
  mounted() {
    this.$store.dispatch("loadData");
  }
};
</script>
