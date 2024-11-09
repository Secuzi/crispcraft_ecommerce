<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ref, watch } from "vue";
const props = defineProps({
  items: ref({}),
  slidesPerView: {
    type: String,
    default: "1",
  },
});

const swiper = ref(null);

const products = ref([...props.items]);

watch(
  () => props.items,
  (newItems) => {
    products.value = [...newItems];
  }
);

const foundProductId = ref(0);

const selectedProduct = (product) => {
  console.log(typeof product.id);
  foundProductId.value = product.id;
};
</script>

<template>
  <div class="w-full h-[100px]">
    <Swiper :slides-per-view="props.slidesPerView" :space-between="20">
      <SwiperSlide
        v-for="product in products"
        :key="product.id"
        @click="selectedProduct(product)"
        class="product-item"
        :class="{ active: foundProductId === product.id }"
      >
        <img :src="product.image" :alt="product.name" class="z-10" />
      </SwiperSlide>
    </Swiper>
  </div>

  <!-- <div class="product-list">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      class="product-item"
      :class="{ active: foundProductId === product.id }"
      @click="selectedProduct(product)"
    >
      <img :src="product.image" :alt="product.name" />
    </div>
  </div> -->
</template>

<style scoped>
.product-container {
  max-width: 100%;
}

.product-item {
  width: 100px;
  transition: transform 0.3s ease;
}

/* .swiper {
  overflow: hidden;
}

.swiper .swiper-slide {
  width: 100%;
}

.swiper {
  width: 100%;
  height: 120px;
  background: yellow;
  border: 1px solid cyan;
} */

.product-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  transition: all 0.3s ease;
}
.product-item {
  width: 100px;
  transition: transform 0.3s ease, order 0.3s ease; /* Transition for smooth reordering */
}

.product-item.active {
  transform: scale(1.2);
  z-index: 1;
}
.swiper {
  height: 100%;
}

.swiper img {
  width: 86%;
}

.swiper-container {
  overflow: visible; /* Allow images to overflow the Swiper container */
}
.swiper-slide {
  overflow: visible; /* Allow images to overflow each slide */
}

.product-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
