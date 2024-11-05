<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted } from "vue";
import { watch } from "vue";
import ProductSweetCheese from "@/assets/images/BAG of CHIPS/cheese.png";
import ProductCheesyHot from "@/assets/images/BAG of CHIPS/cheesyhot.png";
import ProductChiliHot from "@/assets/images/BAG of CHIPS/chilihot.png";
import ProductSaltedOnion from "@/assets/images/BAG of CHIPS/onion.png";

import { register } from "swiper/element/bundle";
import BestSellerLogo from "@/assets/images/BAG of CHIPS/bestseller.png";
import HeaderText from "@/components/HeaderText.vue";
import Carousel from "@/components/Carousel.vue";
import LeftArrow from "@/assets/images/icons/left_arrow.png";
import RightArrow from "@/assets/images/icons/right_arrow.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/vue";
const swiper = ref(null);
const currentTheme = ref("");
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
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

// const items = ref([
//   {
//     id: 1,
//     image: ProductCheesyHot,
//     colorTheme: "#EF9426",
//   },
//   {
//     id: 2,
//     image: ProductSaltedOnion,
//     colorTheme: "#AE76B8",
//   },
//   {
//     id: 3,
//     image: ProductChiliHot,
//     colorTheme: "#863E24",
//   },
//   {
//     id: 4,
//     image: ProductSweetCheese,
//     colorTheme: "#EBCB5F",
//   },
// ]);

// onMounted(() => {
//   if (props.items.length > 0) {
//     currentTheme.value = props.items[0].colorTheme;
//   }
// });
watch(
  () => props.items,
  (newItems) => {
    console.log("Received items:", newItems);
  }
);
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
