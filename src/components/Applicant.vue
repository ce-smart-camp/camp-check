<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h3 class="headline mb-0">รายชื่อน้องที่ส่งใบสมัคร</h3>
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
            รายชื่อน้อง
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="campers"
            :rows-per-page-items="rowsPerPageItems"
            :search="search"
            :pagination.sync="pagination"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td
                class="text-xs-left"
                :style="
                  props.item.mark.info == 1 ? 'background-color: silver;' : ''
                "
              >
                {{ props.item.id }}
              </td>
              <td class="text-xs-left">{{ props.item.score.info }}</td>
              <td class="text-xs-left">{{ props.item.info.name }}</td>
              <td class="text-xs-left">{{ props.item.info.surname }}</td>
              <td class="text-xs-left">{{ props.item.info.nickname }}</td>
              <td class="text-xs-left">{{ props.item.info.gender }}</td>
              <td class="text-xs-left">
                {{ new Date(props.item.created_at).toLocaleString() }}
              </td>
              <td class="justify-center layout px-0">
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
      </v-flex>

      <v-btn @click="recheck">Recheck</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import db from "./../core/db";
import firebase from "./../core/firebase";
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
        { text: "ID", value: "id" },
        { text: "score", value: "score.info" },
        { text: "Name", value: "info.name" },
        { text: "Surname", value: "info.surname" },
        { text: "Nickname", value: "info.nickname" },
        { text: "Gender", value: "info.gender" },
        { text: "created_at", value: "created_at" },
        { text: "Actions", value: "name", sortable: false }
      ]
    };
  },
  computed: {
    campers() {
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
  methods: {
    recheck() {
      var batch = db.batch();

      Object.keys(this.$store.state.key.qus).forEach(docID => {
        if (!this.$store.state.key.reg.hasOwnProperty(docID)) {
          var regRef = db.collection("reg").doc(docID);
          batch.update(regRef, {
            completed_at: firebase.firestore.Timestamp.fromMillis(
              this.$store.state.list.qus[this.$store.state.key.qus[docID]]
                .completed_at
            )
          });
        }
      });

      batch.commit().catch(err => {
        if (err.code === "permission-denied")
          alert("บอกผ่ายเว็บด้วย ถ้าหน้าต่างนี้แสดง");
        else throw err;
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === "/")
      Store.commit("setPagination", { sortBy: "created_at" });
    next();
  }
};
</script>
