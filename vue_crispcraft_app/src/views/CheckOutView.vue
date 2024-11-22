<script setup>
import HeaderText from "@/components/HeaderText.vue";
import MainContainer from "@/components/MainContainer.vue";
import MobileContainer from "@/components/MobileContainer.vue";
import Navbar from "@/components/Navbar.vue";
import AddressCard from "@/components/AddressCard.vue";
import CheckoutProductCard from "@/components/CheckoutProductCard.vue";
import { reactive, computed, onMounted, onUnmounted, ref, watch } from "vue";
import PaymongoIcon from "@/assets/images/icons/paymongo.svg";
import GcashIcon from "@/assets/images/icons/gcash_icon.svg";
import CODIcon from "@/assets/images/icons/cashondelivery_icon.svg";
import { useToast } from "primevue";
import Toast from "primevue/toast";
import { useCartStore } from "@/stores/cart";
import DesktopContainer from "@/components/DesktopContainer.vue";
import { useOrderItemStore } from "@/stores/orderItem";
import { useAuthStore } from "@/stores/auth";
import { useOrderStore } from "@/stores/order";
import { useDeliveryStore } from "@/stores/delivery";
const cartStore = useCartStore();
const orderItemStore = useOrderItemStore();
const authStore = useAuthStore();
const orderStore = useOrderStore();
const deliveryStore = useDeliveryStore();
const toast = useToast();
import axios from "axios";

const browserWindow = reactive({
  width: window.innerWidth,
  height: window.innerHeight,
});

const subtotal = ref(0);

const updateDimensions = () => {
  browserWindow.width = window.innerWidth;
  browserWindow.height = window.innerHeight;
};
const isWindowMobile = computed(() => {
  return browserWindow.width <= 320;
});
const showSuccessToast = () => {
  if (orderItemStore.paymentMethod === "paymongo") {
  }

  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Order Placed",
    life: 3000,
  });
};
const isPaymongoActive = ref(true);
watch(
  () => orderStore.paymentMethod,
  (newValue) => {
    console.log("NEW VALUE: ", newValue);
  }
);

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

onMounted(async () => {
  window.addEventListener("resize", updateDimensions);
  const getCustomerInfoResponse = await axios.get(
    `/customers/${authStore.user_id}`
  );

  const getCheckoutResponse = await axios.get(
    `/query/checkout/${authStore.user_id}`
  );

  subtotal.value = await orderItemStore.getSubTotal(authStore.user_id);

  console.log("SUBTOTALL: ", subtotal.value);

  const { customer } = getCustomerInfoResponse.data;

  deliveryStore.address = customer.address;
  deliveryStore.deliveryCharge = 60;

  orderStore.products = getCheckoutResponse.data;

  console.log("Order Store: ", orderStore.products);
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
              v-for="product in orderStore.products"
              :key="product.productID"
              :id="product.orderItemID"
              :deleteProduct="orderItemStore.deleteOrderItem"
              :image="baseUrl + '/' + product.image"
              :header="product.productName"
              :qty="product.quantity"
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

          <div class="px-5 py-5 bg-white rounded-lg flex gap-5 mt-3">
            <h2 class="text-[20px] italic font-bold self-center">Pay with:</h2>
            <div
              class="relative w-[66px] hover:bg-green-300 cursor-pointer"
              :class="[isPaymongoActive ? 'bg-green-400' : '']"
              @click="
                () => {
                  orderStore.paymentMethod = 'paymongo';
                  isPaymongoActive = true;
                }
              "
            >
              <img :src="PaymongoIcon" alt="Paymongo Icon" />
            </div>

            <div
              class="w-[66px] relative hover:bg-green-300 cursor-pointer flex items-center"
              :class="[!isPaymongoActive ? 'bg-green-400' : '']"
              @click="
                () => {
                  orderStore.paymentMethod = 'cash-on-delivery';
                  isPaymongoActive = false;
                }
              "
            >
              <img
                :src="CODIcon"
                alt="Cash On Delivery Icon"
                class="w-[66px]"
              />
            </div>
          </div>

          <div class="card flex justify-between items-center mt-16">
            <Toast v-if="!isWindowMobile" class="" position="top-right" />
            <button
              @click="showSuccessToast()"
              class="myTextShadow bg-blue-700 px-7 py-1 text-white z-10 rounded-lg text-[32px] font-bold myBoxShadow"
            >
              Order
            </button>
            <span class="font-bold text-[26px]"
              >Total Price: {{ subtotal }}
            </span>
          </div>
        </div>
      </section>
    </DesktopContainer>

    <!-- Mobilee -->
    <MobileContainer backgroundColor="bg-[#D6F3FF] relative">
      <div lass="card flex justify-center md:hidden">
        <Toast
          v-if="isWindowMobile"
          class="!right-[5px] !w-[200px]"
          position="top-right"
        />

        <div
          class="bg-white myContainer h-[50px] bg-opacity-95 absolute z-10 bottom-0"
        >
          <div class="relative h-full w-full">
            <button
              @click="showSuccessToast()"
              class="absolute myTextShadow left-[5%] top-[50%] translate-y-[-50%] bg-blue-700 px-7 py-1 text-white z-10 rounded-lg text-[15px] font-bold"
            >
              Order
            </button>
            <span
              class="absolute top-[50%] right-[15%] translate-y-[-50%] z-10 font-bold text-[14px]"
              >Total Price: {{ subtotal }}
            </span>
          </div>
        </div>
      </div>

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
