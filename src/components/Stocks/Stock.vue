<template>
  <div class="col-md-6">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          <b
            >{{ stock.title }} <small>(Price:{{ stock.price }})</small>
          </b>
        </h3>
      </div>
      <div class="panel-body">
        <form @submit.prevent class="form-inline">
          <div class="form-group">
            <input
              type="number"
              class="form-control"
              placeholder="Quantity"
              v-model="quantity"
              :class="{ danger: insufficientFunds }"
            />
          </div>

          <button
            type="submit"
            class="btn btn-success pull-right"
            :disabled="quantity <= 0 || insufficientFunds"
            @click="handleBuyStock(stock)"
            :class="{ 'btn-danger': insufficientFunds }"
          >
            {{ insufficientFunds ? "Insufficient Funds" : "Buy" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import * as types from "../../store/types";
export default {
  props: ["stock"],
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    ...mapGetters({
      funds: types.GET_FUNDS
    })
  },
  methods: {
    ...mapMutations({
      buyStock: types.BUY_STOCK
    }),
    handleBuyStock(stock) {
      let order = { ...stock, quantity: parseInt(this.quantity) };

      this.buyStock(order);

      this.quantity = 0;
    }
  }
};
</script>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>
