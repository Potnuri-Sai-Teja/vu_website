<template>
  <div class="app">
    <div id="nav">
      <ul>
        <li><router-link to="/User_home_page">Home</router-link></li>
        <li><router-link to="/User_about_page">About US</router-link></li>
        <li><router-link to="/User_contactus">Contact us</router-link></li>
        <li>
          <router-link to="/View_your_orders_page">View ORDERS</router-link>
        </li>
        <li><router-link to="/">Logout</router-link></li>
      </ul>
    </div>
    <router-view />
  </div>
  <div class="your-cart-page">
    <div class="your-cart-details">
      <div class="flex1">
        <ul class="cart-list">
          <li v-for="(item, index) in pro_name" :key="index" :item="item">
            <input type="submit" value="X" @click="delete_item(index)" />
            {{ item }}
          </li>
          <li class="total-bill">Total Bill</li>
        </ul>
      </div>
      <div class="flex1">
        <ul class="cart-list">
          <li v-for="(item, index) in pro_price" :key="index" :item="item">
            {{ item }}
          </li>
          <li class="total-bill">{{ total_price }}</li>
        </ul>
      </div>
    </div>
    <div class="register">
      <input type="submit" class="submit-button" value="Buy" @click="add_delivery" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      pro_name: [],
      pro_price: [],
      display_images: [],
      total_price: 0,
      cart_id: [],
    };
  },
  created() {
    this.fetchcart();
    axios.defaults.baseURL = "http://localhost:5000";
  },
  methods: {
    async delete_item(id) {
      axios
        .post("/delete_item_cart", {
          del_item_id: this.cart_id[id],
        })
        .then((res) => {
          if (res.data.del_status == 2) {
            alert("removed");
            this.$router.push("/User_home_page");
          }
        });
    },
    async add_delivery() {
      if (this.total_price != 0) {
        this.$router.push({
          name: "User_delivery_details",
          params: {
            p1_name: this.pro_name,
            p1_price: this.pro_price,
            p1_total_price: this.total_price,
          },
        });
      } else {
        alert("CART IS EMPTY");
        this.$router.push("/User_home_page");
      }
    },

    async fetchcart() {
      this.username = JSON.parse(localStorage.getItem("user1"));

      axios
        .post("/fetch_user_cart", {
          username1: this.username,
        })
        .then((res) => {
          let pro_count = res.data.cart_length1;
          console.log("check");
          if (pro_count == 0) {
            alert("CART IS EMPTY");
            this.$router.push("/User_home_page");
          }

          for (let i = 0; i < pro_count; i++) {
            this.pro_name[i] = res.data.cart_data1[i].c_p_name;
            this.pro_price[i] = res.data.cart_data1[i].c_p_price;
            this.display_images[i] = res.data.cart_data1[i].c_p_image;
            this.total_price += this.pro_price[i];
            this.cart_id[i] = res.data.cart_data1[i].c_id;
          }
        });
    },
  },
};
</script>
<style lang="scss">
.your-cart-page {
  background-color: #fff;
  width: 550px;
  margin: 0 auto;
  margin-top: 53px;
  padding: 13px 0 30px 28px;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
}
.your-cart-details {
  display: flex;
}
.flex1{
    width:50%;
}
.total-bill{
  border-top:1px solid #d2d2d2;
}
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.cart-list {
  list-style: none;
  li {
    padding: 4px 0 26px 0;
    input {
      width: 14px;
      height: 14px;
      font-size: 11px;
      margin: 0 6px 0 0;
    }
  }
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
