<template>
  <v-autocomplete
    v-model="list"
    :items="friends"
    box
    chips
    clearable
    :label="label"
    item-value="id"
    :filter="customFilter"
    multiple
  >
    <template v-slot:selection="data">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-chip
            :selected="data.selected"
            close
            class="chip--select-multi"
            @input="remove(data.item)"
            v-on="on"
          >
            {{ data.item.nickname }}
          </v-chip>
        </template>
        <span>{{ data.item.name }} {{ data.item.surname }}</span>
      </v-tooltip>
    </template>

    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item" />
      </template>
      <template v-else>
        <v-list-tile-content>
          <v-list-tile-title
            >{{ data.item.nickname }} &mdash;
            {{ data.item.name }}
            {{ data.item.surname }}</v-list-tile-title
          >
          <v-list-tile-sub-title>{{ data.item.email }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </template>
    </template>

    <template v-slot:append-outer>
      <v-icon @click="addAll">select_all</v-icon>
    </template>
  </v-autocomplete>
</template>

<script>
import db from "./../core/db";

export default {
  props: {
    label: {
      type: String,
      default: "Select"
    },
    field: {
      type: String,
      required: true
    }
  },
  computed: {
    friends() {
      return this.$store.state.list.role;
    },
    list: {
      get: function() {
        return this.friends.filter(obj => obj[this.field]).map(obj => obj.id);
      },
      set: function(newValue) {
        newValue = newValue || [];
        let oldValue = this.list || [];
        let sum = newValue.concat(oldValue);

        var batch = db.batch();

        sum.forEach(id => {
          let dbDoc = db.collection("role").doc(id);
          let data = {};
          if (newValue.indexOf(id) > -1) {
            if (oldValue.indexOf(id) === -1) {
              data[this.field] = true;
            }
          } else {
            data[this.field] = false;
          }
          batch.update(dbDoc, data);
        });

        batch.commit().catch(err => {
          if (err.code === "permission-denied")
            alert("บอกผ่ายเว็บด้วย ถ้าหน้าต่างนี้แสดง");
          else throw err;
        });
      }
    }
  },
  methods: {
    customFilter(item, queryText) {
      var { name, surname, nickname, email } = item;
      return (
        name.indexOf(queryText) > -1 ||
        surname.indexOf(queryText) > -1 ||
        nickname.indexOf(queryText) > -1 ||
        email.indexOf(queryText) > -1
      );
    },
    remove(item) {
      var data = [...this.list];
      const index = data.indexOf(item.id);
      if (index >= 0) {
        data.splice(index, 1);
        this.list = data;
      }
    },
    addAll() {
      this.list = this.friends.map(obj => obj.id);
    }
  }
};
</script>
