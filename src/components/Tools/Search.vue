<template>
  <v-text-field
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    class="expanding-search mt-1"
    :class="{ closed: searchClosed }"
    placeholder="Search"
    filled
    dense
    clearable
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      searchClosed: true
    };
  }
});
</script>

<style lang="sass">
.expanding-search
  .v-input__slot
    &:before, &:after
      border-color: transparent !important
  &.closed
    max-width: 45px
</style>
