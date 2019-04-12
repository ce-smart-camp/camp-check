<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h3 class="headline mb-0">รายชื่อน้องเรียงตามคะแนน</h3>
          </v-card-title>
          <v-card-actions>
            <v-btn color="orange darken-2" dark to="/"
              ><v-icon dark left>arrow_back</v-icon>กลับไปหน้าหลัก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex>
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
              <td class="text-xs-left">
                {{ props.item.score.info
                }}<v-btn
                  flat
                  icon
                  color="indigo"
                  :to="{ name: 'aid', params: { id: props.item.id } }"
                >
                  <v-icon small class="mr-2 pl-2">insert_comment</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-left">{{ props.item.score.all }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Store from "./../store";

export default {
  data() {
    return {
      search: null,
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
        { text: "info", align: "center", value: "score.info" },
        { text: "all", align: "center", value: "score.all" }
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
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === "/")
      Store.commit("setPagination", {
        sortBy: "score.all",
        descending: true
      });
    next();
  }
};
</script>
