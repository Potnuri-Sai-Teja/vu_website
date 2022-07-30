<template>
  <div class="app">
    <div id="nav">
      <ul>
        <li>
          <router-link to="/User_home_page">Home</router-link>
        </li>
        <li>
          <router-link to="/User_about_page">ABOUT us</router-link>
        </li>
        <li>
          <router-link to="/">Logout</router-link>
        </li>
      </ul>
    </div>

    <div class="register-form">
      <h4>MY ORDERS</h4>


      <ul v-for="(item, index) in pro_list" :key="index" :item="item" class="order-list">
      
        <li>Transaction id: {{ item?.transaction_id }}</li>
        <li>PRODUCT LIST: {{ item?.product_list }}</li>
        <li>PRODUCT PRICE: {{ item?.product_prices }}</li>
        <li>ORDER TOTAL PRICE: {{ item?.total_cost }}</li>
        <li>DELIVERY DATE : {{ item?.delivery_date }}</li>
        <input type="submit" class="submit-button" value="CANCEL ORDER" @click="cancel_order(item?.transaction_id)" />
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userid: "",
      product_names: [],
      product_prices: [],
      total_prices: [],
      transaction_ids: [],
      tr_cancel_id: 0,
      Del_date: [],
      can_product_length: [],
      pro_list: []
    };
  },
  created() {
    axios.defaults.baseURL = "http://localhost:5000";
    this.fetchorders();
  },
  methods: {
    async cancel_order(tr_id) {

      let transaction_value = tr_id;

      this.can_product_length = this.product_names.length;

      axios
        .post("/cancel_order", {
          tr_cancel_id: transaction_value,
          product_names: this.product_names,
          can_product_length: this.can_product_length,
        })
        .then((res) => {
          if (res.data.can_status == 2) {
            alert("SELECTED ORDER CANCELLED");
            this.$router.push("/User_home_page");
          }
        });
    },
    async fetchorders() {
      this.userid = JSON.parse(localStorage.getItem("user1"));
      axios
        .post("/fetchorders", {
          userid: this.userid,
        })
        .then((res) => {
          if (res.data.status == 0) {
            alert("YOUR ORDERS ARE EMPTY");
            this.$router.push("/User_home_page");
          } else if (res.data.status == 2) {
            this.pro_list = res.data.my_orders;
            console.log(this.pro_list);
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

.register-form {
  padding: 20px 0 20px 20px;

  h4 {
    text-align: center;
  }
}

.order-list {
  list-style: none;
  border-bottom: 1px solid #d2d2d2;
  padding: 21px 0 20px 0;

  li {
    padding: 10px 0 10px 0;
  }
}

.cancel-button {
  padding: 20px 0 10px 0;
}
</style>
