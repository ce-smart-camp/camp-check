<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-data-table
        :headers="headers"
        :items="applicants"
        :pagination.sync="pagination"
        :total-items="totalApplicants"
        :loading="loading"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.info.name }}</td>
          <td class="text-xs-right">{{ props.item.info.surname }}</td>
          <td class="text-xs-right">{{ props.item.info.gender }}</td>
          <td class="text-xs-right">
            {{
              new Date(
                props.item.created_at.seconds * 1000 +
                  props.item.created_at.nanoseconds / 1000000
              ).toString()
            }}
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
import db from "./../core/db";

export default {
  data() {
    return {
      totalApplicants: 0,
      applicants: [],
      loading: true,
      pagination: {},
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "Name", value: "info.name", sortable: false },
        { text: "Surname", value: "info.surname", sortable: false },
        { text: "Gender", value: "info.gender", sortable: false },
        { text: "created_at", value: "created_at" },
        { text: "Actions", value: "name", sortable: false }
      ],
      past: {
        page: -1,
        first: null,
        last: null
      }
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(items => {
          this.applicants = items;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getTotal().then(size => {
      this.totalApplicants = size;
    });
    this.getDataFromApi().then(items => {
      this.applicants = items;
    });
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        let { sortBy, descending, page, rowsPerPage } = this.pagination;

        let ref = db.collection("qus");

        if (sortBy !== null)
          ref = ref.orderBy(sortBy, descending ? "desc" : "asc");

        if (page !== 1) {
          if (page > this.past.page) {
            ref = ref.startAfter(this.past.last);
          } else if (page < this.past.page) {
            ref = ref.endBefore(this.past.first);
          } else {
            ref = ref.startAt(this.past.first);
          }
        }

        if (rowsPerPage !== -1) ref = ref.limit(rowsPerPage);

        ref
          .get()
          .then(querySnapshot => {
            const { size } = querySnapshot;
            let i = 0;
            let items = [];

            this.past.last = querySnapshot.docs[size - 1];
            this.past.first = querySnapshot.docs[0];

            querySnapshot.forEach(doc => {
              let data = doc.data();
              data.id = doc.id;

              items.push(data);

              if (++i == size) {
                this.loading = false;
                resolve(items);
              }
            });
          })
          .catch(err => reject(err));
      });
    },

    getTotal() {
      return new Promise((resolve, reject) => {
        db.collection("reg")
          .get()
          .then(querySnapshot => resolve(querySnapshot.size))
          .catch(err => reject(err));
      });
    }
  }
};
</script>
