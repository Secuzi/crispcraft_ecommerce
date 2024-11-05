<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";
import ProductSweetCheese from "@/assets/images/BAG of CHIPS/cheese.png";
import ProductCheesyHot from "@/assets/images/BAG of CHIPS/cheesyhot.png";
import ProductChiliHot from "@/assets/images/BAG of CHIPS/chilihot.png";
import ProductSaltedOnion from "@/assets/images/BAG of CHIPS/onion.png";

import { register } from "swiper/element/bundle";
import BestSellerLogo from "@/assets/images/BAG of CHIPS/bestseller.png";
import HeaderText from "@/components/HeaderText.vue";
import Carousel from "@/components/Carousel.vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
register();

// Featured products

const bestSeller = ref({
  id: 2,
  image: ProductSaltedOnion,
  colorTheme: "#AE76B8",
});

const items = ref([
  {
    id: 1,
    image: ProductCheesyHot,
    colorTheme: "#EF9426",
  },
  {
    id: 2,
    image: ProductSaltedOnion,
    colorTheme: "#AE76B8",
  },
  {
    id: 3,
    image: ProductChiliHot,
    colorTheme: "#863E24",
  },
  {
    id: 4,
    image: ProductSweetCheese,
    colorTheme: "#EBCB5F",
  },
]);

console.log(items.value);
</script>

<template>
  <div class="h-dvh flex flex-col md:flex-none">
    <Navbar />

    <!-- Desktop View -->
    <main
      class="md:flex md:justify-between hidden bg-mySecondaryColor flex-grow md:items-center"
    >
      <!-- Carousel -->
      <Carousel :items="items" />
      <!-- Featured Products -->
      <div class="w-[.8] h-full flex justify-center">
        <div class="flex flex-col justify-center">
          <HeaderText textSize="55px" />
          <div class="flex items-center h-fit">
            <div
              class="featured-products-wrapper flex justify-center mb-[-60px] self-end md:mb-0 w-full"
            >
              <div class="featured-products max-w-[600px] flex-shrink">
                <div
                  v-for="(item, index) in items"
                  :key="item.id"
                  class="product-image w-full"
                  :style="{ marginLeft: index === 0 ? '0' : '-80px' }"
                >
                  <img :src="item.image" alt="product name" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Best Seller -->
      <div class="h-full min-h-[300px] overflow-hidden relative">
        <img :src="BestSellerLogo" alt="Best seller logo" />
        <div
          class="flex flex-col items-center -rotate-12 right-0 bottom-[-20px] absolute"
        >
          <div
            class="transition hover:scale-125 ease-in-out z-10 cursor-pointer"
          >
            <HeaderText
              textSize="32px"
              featuredText="NEW"
              productsText="PRODUCT LAUNCH"
            />
            <img :src="bestSeller.image" alt="name" class="w-[229px]" />
          </div>
          <!-- Circle Section -->
          <div
            class="w-[283px] best-seller-bg absolute h-[232px] bottom-0"
            :style="{ backgroundColor: bestSeller.colorTheme }"
          ></div>
        </div>
      </div>
    </main>

    <!-- Mobile View -->
    <main class="bg-mySecondaryColor grow flex flex-col md:hidden">
      <!-- Some content -->
      <div
        class="flex-grow flex justify-evenly flex-col md:flex-row md:flex-grow-0"
      >
        <div class="flex justify-center pt-[100px] md:hidden">
          <button
            class="text-[15px] font-bold px-[29px] py-[9px] bg-white rounded-[20px] text-center myBoxShadow"
          >
            Order Now
          </button>
        </div>

        <div class="mt-auto md:mt-0">
          <div
            class="featured-products-wrapper flex justify-center mb-[-60px] self-end md:mb-0"
          >
            <div class="featured-products">
              <div
                v-for="(item, index) in items"
                :key="item.id"
                class="product-image"
                :style="{ marginLeft: index === 0 ? '0' : '-80px' }"
              >
                <img :src="item.image" alt="product name" />
              </div>
            </div>
          </div>

          <div
            class="h-[210px] bg-white text-center custom-radius flex justify-center items-center md:hidden"
          >
            <h1
              class="text-[40px] font-bebas text-black myTextShadow text-center"
            >
              <span class="text-[#FF0000]">FEATURED</span> <span>PRODUCTS</span>
            </h1>
          </div>
        </div>
      </div>
    </main>
    <div class="bg-myPrimaryColor h-[49px] w-full md:hidden"></div>
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

.best-seller-bg {
  border-top-left-radius: 200px;
}

.custom-radius {
  border-top-left-radius: 96px;
  border-top-right-radius: 96px;
}

.featured-products {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  /* width: 125px; */
  display: inline-block;
  margin-left: -80px; /* Adjust this value to control the overlap */
  border-radius: 8px; /* Optional */
  padding: 8px; /* Adjust for desired padding */
  z-index: 1;
}
</style>
