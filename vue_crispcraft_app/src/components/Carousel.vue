<script setup>
import { ref } from "vue";

import LeftArrow from "@/assets/images/icons/left_arrow.png";
import RightArrow from "@/assets/images/icons/right_arrow.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/vue";
const swiper = ref(null);
const currentTheme = ref("");
const props = defineProps({
  items: ref({}),
});

const onNextChange = () => {
  if (swiper.value) {
    swiper.value.slideNext();
  }
};

const onPrevChange = () => {
  if (swiper.value) {
    swiper.value.slidePrev();
  }
};

const onSwiper = (instance) => {
  swiper.value = instance;
};

const onSlideChange = (event) => {
  const currentIndex = event.realIndex;
  const currentItem = props.items[currentIndex];

  console.log("Current Slide Index:", currentIndex);
  console.log("Current Item:", currentItem);
  currentTheme.value = currentItem.colorTheme;
};
</script>

<template>
  <div
    :style="{ backgroundColor: currentTheme }"
    class="h-full flex items-center px-[24px] py-[41px] transition ease-in-out duration-500 flex-shrink"
  >
    <Swiper
      v-if="props.items"
      :slides-per-view="1"
      :loop="true"
      :space-between="150"
      class="product-container"
      :pagination="true"
      @swiper="onSwiper"
      :grabCursor="false"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(item, index) in props.items" :key="item.id">
        <RouterLink to="/">
          <img :src="item.image" alt="" />
        </RouterLink>
      </SwiperSlide>
      <button class="swiper-button-prev" @click="onPrevChange">
        <img :src="LeftArrow" class="max-w-[41px]" />
      </button>
      <button class="swiper-button-next" @click="onNextChange">
        <img :src="RightArrow" class="max-w-[41px]" />
      </button>
    </Swiper>
  </div>
</template>

<style scoped>
.swiper-button-next,
.swiper-button-prev {
  color: green;
  top: auto;
  bottom: 0;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  content: "";
}

.product-container {
  max-width: 400px;
}
</style>
