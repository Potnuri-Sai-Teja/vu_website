<template>
  <div id="register1">
    <div id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/Registration_page">Register</router-link></li>
        <li><router-link to="/About_page">About US</router-link></li>
        <li><router-link to="/Contactus_page">Contact us</router-link></li>
      </ul>
    </div>
    <router-view />
    <div class="login-form">
      <form @submit.prevent="login1">
        <div class="form-design">
          <label> EMAIL ID:</label>
          <input type="email" v-model="username1" name="username1" required />
        </div>
        <div class="form-design">
          <label> Password:</label>
          <input
            type="password"
            v-model="password1"
            name="password1"
            required
          />
        </div>
        <input type="submit" class="submit-button" value="login" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username1: "",
      password1: "",
    };
  },
  created() {
    axios.defaults.baseURL = "http://localhost:5000";
  },
  methods: {
    async login1() {
      axios
        .post("/login", {
          username1: this.username1,
          password1: this.password1,
        })
        .then((res) => {
          console.log(res.data.status);

          if (res.data.status === 2) {
            localStorage.setItem("user1", JSON.stringify(res.data.type_user));

            if (res.data.type_user == "admin@gmail.com") {
              this.$router.push("/Admin_home_page");
            } else {
              this.$router.push("/User_home_page");
            }
          } else if (res.data.status === 1) {
            alert("Login failed INCORRECT PASSWORD");
            this.$router.push("/Login_page");
          } else if (res.data.status === 0) {
            alert("Login failed INCORRECT EMAIL ID");
            this.$router.push("/Login_page");
          } else {
            this.$router.push("/Login_page");
          }
        });
      (this.username1 = ""), (this.password1 = "");
    },
  },
};
</script>

<style lang="scss">
.login-form {
  padding: 60px 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 350px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px auto;
  margin-top: 63px;
  border-radius: 5px;
  padding: 60px 0;
}
.form-design {
  padding: 0 0 30px 0;
  label {
    padding: 0 10px 0 0px;
  }
}
.submit-button {
  background: #45acd6;
  color: #fff;
  border: none;
  width: 105px;
  padding: 9px 0;
  border-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  cursor:pointer;
}
#register1 {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
