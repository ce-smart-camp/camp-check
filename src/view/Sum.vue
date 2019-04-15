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
            <v-spacer />
            <v-btn @click="exportCSV"
              ><v-icon dark left>get_app</v-icon>ส่งออกข้อมูล</v-btn
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
            :custom-sort="customSort"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td class="text-xs-left text-truncate">{{ props.item.id }}</td>
              <td class="text-xs-left text-no-wrap">
                {{ props.item.info.name }}
              </td>
              <td class="text-xs-left text-no-wrap">
                {{ props.item.info.surname }}
              </td>
              <td class="text-xs-left">{{ props.item.info.nickname }}</td>
              <td class="text-xs-left">{{ props.item.info.gender }}</td>
              <td class="text-xs-left text-no-wrap">
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
              <td class="text-xs-left text-no-wrap">
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
              <td class="text-xs-left text-no-wrap">
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

import { getObjectValueByPath } from "vuetify/lib/util/helpers";

import XLSX from "xlsx";

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
        { text: "ID", align: "center", value: "idNum" },
        { text: "Name", value: "info.name" },
        { text: "Surname", value: "info.surname" },
        { text: "Nickname", value: "info.nickname" },
        { text: "Gender", value: "info.gender" },
        { text: "Q1", align: "center", value: "score.q1" },
        { text: "Q2", align: "center", value: "score.q2" },
        { text: "info", align: "center", value: "score.info" },
        { text: "all", align: "center", value: "score.all" }
      ],
      sortItems: []
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
    },
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        this.$store.commit("setSearch", value);
      }
    }
  },
  created() {
    this.$store.dispatch("init", "check");
    this.$store.dispatch("init", "reg");
  },
  methods: {
    // credit: https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/mixins/data-iterable.js
    customSort(items, index, isDescending) {
      if (index === null) return items;

      this.sortItems = items.sort((a, b) => {
        let sortA = getObjectValueByPath(a, index);
        let sortB = getObjectValueByPath(b, index);

        if (isDescending) {
          [sortA, sortB] = [sortB, sortA];
        }

        // Check if both are numbers
        if (!isNaN(sortA) && !isNaN(sortB)) {
          return sortA - sortB;
        }

        // Check if both cannot be evaluated
        if (sortA === null && sortB === null) {
          return 0;
        }

        [sortA, sortB] = [sortA, sortB].map(s =>
          (s || "").toString().toLocaleLowerCase()
        );

        if (sortA > sortB) return 1;
        if (sortA < sortB) return -1;

        return 0;
      });

      return this.sortItems;
    },
    exportCSV() {
      var headers = [
        { text: "id", value: "id", width: 33.3 },
        { text: "nid", value: "info.nid", width: 14 },
        { text: "name", value: "info.name", width: 12 },
        { text: "surname", value: "info.surname", width: 16 },
        { text: "nickname", value: "info.nickname", width: 9.1 },
        { text: "gender", value: "info.gender", width: 9.8 },
        { text: "birth", value: "info.birth", width: 10 },
        { text: "religion", value: "info.religion", width: 9.5 },
        { text: "shirt", value: "info.shirt", width: 4 },
        { text: "phone", value: "contact.phone", width: 11 },
        { text: "email", value: "contact.email", width: 32.1 },
        { text: "fb", value: "contact.fb", width: 27.1 },
        { text: "line", value: "contact.line", width: 20.9 },
        { text: "talent", value: "contact.talent", width: 40 },
        { text: "disease", value: "health.disease", width: 20 },
        { text: "drug", value: "health.drug", width: 20 },
        { text: "food", value: "health.food", width: 20 },
        { text: "school", value: "edu.school", width: 40 },
        { text: "province", value: "edu.province", width: 14 },
        { text: "plan", value: "edu.plan", width: 20 },
        { text: "class", value: "edu.class", width: 6 },
        { text: "gpax", value: "edu.gpax", width: 6 },
        { text: "pname", value: "parent.name", width: 12 },
        { text: "psurname", value: "parent.surname", width: 16 },
        { text: "prelation", value: "parent.relation", width: 9 },
        { text: "ptel", value: "parent.tel", width: 11 },
        { text: "Q1", value: "score.q1" },
        { text: "Q2", value: "score.q2" },
        { text: "INFO", value: "score.info" },
        { text: "ALL", value: "score.all" }
      ];
      var data = this.sortItems;
      data = data.map(obj =>
        headers.map(header => {
          let val = getObjectValueByPath(obj, header.value);
          if (val === null) val = "";
          return val.toString().trim();
        })
      );

      // Add header to sheet
      data.unshift(headers.map(header => header.text));

      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.aoa_to_sheet(data);

      ws["!cols"] = [];
      headers.forEach((header, index) => {
        ws["!cols"][index] = { width: header.width || 8 };
      });

      XLSX.utils.book_append_sheet(wb, ws, "ข้อมูลส่วนตัวน้อง");
      XLSX.writeFile(wb, "ข้อมูลน้อง.xlsx");
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === "/") {
      Store.commit("setPagination", {
        sortBy: "score.all",
        descending: true
      });
      Store.commit("setSearch", null);
    }
    next();
  }
};
</script>
