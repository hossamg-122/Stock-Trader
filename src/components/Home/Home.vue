<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <h1>Trade or View your Portfolio</h1>
      <p>You may Save & Load your Data</p>
      <p>Click on 'End Day' to begin a new Day!</p>
      <h1>Your Funds: {{ funds | currency }}</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../../store/types";
export default {
  computed: {
    ...mapGetters({
      funds: types.GET_FUNDS
    })
  }
};
</script>

<style></style>
