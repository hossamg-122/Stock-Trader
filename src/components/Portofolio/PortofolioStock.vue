<template>
  <div class="col-md-6">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          <b
            >{{ stock.title }}
            <small
              >(Price:{{ stock.price }} | Quantity:{{ stock.quantity }})</small
            >
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
              :class="{ danger: insufficientQuantity }"
            />
          </div>

          <button
            type="submit"
            class="btn btn-success pull-right"
            :disabled="quantity <= 0 || insufficientQuantity"
            @click="handleSellStock(stock)"
            :class="{ 'btn-danger': insufficientQuantity }"
          >
            {{ insufficientQuantity ? "Insufficient Quantity" : "Sell" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "../../store/types";
import { mapMutations, mapGetters } from "vuex";
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
      sellStock: types.SELL_STOCK
    }),
    handleSellStock(stock) {
      let order = { ...stock, quantity: parseInt(this.quantity) };
      this.sellStock(order);

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
