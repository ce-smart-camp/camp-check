<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-data-table
        :headers="headers"
        :items="question"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">
            {{ new Date(props.item.update_at).toLocaleString() }}
          </td>
          <td>
            <v-btn
              flat
              icon
              color="indigo"
              :to="{ name: 'qid1', params: { id: props.item.id } }"
            >
              <v-icon small class="mr-2 pl-2">insert_comment</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn
              flat
              icon
              color="indigo"
              :to="{ name: 'qid2', params: { id: props.item.id } }"
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
      pagination: {
        sortBy: "update_at"
      },
      rowsPerPageItems: [
        50,
        100,
        250,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      headers: [
        { text: "ID", align: "center", sortable: false, value: "id" },
        { text: "update_at", align: "center", value: "update_at" },
        { text: "Q1", align: "center", value: "q1", sortable: false },
        { text: "Q2", align: "center", value: "q2", sortable: false }
      ]
    };
  },
  computed: {
    question() {
      return this.$store.state.list.qus;
    }
  }
};
</script>
