<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-card>
        <v-card-title>
          คำตอบน้อง
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="หาในตาราง"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="question"
          :rows-per-page-items="rowsPerPageItems"
          :search="search"
          :pagination.sync="pagination"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.info.name }}</td>
            <td class="text-xs-left">{{ props.item.info.surname }}</td>
            <td class="text-xs-left">{{ props.item.info.nickname }}</td>
            <td class="text-xs-left">{{ props.item.info.gender }}</td>
            <td class="text-xs-left">
              {{ props.item.score.q1
              }}<v-btn
                flat
                icon
                color="indigo"
                :to="{ name: 'qid1', params: { idNum: props.item.idNum } }"
              >
                <v-icon small class="mr-2 pl-2">insert_comment</v-icon>
              </v-btn>
            </td>
            <td class="text-xs-left">
              {{ props.item.score.q2
              }}<v-btn
                flat
                icon
                color="indigo"
                :to="{ name: 'qid2', params: { idNum: props.item.idNum } }"
              >
                <v-icon small class="mr-2 pl-2">insert_comment</v-icon>
              </v-btn>
            </td>
            <td class="text-xs-left">{{ props.item.score.sum }}</td>
            <td>
              <v-btn
                flat
                icon
                color="indigo"
                :to="{ name: 'aid', params: { id: props.item.id } }"
              >
                <v-icon small class="mr-2 pl-2">insert_comment</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      rowsPerPageItems: [
        50,
        100,
        250,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      headers: [
        { text: "ID", align: "center", value: "idNum" },
        { text: "Name", value: "info.name" },
        { text: "Surname", value: "info.surname" },
        { text: "Nickname", value: "info.nickname" },
        { text: "Gender", value: "info.gender" },
        { text: "Q1", align: "center", value: "score.q1" },
        { text: "Q2", align: "center", value: "score.q2" },
        { text: "SUM", align: "center", value: "score.sum" },
        { text: "info", align: "center", value: "info", sortable: false }
      ]
    };
  },
  computed: {
    question() {
      return this.$store.state.list.reg;
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
