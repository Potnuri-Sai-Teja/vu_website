<template>
  <div class="carousel_page">
    <slot :currentSlide="currentSlide" />

    <!-- NAVIGATION-->
    <div v-if="navEnabled" class="navigation">
      <div class="toggle-page left">
        <i @click="prevSlide" class="fas fa-chevron-left"></i>
      </div>
      <div class="toggle-page right">
        <i @click="nextSlide" class="fas fa-chevron-right"></i>
      </div>
    </div>

    <!-- PAGINATION-->

    <div v-if="paginationEnabled" class="pagination">
      <span
        @click="gotoSlide(index)"
        class="span"
        v-for="(slide, index) in getSlideCount"
        :key="index"
        :class="{ active: index + 1 === currentSlide }"
      >
      </span>
    </div>
  </div>
</template>
>
<script>
import { ref, onMounted } from "vue";
export default {
  props: ["startAutoPlay", "timeout", "navigation", "pagination"],
  setup(props) {
    const currentSlide = ref(1);
    const getSlideCount = ref(null);
    const autoPlayenabled = ref(
      props.startAutoPlay === undefined ? 3000 : props.startAutoPlay
    );
    const timeDuration = ref(3000);
    const paginationEnabled = ref(
      props.pagination === undefined ? true : props.pagination
    );
    const navEnabled = ref(
      props.navigation === undefined ? true : props.navigation
    );

    //autoplay

    const autoplay = () => {
      setInterval(() => {
        nextSlide();
      }, timeDuration.value);
    };
    if (autoPlayenabled.value) {
      autoplay();
    }

    //next slide
    const nextSlide = () => {
      if (currentSlide.value === getSlideCount.value) {
        currentSlide.value = 1;
        return;
      }
      currentSlide.value += 1;
    };
    //prev slide
    const prevSlide = () => {
      if (currentSlide.value === 1) {
        currentSlide.value = 1;
        return;
      }
      currentSlide.value -= 1;
    };

    const gotoSlide = (index) => {
      currentSlide.value = index + 1;
    };

    onMounted(() => {
      getSlideCount.value = document.querySelectorAll(".slider_page").length;
    });
    return {
      currentSlide,
      nextSlide,
      prevSlide,
      gotoSlide,
      paginationEnabled,
      navEnabled,
      getSlideCount,
    };
  },
};
</script>
<style lang="scss">
.navigation {
  padding: 0 16px;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  .toggle-page {
    display: flex;
    flex: 1;
  }
  .right {
    justify-content: flex-end;
  }
  i {
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: #787878;
    color: #45acd6;
    box-shadow: 0 2px 2px -2px rgb(0 0 0 / 20%);
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
  }
}

.pagination {
  position: absolute;
  bottom: 24px;
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;

  .span {
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 60%;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.6);
  }
  .active {
    background-color: #6347c7;
  }
}
</style>
