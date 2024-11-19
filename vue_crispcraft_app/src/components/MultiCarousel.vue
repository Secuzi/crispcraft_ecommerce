<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useProductStore } from "@/stores/product";
import { useOrderItemStore } from "@/stores/orderItem";
import { ref, watch } from "vue";
const props = defineProps({
  items: ref([]),
  slidesPerView: {
    type: String,
    default: "1",
  },
  spaceBetween: {
    type: String,
    default: "20",
  },
  height: ref(""),
});

const orderItemStore = useOrderItemStore();
const productStore = useProductStore();
// const products = ref([...props.items]);

// watch(
//   () => props.items,
//   (newItems) => {
//     products.value = [...newItems];
//   }
// );
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const foundProductId = ref(orderItemStore.selectedProduct.id);

const selectedProduct = (id) => {
  productStore.selectedProduct = id;
};
</script>

<template>
  <div :class="['w-full', 'sm:h-[200px]', props.height]">
    <Swiper
      :slides-per-view="props.slidesPerView"
      :space-between="props.spaceBetween"
      dynamicBullets="true"
    >
      <SwiperSlide
        v-for="product in items"
        :key="product.productID"
        @click="selectedProduct(product.productID)"
        class="product-item cursor-pointer"
        :class="{ active: productStore.selectedProduct == product.productID }"
      >
        <img
          :src="baseUrl + '/' + product.image"
          :alt="product.name"
          class="z-10"
        />
      </SwiperSlide>
    </Swiper>
  </div>
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
