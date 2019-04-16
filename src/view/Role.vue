<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-card-actions>
            <v-btn color="orange darken-2" dark to="/"
              ><v-icon dark left>arrow_back</v-icon>กลับไปหน้าหลัก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <!-- <v-data-table :headers="headers" :items="friends">
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.surname }}</td>
              <td>{{ props.item.nickname }}</td>
              <td>{{ props.item.email }}</td>
              <td>{{ props.item.more }}</td>
              <td>{{ props.item.q1 }}</td>
              <td>{{ props.item.q2 }}</td>
              <td>{{ props.item.check }}</td>
            </template>
          </v-data-table> -->
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-container>
            <v-layout wrap>
              <v-flex v-for="role in roles" :key="role.field" xs12>
                <RoleSelect :field="role.field" :label="role.label" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RoleSelect from "./../components/RoleSelect";

export default {
  components: {
    RoleSelect
  },
  data() {
    return {
      headers: [
        { text: "id", value: "id" },
        { text: "name", value: "name" },
        { text: "surname", value: "surname" },
        { text: "nickname", value: "nickname" },
        { text: "email", value: "email" },
        { text: "more", value: "more" },
        { text: "q1", value: "q1" },
        { text: "q2", value: "q2" },
        { text: "check", value: "check" }
      ],
      roles: [
        { field: "q1", label: "คำถาม Part 1" },
        { field: "q2", label: "คำถาม Part 2" },
        { field: "check", label: "อนุญาติให้คะแนนได้" },
        { field: "more", label: "แสดงข้อมูลมากขึ้น" }
      ]
    };
  },
  computed: {
    friends() {
      return this.$store.state.list.role;
    }
  },
  created() {
    this.$store.dispatch("init", "role");
  }
};
</script>
