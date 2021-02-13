<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-delete
      v-if="dialogs.delete"
      :task="task"
      @close="dialogs.delete = false"
    />
    <dialog-due-date
      v-if="dialogs.dueDate"
      :task="task"
      @close="dialogs.dueDate = false"
    />
    <dialog-edit
      v-if="dialogs.edit"
      :task="task"
      @close="dialogs.edit = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DialogDelete from "@/components/Todo/Dialogs/DialogDelete.vue";
import DialogEdit from "@/components/Todo/Dialogs/DialogEdit.vue";
import DialogDueDate from "@/components/Todo/Dialogs/DialogDueDate.vue";

export default Vue.extend({
  props: ["task"],
  data() {
    return {
      dialogs: {
        delete: false,
        edit: false,
        dueDate: false
      },
      items: [
        {
          title: "Edit",
          icon: "mdi-pencil",
          click() {
            this.dialogs.edit = true;
          }
        },
        {
          title: "Due Date",
          icon: "mdi-calendar",
          click() {
            this.dialogs.dueDate = true;
          }
        },
        {
          title: "Delete",
          icon: "mdi-delete",
          click() {
            this.dialogs.delete = true;
          }
        },
        {
          title: "Sort",
          icon: "mdi-drag-horizontal-variant",
          click() {
            this.$store.commit("toggleSorting");
          }
        }
      ]
    };
  },
  methods: {
    handleClick(index: number) {
      this.items[index].click.call(this);
    }
  },
  components: {
    "dialog-delete": DialogDelete,
    "dialog-due-date": DialogDueDate,
    "dialog-edit": DialogEdit
  }
});
</script>

<style></style>
