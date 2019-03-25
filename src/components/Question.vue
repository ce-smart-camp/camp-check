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
          <td class="text-xs-left">{{ props.item.score.q1 }}</td>
          <td class="text-xs-left">{{ props.item.score.q2 }}</td>
          <td class="text-xs-left">{{ props.item.score.sum }}</td>
          <td class="text-xs-left">
            {{
              props.item.completed_at
                ? new Date(props.item.completed_at).toLocaleString()
                : ""
            }}
          </td>
          <td>
            {{ props.item.do.q1 }}
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
            {{ props.item.do.q2 }}
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
      rowsPerPageItems: [
        50,
        100,
        250,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      headers: [
        { text: "ID", align: "center", value: "id" },
        { text: "Q1", align: "center", value: "score.q1" },
        { text: "Q2", align: "center", value: "score.q2" },
        { text: "SUM", align: "center", value: "score.sum" },
        { text: "completed_at", align: "center", value: "completed_at" },
        { text: "Q1", align: "center", value: "do.q1" },
        { text: "Q2", align: "center", value: "do.q2" }
      ]
    };
  },
  computed: {
    question() {
      return this.$store.state.list.qus;
    },
    pagination: {
      get() {
        return this.$store.state.pagination;
      },
      set(value) {
        this.$store.commit("setPagination", value);
      }
    }
  }
};
</script>
