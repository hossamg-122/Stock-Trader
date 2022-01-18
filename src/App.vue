<template>
  <div class="container">
    <nav-bar v-if="userData.token" />
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { mapMutations,mapGetters,mapActions } from "vuex";
import * as types from "./store/types";
export default {
  components: {
    NavBar
  },
 computed: {
    ...mapGetters({
      funds: types.GET_FUNDS,
      userData: types.GET_USER_DATA
    })}
  ,
  methods: {
    ...mapMutations({
      initStocks: types.INIT_STOCKS
    }),
    ...mapActions({
      autoLogin:types.AUTO_LOGIN
    })
  },
  created() {
    this.autoLogin()
    this.initStocks();
  }
};
</script>

<style scoped>
.slide-enter-active {
  animation: animatedRoutes 0.5s ease-in-out forwards;
}
.slide-leave-active {
  animation: animatedRoutes 0.5s ease-in-out reverse forwards;
}
@keyframes animatedRoutes {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
