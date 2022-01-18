<template>
  <div class="row">
<portofolio-stock v-for="stock in myStocks" :key="stock.id" :stock="stock" />
  </div>
</template>

<script>
import PortofolioStock from './PortofolioStock.vue'
import * as types from "../../store/types"
import {mapGetters} from "vuex"
export default {
  components: { PortofolioStock },
  computed:{
    ...mapGetters({
      myStocks:[types.GET_MYSTOCKS]
    })
  }

}
</script>

<style>

</style>