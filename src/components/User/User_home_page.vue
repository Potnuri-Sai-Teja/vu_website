<template>
  <div class="app">
    <div id="nav">
      <ul>
        <li><router-link to="/User_home_page">Home</router-link></li>
        <li><router-link to="/User_about_page">About US</router-link></li>
        <li><router-link to="/User_contactus">Contact us</router-link></li>
        <li><router-link to="/" @click="logout_api">Logout</router-link></li>
        <li>
          <router-link to="/View_your_orders_page">View ORDERS</router-link>
        </li>
        <li><router-link to="/Yourcart_page">CART</router-link></li>
        <li>
          <select v-model="selected_item" @click="my_categories_api()" class="catory-dropdown">
            <option value="" readonly>Select Category</option>
            <option
              v-for="(item, index) in Categories1"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </li>
        <li>
          <select v-model="selected_brand" @click="my_categories_api()" class="catory-dropdown">
            <option value="">Select Brand</option>
            <option v-for="(item, index) in Brands" :key="index" :value="item">
              {{ item }}
            </option>
          </select>
        </li>
      </ul>
    </div>
    <router-view />
  </div>

  <div>
    <Carousel_page
      :navigation="true"
      :pagination="true"
      :startAutoPlay="true"
      :timeout="2000"
      class="Carouselstyle"
      v-slot="{ currentSlide }"
    >
      <Slider_page v-for="(slide, index) in carouselSlides" :key="index">
        <div v-show="currentSlide === index + 1" class="slide-info">
          <img class="img" :src="require(`@/images/${slide}.jpeg`)" alt="" />
        </div>
      </Slider_page>
    </Carousel_page>
  </div>
</template>
<script>
import Carousel_page from "../Carousel/Carousel_page.vue";
import Slider_page from "../Carousel/Slider_page.vue";
import axios from "axios";

export default {
  components: {
    Carousel_page,
    Slider_page,
  },
  data() {
    return {
      Categories1: [],
      Brands: [],
      brands_check: [],
      records: 0,
      brand_count_check: 0,
      selected_item: "",
      selected_brand: "",
      check_status: 0,
      brand_list_count: 0,
      status: 222,
    };
  },
  setup() {
    const carouselSlides = ["cloths", "electronic_gadgets", "mobile_image"];

    return {
      carouselSlides,
    };
  },
  create() {
    axios.defaults.baseURL = "http://localhost:5000";
    this.check_login();
  },
  methods: {
    async check_login() {
      let logout_status = JSON.parse(localStorage.getItem("user1"));

      if (logout_status == "logout") {
        this.$router.push({ name: "Home_page" });
      }
    },

    async logout_api() {
      let login_status = "logout";
      localStorage.setItem("user1", JSON.stringify(login_status));
    },
    async my_categories_api() {
      axios
        .post("/my_data1", {
          selected_item: this.selected_item,
          check_status: this.check_status,
        })
        .then((res) => {
          this.records = res.data.count;
          this.brand_count_check = res.data.brand_count;
          this.check_status = res.data.status;
          this.brands_check = res.data.mobile_brands_list;
          this.brand_list_count = res.data.brands_remove_count;

          var i = 0;
          var j = 0;
          var k = 0;
          var l = 0;
          console.log(this.brand_list_count + "check count");

          for (l = 0; l < this.brand_list_count; l++) {
            if (this.brand_list_count != 1) {
              this.brands_check[l] = res.data.mobile_brands_list[l].b_name;
              console.log(this.brands_check[l]);
            }
          }

          for (i = 0; i < this.records; i++) {
            this.Categories1[i] = res.data.my_list[i].cat_name;
            this.status = 222;
          }

          for (j = 0; j < this.brand_count_check; j++) {
            this.Brands[j] = res.data.brands1[j].b_name;
            this.status = 222;
          }
          let check_brand_length = this.Brands.length;
          if (check_brand_length !== this.brand_count_check) {
            for (k = this.brand_count_check; k < check_brand_length; k++) {
              this.Brands.splice(k);
            }
            this.status = 222;
          }

          let m = 0;
          for (m = 0; m < this.brand_list_count; m++) {
            if (this.selected_brand == this.brands_check[m]) {
              console.log("Successs we got result");
              this.status = 2;
              let user_brand = this.selected_brand;
              this.$router.push({
                name: "User_brands_page",
                params: { user_selected_item: user_brand },
              });

              break;
            } else {
              this.status = 1;
            }
          }
          if (this.selected_brand == "brand" || this.selected_brand == "") {
            this.status = 100;
          }

          console.log();
          if (this.status == 1) {
            // this.selected_item= "";
            this.selected_brand = "";
            this.Brands = [];
            this.status = 0;
            alert(
              "The page is Under Construction Kindly go with MOBILES .Thank you"
            );
          }
        });
    },
  },
};
</script>
<style lang="scss">
.Carouselstyle {
  position: relative;
  max-height: 400px;
  height: 400px;
}
.slide-info {
  position: absolute;
  top: 0;
  width: 100%;
  max-height: 100%;
  height: 100%;
}
.img {
  min-width: 100%;
  height: 100%;
  object-fit: cover;
}
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  box-shadow: 0 2px 2px -2px rgb(0 0 0 / 20%);
    background-color:#e9e9e9;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.catory-dropdown{
    background: #45acd6;
    color: #fff;
    border: none;
    padding: 3px 0;
    border-radius: 5px;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
}
body{
      background-color: #e1e1e1;
}
</style>
