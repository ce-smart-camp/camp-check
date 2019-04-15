<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h3 class="headline mb-0">คำถามที่น้องส่งมา</h3>
          </v-card-title>
          <v-card-actions>
            <v-btn color="orange darken-2" dark to="/"
              ><v-icon dark left>arrow_back</v-icon>กลับไปหน้าหลัก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h3>คำค้นหา</h3>
          </v-card-title>
          <v-card-text class="pt-0">
            <div>
              <p>
                <kbd>M</kbd> => การมาร์คทุกอย่าง<br />
                <kbd>Mi</kbd> => มาร์ครายคน<br />
                <kbd>Mq</kbd> => มาร์คคำถาม<br />
                <kbd>Mq1</kbd> => คำถามชุด 1 , <kbd>Mq2</kbd> => คำถามชุด 2<br />
                <kbd>Mq1-4</kbd> => คำถามชุด 1 ข้อ 4 , <kbd>Mq2-11</kbd> =>
                คำถามชุด 2 ข้อ 11
              </p>
              <p class="mb-0">
                การค้นหาจะคล้ายกับการมาร์ค แต่จะใช้ <kbd>C</kbd> แทน<br />
                <kbd>C</kbd> => ที่ใส่ comment ทั้งหมด<br />
                จะใช้ <kbd>|</kbd> ในการคั่นระหว่างจุดที่ค้นหากับคำค้นหา<br />
                <kbd>C|ไม่</kbd> => หาคำว่า <code>ไม่</code> ที่อยู่ใน comment
                ทั้งหมด<br />
                <kbd>Cq2-1|ใช่</kbd> => หาคำว่า <code>ใช่</code> ที่อยู่ใน
                comment คำถามชุด 2 ข้อ 1
              </p>
            </div>
          </v-card-text>
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
            :custom-filter="filter"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td
                class="text-xs-left"
                :style="
                  props.item.mark.info == 1 ? 'background-color: silver;' : ''
                "
              >
                {{ props.item.idNum + 1 }}
              </td>
              <td class="text-xs-right">{{ props.item.score.q1 }}</td>
              <td class="text-xs-right">{{ props.item.score.q2 }}</td>
              <td class="text-xs-right">{{ props.item.score.sum }}</td>
              <td class="text-xs-left text-no-wrap">
                {{ new Date(props.item.completed_at).toLocaleString() }}
              </td>
              <td class="text-xs-right text-no-wrap">
                {{ props.item.mark.q1 }} /
                {{ props.item.do.q1 }}
                <v-btn
                  flat
                  icon
                  color="indigo"
                  :to="{ name: 'qid1', params: { idNum: props.item.idNum } }"
                >
                  <v-icon small class="mr-2 pl-2">insert_comment</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-right text-no-wrap">
                {{ props.item.mark.q2 }} /
                {{ props.item.do.q2 }}
                <v-btn
                  flat
                  icon
                  color="indigo"
                  :to="{ name: 'qid2', params: { idNum: props.item.idNum } }"
                >
                  <v-icon small class="mr-2 pl-2">insert_comment</v-icon>
                </v-btn>
              </td>
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
      rowsPerPageItems: [
        50,
        100,
        250,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      headers: [
        { text: "ID", align: "center", value: "idNum" },
        { text: "Q1", align: "center", value: "score.q1" },
        { text: "Q2", align: "center", value: "score.q2" },
        { text: "SUM", align: "center", value: "score.sum" },
        { text: "completed_at", align: "center", value: "completed_at" },
        { text: "Q1", align: "center", value: "mark.q1" },
        { text: "Q2", align: "center", value: "mark.q2" }
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
    this.$store.dispatch("init", "qus");
  },
  methods: {
    filter(items, search) {
      search = search.toString();
      if (search.trim() === "") return items;

      const Key = { C: "comment", M: "mark" };
      const type = Key[search.charAt(0)];
      if (typeof type !== "undefined") {
        return items.filter(item => {
          const index = this.$store.state.key.check[item.id];
          if (typeof index !== "undefined") {
            const sub = search
              .substr(1)
              .toLowerCase()
              .split("|");
            const data = this.$store.state.list.check[index][type];
            return Object.keys(data).some(
              key =>
                key !== "sum" &&
                key.indexOf(sub[0].trim()) !== -1 &&
                data[key] !== null &&
                data[key] !== false &&
                data[key] !== "" &&
                (typeof sub[1] !== "undefined"
                  ? data[key]
                      .toString()
                      .toLowerCase()
                      .indexOf(sub[1].trim()) !== -1
                  : true)
            );
          }
          return false;
        });
      }

      return [];
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === "/") {
      Store.commit("setPagination", { sortBy: "completed_at" });
      Store.commit("setSearch", null);
    }
    next();
  }
};
</script>
