<template>
  <div class="app">
    <div id="nav">
      <ul>
        <li><router-link to="/User_home_page">Home</router-link></li>
        <li><router-link to="/User_about_page">About US</router-link></li>
        <li><router-link to="/User_contactus">Contact us</router-link></li>
        <li><router-link to="/Yourcart_page">CART</router-link></li>
        <li>
          <router-link to="/View_your_orders_page">View ORDERS</router-link>
        </li>
        <li><router-link to="/">Logout</router-link></li>
      </ul>
    </div>
    <router-view />
  </div>

  <div class="carousel-list">
    <Carousel_page
      :navigation="true"
      :pagination="true"
      :startAutoPlay="true"
      :timeout="2000"
      :items="3"
      :windowSize="3"
      class="Carouselstyle1"
      v-slot="{ currentSlide }"
    >
      <Slider_page v-for="(slide, index) in pro_images" :key="index">
        <div v-show="currentSlide === index + 1" class="slide-info1">
          <img class="img1" :src="require(`@/images/${slide}`)" alt="" />
        </div>
      </Slider_page>
    </Carousel_page>
    <div>
        <ul class="details-list">
            <li>{{ pro_name }}</li>
            <li>{{ pro_price }}</li>
        </ul>
    </div>
    <div>
        <ul class="details-list">
            <li>{{ pro_description }}</li>
        </ul>
    </div>
  </div>

  <div>
    <div class="button">
      <input type="submit" class="submit-button" @click="addtocart" value="ADD TO CART" />
      <input type="submit" class="submit-button" value="BUY" @click="product_buy" />
  </div>

  <div>
    {{ username }}
  </div>
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
      P_id: this.$route.params.user_selected_p_id,
      pro_name: "",
      pro_price: "",
      pro_description: "",
      pro_images: [],
      username: "",
      display_images: "",
      pro_quantity: 0,
    };
  },
  created() {
    this.product_details();
    axios.defaults.baseURL = "http://localhost:5000";
  },
  methods: {
    async product_buy() {
      let my_sec_key = 420;
      localStorage.setItem("my_sec_key", JSON.stringify(my_sec_key));
      localStorage.setItem("product_id", JSON.stringify(this.P_id));
      this.$router.push({
        name: "User_delivery_details",
        params: {
          p2_name: this.pro_name,
          p2_price: this.pro_price,
          p2_total_price: this.pro_price,
          my_key: 420,
        },
      });
    },

    async addtocart() {
      this.username = JSON.parse(localStorage.getItem("user1"));

      for (let j = 0; j < this.pro_images.length; j++) {
        let position = this.pro_images[j].search("main");

        if (position != -1) {
          this.display_images = this.pro_images[j];
          console.log(this.display_images);
          break;
        }
      }

      if (this.pro_quantity == 1) {
        alert("product OUT OF STOCK");
        this.$router.push({ name: "User_home_page" });
      } else {
        axios
          .post("/addtocart1", {
            product_id_choosen: this.P_id,
            product_price: this.pro_price,
            user_check: this.username,
            image_1: this.display_images,
            s_pro_name: this.pro_name,
          })
          .then((res) => {
            if (res.data.dat_status == 2) {
              this.$router.push("/Yourcart_page");
            } else {
              this.$router.push("/User_home_page");
            }
          });
      }
    },
    async product_details() {
      console.log("camed inside");
      axios
        .post("/fetch_product_details", {
          product_id: this.P_id,
        })
        .then((res) => {
          let status_check = res.data.status;
          if (status_check == 0) {
            this.$router.push({ name: "User_home_page" });
          } else {
            this.pro_name = res.data.p_data[0].p_name;
            this.pro_quantity = res.data.p_data[0].p_quantity;
            console.log(this.pro_name);
            this.pro_price = res.data.p_data[0].p_price;
            this.pro_description = res.data.p_data[0].p_description;
            this.pro_images = res.data.p_data[0].p_images.split(",");
          }
        });
    },
  },
};
</script>
<style lang="scss">
.Carouselstyle1 {
  position: relative;
  height: 500px;
  width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 24px 0 0 0;
}
.slide-info1 {
  position: absolute;
  top:0;
}
.details-list{
    list-style:none;
    display:flex;
        padding: 0 0 0 82px;
    li{
    padding: 6px 10px 10px 0;
    }
}
.img1 {
  min-width: 100%;
  height: 100%;
}
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
.button{
    margin:0 0px 0 78px;
    .submit-button{
        width: 130px;
            margin: 10px 14px 0 0px;
    }
}
.carousel-list{
   width: 100%;
}
.slider_page{
        display: flex;
    justify-content: center;
}
</style>
