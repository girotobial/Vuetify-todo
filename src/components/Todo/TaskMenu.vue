<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index" @click="handleClick(index)">
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      items: [
        {
          title: "Edit",
          icon: "mdi-pencil",
          click() {}
        },
        {
          title: "Due Date",
          icon: "mdi-calendar",
          click() {}
        },
        {
          title: "Delete",
          icon: "mdi-delete",
          click() {}
        }
      ]
    };
  },
  methods: {
    handleClick(index: number) {
      this.items[index].click();
    }
  }
});
</script>

<style></style>
