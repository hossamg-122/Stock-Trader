<template>
<div class="row">
 <stock v-for="stock in stocks" :key="stock.id" :stock="stock" />
</div>
 
</template>

<script>
import Stock from './Stock.vue'
import { mapGetters } from "vuex"
import * as types from "../../store/types"
export default {
  components: { Stock },computed:{
    ...mapGetters({
      stocks:types.GET_STOCKS
    })
  }

}
</script>

<style>

</style>