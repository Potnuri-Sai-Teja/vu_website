<template>
  <div class="app">
    <div id="nav">
      <ul>
        <li><router-link to="/User_home_page">Home</router-link></li>
        <li><router-link to="/User_contactus">Contact us</router-link></li>
        <li><router-link to="/Yourcart_page">CART</router-link></li>
        <li>
          <router-link to="/View_your_orders_page">View ORDERS</router-link>
        </li>
        <li><router-link to="/" @click="logout_api">Logout</router-link></li>
      </ul>
    </div>
  </div>

  <h1>THIS ABOUT PAGE</h1>
</template>
<script>
import axios from "axios";

export default {
  create() {
    axios.defaults.baseURL = "http://localhost:5000";
  },
  methods: {
    async logout_api() {
      axios.post("/logout").then((res) => {
        console.log(res.data.code);
      });
    },
  },
};
</script>
