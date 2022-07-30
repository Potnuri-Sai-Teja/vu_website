<template>
  <div class="app">
    <div id="nav">
      <ul>
        <li><router-link to="/User_home_page">Home</router-link></li>
        <li><router-link to="/User_about_page">ABOUT us</router-link></li>
        <li>
          <router-link to="/View_your_orders_page">View ORDERS</router-link>
        </li>
        <li></li>
      </ul>
    </div>

    <div class="register-form">
      <h4>PAYMENT METHODS</h4>
      <div class="payment">
        <div class="register">
          <input
            type="submit"
            class="submit-button"
            value="CASH ON DELIVERY"
            @click="confirm_payment"
          />
          <input
            type="submit"
            class="submit-button"
            value="ONLINE"
            @click="onlinepay"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userid: "",
      my_sec_key_check: 0,
      p_c_id: "",
    };
  },
  created() {
    axios.defaults.baseURL = "http://localhost:5000";
  },
  methods: {
    async onlinepay() {
      alert("THIS PROCESS UNDER CONSTRUCTION, KINDLY GO WITH CASH ON DELIVERY");
      this.$router.push("/Payment_page");
    },
    async confirm_payment() {
      this.userid = JSON.parse(localStorage.getItem("user1"));
      this.my_sec_key_check = JSON.parse(localStorage.getItem("my_sec_key"));
      this.p_c_id = JSON.parse(localStorage.getItem("product_id"));

      axios
        .post("/confirm_payment", {
          userid_2: this.userid,
          my_sec_key_check: this.my_sec_key_check,
          p_c_id: this.p_c_id,
        })
        .then((res) => {
          if (res.data.my_key1 == 777) {
            let my_key_val = 11;
            localStorage.setItem("my_sec_key", JSON.stringify(my_key_val));
          }
          console.log();
          if (res.data.status == 2) {
            this.$router.push("/thank_you_page1");
          }
        });
    },
  },
};
</script>
<style lang="scss">
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.payment {
  .submit-button {
    width: 173px;
    margin: 30px 10px 0 0;
  }
}
#nav {
  margin: 0 0 40px 0;
}
</style>
