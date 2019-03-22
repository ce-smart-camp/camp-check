<template>
  <v-container>
    <v-layout text-xs-center wrap>
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
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.info.pic ? "Y" : "" }}</td>
            <td class="text-xs-left">{{ props.item.info.name }}</td>
            <td class="text-xs-left">{{ props.item.info.surname }}</td>
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
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      pagination: {
        sortBy: "created_at"
      },
      rowsPerPageItems: [
        50,
        100,
        250,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      headers: [
        { text: "ID", value: "id" },
        { text: "Picme", value: "info.pic" },
        { text: "Name", value: "info.name" },
        { text: "Surname", value: "info.surname" },
        { text: "Gender", value: "info.gender" },
        { text: "created_at", value: "created_at" },
        { text: "Actions", value: "name", sortable: false }
      ]
    };
  },
  computed: {
    campers() {
      return this.$store.state.list.reg;
    }
  }
};
</script>
