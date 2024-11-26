<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterLink } from "vue-router";
import { register } from "swiper/element/bundle";
import BestSellerLogo from "@/assets/images/BAG of CHIPS/bestseller.png";
import HeaderText from "@/components/HeaderText.vue";
import Carousel from "@/components/Carousel.vue";
import ProductSweetCheese from "@/assets/images/BAG of CHIPS/cheese.png";
import ProductCheesyHot from "@/assets/images/BAG of CHIPS/cheesyhot.png";
import ProductChiliHot from "@/assets/images/BAG of CHIPS/chilihot.png";
import ProductSaltedOnion from "@/assets/images/BAG of CHIPS/onion.png";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import MainContainer from "@/components/MainContainer.vue";
import { onMounted, ref } from "vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import router from "@/router/route";
import MobileContainer from "@/components/MobileContainer.vue";
import DesktopContainer from "@/components/DesktopContainer.vue";
import axios from "axios";
register();

// Featured products

const bestSeller = ref({
  id: 2,
  image: ProductSaltedOnion,
  colorTheme: "#AE76B8",
});

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const featuredProducts = ref([]);
function getRandomFeaturedProducts(products, count = 3) {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("Products must be a non-empty array");
  }

  const shuffled = [...products].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
}
const isLoading = ref(true);
const products = ref([]);
onMounted(async () => {
  console.log("initial loading: ", isLoading.value);
  // setTimeout(async () => {

  // }, 5000);
  const productsResponse = await axios.get("/products");
  products.value = productsResponse.data.products.filter((x) => x.active == 1);
  console.log("products value!!", products.value);
  if (products.value.length <= 0) {
    isLoading.value = false;

    return;
  }

  featuredProducts.value = getRandomFeaturedProducts(products.value);
  isLoading.value = false;
  console.log("initial loading: ", isLoading.value);
});
</script>

<template>
  <MainContainer>
    <div
      v-if="isLoading"
      class="text-center text-gray-500 py-6 flex-grow flex justify-center items-center bg-white"
    >
      <PulseLoader />
    </div>
    <div v-else class="h-full flex-grow flex flex-col">
      <Navbar />
      <DesktopContainer>
        <!-- Desktop View -->
        <main
          class="md:flex md:justify-between hidden bg-mySecondaryColor flex-grow md:items-center h-full"
        >
          <!-- Carousel -->
          <div v-if="products.length <= 0" class="bg-black w-full text-center">
            <HeaderText
              featuredText="Website Maintenance!"
              productsText=""
              textSize="55px"
            />
          </div>
          <Carousel v-if="products.length > 0" :items="products" />
          <!-- Featured Products -->
          <div
            v-if="products.length > 0"
            ass="w-[.8] h-full flex justify-center"
          >
            <div class="flex flex-col justify-center">
              <HeaderText textSize="55px" />
              <div class="flex items-center h-fit">
                <div
                  class="featured-products-wrapper flex justify-center mb-[-60px] self-end md:mb-0 w-full"
                >
                  <div class="featured-products max-w-[600px] flex-shrink">
                    <div
                      v-for="(item, index) in featuredProducts"
                      :key="item.productID"
                      class="product-image w-full"
                      :style="{ marginLeft: index === 0 ? '0' : '-80px' }"
                    >
                      <img
                        :src="baseUrl + '/' + item.image"
                        :alt="item.productName"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Best Seller -->
          <div
            v-if="products.length > 0"
            class="h-full min-h-[300px] overflow-hidden relative"
          >
            <img :src="BestSellerLogo" alt="Best seller logo" />
            <div
              class="flex flex-col items-center -rotate-12 right-0 bottom-[-20px] absolute"
            >
              <div
                class="transition hover:scale-125 ease-in-out z-10 cursor-pointer"
                @click="router.push('/order')"
              >
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
      </DesktopContainer>
    </div>

    <!-- <MobileContainer>
      <div
        class="flex-grow flex justify-evenly flex-col md:flex-row md:flex-grow-0"
      >
        <div class="flex justify-center pt-[100px] md:hidden">
          <RouterLink
            to="/order"
            class="text-[15px] font-bold px-[29px] py-[9px] bg-white rounded-[20px] text-center myBoxShadow"
          >
            Order Now
          </RouterLink>
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
    </MobileContainer> -->
  </MainContainer>
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
