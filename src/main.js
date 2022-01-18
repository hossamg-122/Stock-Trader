import Vue from "vue";
import App from "./App.vue";
import router from "./routes/router";
import { store } from "./store/store";

Vue.mixin({
  computed: {
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    }
  }
});
Vue.filter("currency", value => {
  return "$" + value.toLocaleString();
});
new Vue({
  el: "#app",
  store,
  router,

  render: h => h(App)
});
