<script setup>
import HeaderText from "@/components/HeaderText.vue";
import MainContainer from "@/components/MainContainer.vue";
import MobileContainer from "@/components/MobileContainer.vue";
import Navbar from "@/components/Navbar.vue";
import AddressCard from "@/components/AddressCard.vue";
import CheckoutProductCard from "@/components/CheckoutProductCard.vue";
import { reactive, computed, onMounted, onUnmounted } from "vue";
import ProductSweetCheese from "@/assets/images/BAG of CHIPS/cheese.png";
import ProductCheesyHot from "@/assets/images/BAG of CHIPS/cheesyhot.png";
import GcashIcon from "@/assets/images/icons/gcash_icon.svg";
import CODIcon from "@/assets/images/icons/cashondelivery_icon.svg";
import { useToast } from "primevue";
import Toast from "primevue/toast";
import { useCartStore } from "@/stores/cart";
import DesktopContainer from "@/components/DesktopContainer.vue";

const cartStore = useCartStore();

const toast = useToast();

// const products = ref([
//   {
//     id: 1,
//     image: ProductCheesyHot,
//     header: "Malunggay Chips: Cheesy Hot",
//     qty: 2,
//     price: 2000,
//   },
//   {
//     id: 2,
//     image: ProductSweetCheese,
//     header: "Malunggay Chips: Sweet Cheese",
//     qty: 69,
//     price: 99,
//   },
// ]);

const browserWindow = reactive({
  width: window.innerWidth,
  height: window.innerHeight,
});

const updateDimensions = () => {
  browserWindow.width = window.innerWidth;
  browserWindow.height = window.innerHeight;
};

const isWindowMobile = computed(() => {
  return browserWindow.width <= 320;
});
const showSuccessToast = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Order Placed",
    life: 3000,
  });
};

onMounted(() => {
  window.addEventListener("resize", updateDimensions);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateDimensions);
});
</script>

<template>
  <MainContainer>
    <!-- Dekstop -->
    <Navbar />
    <DesktopContainer
      backgroundColor="bg-[#D6F3FF] overflow-hidden"
      alignItems="items-start"
    >
      <section class="flex-grow h-full">
        <div class="myContainer flex flex-col justify-between h-full">
          <HeaderText
            featuredText="CHECKOUT"
            productsText="PRODUCTS"
            textSize="55px"
            featuredTextColor="#004DFF"
          />

          <div
            class="bg-white px-4 py-2 pb-0 rounded-2xl rounded-b-none overflow-y-auto"
          >
            <CheckoutProductCard
              class="mt-3"
              v-for="product in cartStore.products"
              :key="product.id"
              :id="product.id"
              :image="product.image"
              :header="product.productName"
              :qty="product.qty"
              :price="product.price"
              fontSizeHeader="18px"
              fontSizeBody="16px"
            />
          </div>
        </div>
      </section>

      <section class="flex-grow self-center">
        <div class="myContainer">
          <div>
            <AddressCard
              addressTextSize="18px"
              deliveryChargeTextSize="22px"
              deliveryAddressTextSize="18px"
              imageSize="64px"
            />
          </div>

          <div
            class="px-5 py-5 bg-white rounded-lg flex items-center gap-5 mt-3"
          >
            <h2 class="text-[20px] italic font-bold">Pay with:</h2>
            <div class="relative w-[66px]">
              <img :src="GcashIcon" alt="Gcash Icon" class="rounded-lg" />
            </div>

            <div class="w-[66px] relative">
              <img :src="CODIcon" alt="Cash On Delivery Icon" />
            </div>
          </div>

          <div
            v-if="!isWindowMobile"
            class="card flex justify-between items-center mt-16"
          >
            <Toast class="" position="top-right" />
            <button
              @click="showSuccessToast()"
              class="myTextShadow bg-blue-700 px-7 py-1 text-white z-10 rounded-lg text-[32px] font-bold myBoxShadow"
            >
              Order
            </button>
            <span class="font-bold text-[26px]"
              >Total Price: {{ cartStore.subtotal }}
            </span>
          </div>
        </div>
      </section>
    </DesktopContainer>

    <!-- Mobilee -->
    <MobileContainer backgroundColor="bg-[#D6F3FF] relative">
      <div v-if="isWindowMobile" lass="card flex justify-center md:hidden">
        <Toast class="!right-[5px] !w-[200px]" position="top-right" />
        <button
          @click="showSuccessToast()"
          class="absolute bottom-[-39px] myTextShadow left-[10%] bg-blue-700 px-7 py-1 text-white z-10 rounded-lg text-[15px] font-bold"
        >
          Order
        </button>
      </div>

      <span class="absolute bottom-[-30px] right-[25%] font-bold text-[10px]"
        >Total Price: {{ cartStore.subtotal }}
      </span>

      <section class="myContainer">
        <HeaderText
          featuredText="CHECKOUT"
          productsText="PRODUCTS"
          textSize="32px"
        />
      </section>
      <section class="myContainer">
        <AddressCard />
      </section>

      <!-- Payment -->
      <section class="myContainer mt-3 mb-3">
        <div class="px-3 py-1 bg-white rounded-lg flex items-center gap-3">
          <h2 class="text-[12px] italic font-bold">Pay with:</h2>
          <div class="relative w-[28px]">
            <img :src="GcashIcon" alt="Gcash Icon" class="rounded-lg" />
          </div>

          <div class="w-[28px]">
            <img :src="CODIcon" alt="Cash On Delivery Icon" />
          </div>
        </div>
      </section>

      <section class="myContainer flex-grow">
        <div
          class="bg-white px-3 py-1 h-[530px] z-0 rounded-xl rounded-b-none overflow-y-auto"
        >
          <CheckoutProductCard
            class="mt-3"
            v-for="product in cartStore.products"
            :key="product.id"
            :id="product.id"
            :image="product.image"
            :header="product.productName"
            :qty="product.qty"
            :price="product.price"
          />
        </div>
      </section>
    </MobileContainer>
  </MainContainer>
</template>

<style scoped></style>
