<template>
  <div class="app">
    <div id="nav">
      <ul>
        <li><router-link to="/User_home_page">Home</router-link></li>
        <li><router-link to="/User_about_page">ABOUT us</router-link></li>
        <li>
          <router-link to="/View_your_orders_page">View ORDERS</router-link>
        </li>
        <li><router-link to="/" @click="logout_api">Logout</router-link></li>
      </ul>
    </div>
  <div class="register-form">
    <h4>DELIVERY DETAILS</h4>
    <form @submit.prevent="user_product_details">
      <div class="form-group">
        <div class="label">
          <label> NAME</label>
        </div>
        <div class="input-form">
          <input type="text" v-model="name1" required />
        </div>
      </div>
      <div class="form-group">
        <div class="label">
          <label for="phone"> phone number:</label>
        </div>
        <div class="input-form">
          <input
            type="tel"
            name="phone"
            v-model="phone1"
            pattern="[0-9]{4}[0-9]{4}[0-9]{2}"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <div class="label">
          <label> Location :</label>
        </div>
        <div class="input-form">
          <textarea v-model="address1" name="address1"></textarea>
        </div>
      </div>
      <div class="register">
        <input type="submit" class="submit-button" value="Submit" />
      </div>
    </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name1: "",
      phone1: 0,
      address1: "",
      product_names: [],
      product_prices: [],
      total_price: 0,
      User_id: "",
      transaction_status: "",
      Delivery_status: "",
      Delivey_Dates: "",
      check_length: 0,
      tot_price: 0,
      my_sec_key: 0,
    };
  },
  created() {
    axios.defaults.baseURL = "http://localhost:5000";
  },
  methods: {
    async user_product_details() {
      const user123 = JSON.parse(localStorage.getItem("user1"));
      this.transaction_status = "PENDING";
      this.Delivery_status = "PENDING";
      this.check_length = this.name1.length;
      this.my_sec_key = this.$route.params.my_key;
      this.Delivey_Dates = "";

      if (this.my_sec_key == 420) {
        this.product_names = this.$route.params.p2_name;

        this.product_prices = this.$route.params.p2_price;

        this.tot_price = this.$route.params.p2_total_price;
      } else {
        let data_names = this.$route.params.p1_name;
        this.product_names = data_names.join(",");

        let data_prices = this.$route.params.p1_price;

        this.product_prices = data_prices.join(",");
        this.tot_price = this.$route.params.p1_total_price;
      }
      console.log();

      axios
        .post("/purchaseing", {
          name1: this.name1,
          phone1: this.phone1,
          address1: this.address1,
          product_names12: this.product_names,
          product_price12: this.product_prices,
          Total_price1: this.tot_price,
          User_id: user123,
          transaction_status: this.transaction_status,
          Delivery_status: this.Delivery_status,
          Delivey_Dates: this.Delivey_Dates,
          check_length1: this.check_length,
          my_sec_key: this.my_sec_key,
        })
        .then((res) => {
          if (res.data.status == 2) {
            this.$router.push("/Payment_page");
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

</style>
