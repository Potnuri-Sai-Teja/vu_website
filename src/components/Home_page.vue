<template>
  <div class="app">
    <div id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/Registration_page">Register</router-link></li>
        <li><router-link to="/Login_page">Login</router-link></li>
        <li><router-link to="/About_page">About US</router-link></li>
        <li><router-link to="/Contactus_page">Contact us</router-link></li>
      </ul>
    </div>
    <router-view />
  </div>
  <div class="mycart-carousel">
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
          <img class="img" :src="require(`../images/${slide}.jpeg`)" alt="" />
        </div>
      </Slider_page>
    </Carousel_page>
  </div>
  <div class="mycart-text"><h1>Welcome To MyCart</h1></div>
</template>
<script>
import Carousel_page from "./Carousel/Carousel_page.vue";
import Slider_page from "./Carousel/Slider_page.vue";

export default {
  components: {
    Carousel_page,
    Slider_page,
  },
  setup() {
    const carouselSlides = ["cloths", "electronic_gadgets", "mobile_image"];
    return {
      carouselSlides,
    };
  },
};
</script>
<style lang="scss">
.mycart-carousel {
  position: relative;
}
.mycart-text {
  position: absolute;
  top: 30%;
  left: 13%;
  background-color: #b4b4b475;
  padding: 30px;
  border-radius: 5px;
}
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
  color: #fff;
}

#nav {
  padding: 0px;
  box-shadow: 0 2px 2px -2px rgb(0 0 0 / 20%);
  background-color: #fff;
  ul {
    list-style: none;
    display: flex;
    justify-content: end;
    li {
      padding: 0 10px;
      a {
        font-weight: bold;
        text-decoration: none;
        color: #787878;
        &.router-link-exact-active {
          color: #45acd6;
        }
      }
    }
  }
}
</style>
