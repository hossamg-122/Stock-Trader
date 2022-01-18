<template>
  <div class="row-center cover">
    <div class="col-md-5 sign-up-box">
      <form class="form-horizontal " @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
          <div class="col-sm-8">
            <input
              type="email"
              class="form-control"
              id="inputEmail3"
              placeholder="Email"
              v-model="userData.email"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-2 control-label"
            >Password</label
          >
          <div class="col-sm-8">
            <input
              type="password"
              class="form-control"
              id="inputPassword3"
              placeholder="Password"
              v-model="userData.password"
            />
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="userData.rememberMe" /> Remember
                me
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-4">
            <button type="submit" class="btn btn-default">SIGN IN</button>
          </div>
           <div class=" col-sm-4">
            <button  class="btn btn-default" @click.prevent="$router.replace('/sign-up')" >Register</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import * as types from "../../store/types";
export default {
  data() {
    return {
      userData: {
        email: "",
        password: "",
        rememberMe: false
      }
    };
  },
  methods: {
     ...mapActions({
      signIn: types.SIGN_IN
    }),
    handleSubmit() {
      if (!this.userData.password || !this.userData.email) {
        alert("There is a missing field");
      } else {
        this.signIn(this.userData);
      }
    },
   
  }
};
</script>

<style scoped>
.cover {
  background-image: url(../../assets/stock-getty.jpg);
  background-size: cover;
  height: 90vh;
  margin: 4% 0;
  position: relative;
  border-radius: 20px;
    box-shadow: 5px 5px 5px 5px rgb(167, 164, 164);
}
.sign-up-box {
  position: absolute;
  top: 40%;
  left: 33%;
}
input {
  background-color: transparent;
  color: white;
}
label {
  color: white;
  text-align: left !important;
}
button {
  width: 100%;
  margin-top: 10px;
}
</style>
