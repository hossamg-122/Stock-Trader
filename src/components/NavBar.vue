<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link :to="'/home/' + $route.params.id" exact
          ><a class="navbar-brand">Brand</a></router-link
        >
      </div>

      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav" v-if="userData.token">
          <router-link
            :to="'/stocks/' + $route.params.id"
            tag="li"
            active-class="active"
            ><a>Stocks</a></router-link
          >
          <router-link
            :to="'/portofolio/' + $route.params.id"
            tag="li"
            active-class="active"
            ><a>Portfolio</a></router-link
          >
        </ul>
        <ul class="nav navbar-nav navbar-right" v-else>
          <router-link to="/sign-in" tag="li" active-class="active"
            ><a>SIGN IN</a></router-link
          >
          <router-link to="/sign-up" tag="li" active-class="active"
            ><a>SIGN UP</a></router-link
          >
        </ul>
        <ul class="nav navbar-nav navbar-right" v-if="userData.token">
          <li @click="resetPrices"><a href="#">End Day</a></li>

          <li
            class="dropdown"
            :class="{ open: isOpened }"
            @click="isOpened = !isOpened"
            ref="li"
          >
            <a
              class="dropdown-toggle "
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              >Save & Load <span class="caret"></span
            ></a>
            <ul class="dropdown-menu ">
              <li @click="saveData"><a>Save Data</a></li>
              <li @click="loadData"><a>Load Data</a></li>
            </ul>
          </li>
          <li>
            <a>
              <b>Funds:{{ funds | currency }}</b>
            </a>
          </li>
          <li @click="handleLogout">
            <a class="logout"> <b>Logout</b> </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import * as types from "../store/types";
export default {
  data() {
    return {
      isOpened: false
    };
  },
  computed: {
    ...mapGetters({
      funds: types.GET_FUNDS,
      userData: types.GET_USER_DATA
    })
  },
  methods: {
    ...mapMutations({
      resetPrices: types.RND_STOCKS,
      handleLogout: types.LOGOUT_USER
    }),
    ...mapActions({
      saveData: types.SAVE_DATA,
      loadData: types.LOAD_DATA
    }),
    closeDropMenue(e) {
      if (this.userData.token) {
        if (!this.$refs.li.contains(e.target)) {
          this.isOpened = false;
        }
      }
    }
  },

  mounted() {
    document.addEventListener("click", this.closeDropMenue);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeDropMenue);
  }
};
</script>

<style scoped>
.logout:hover {
  cursor: pointer;
  color: red !important;
}
</style>
