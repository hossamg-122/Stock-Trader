<template>
  <div class="cover-container">
    <div class="row-center cover">
      <div class="col-md-5 sign-up-box">
        <form class="form-horizontal " @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-4 control-label"
              >Email</label
            >
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
            <label for="inputPassword3" class="col-sm-4 control-label"
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
            <label for="inputPassword4" class="col-sm-4 control-label">
              Confirm Password</label
            >
            <div class="col-sm-8">
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="Password"
                v-model="userData.confirmPassword"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-4 col-sm-3">
              <button type="submit" class="btn btn-default">SIGN UP</button>
            </div>
            <div class="col-sm-5">
              <button
                type="submit"
                class="btn btn-default"
                @click.prevent="$router.replace('/sign-in')"
              >
                already have account ?
              </button>
            </div>
          </div>
        </form>
      </div>
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
        confirmPassword: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      if (
        !this.userData.password ||
        !this.userData.confirmPassword ||
        !this.userData.email
      ) {
        alert("There is a missing field");
      } else if (this.userData.password === this.userData.confirmPassword) {
        this.signUp(this.userData);
      } else {
        alert("Password and Confirm Password must be the same");
      }
    },
    ...mapActions({
      signUp: types.SIGN_UP
    })
  }
};
</script>

<style scoped>
.cover {
  background-image: url(../../assets/buyer.jpg);
  background-size: cover;
  margin: 4% 0;
  height: 90vh;
  position: relative;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px rgb(167, 164, 164);
}
.sign-up-box {
  position: absolute;
  top: 40%;
  left: 25%;
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
