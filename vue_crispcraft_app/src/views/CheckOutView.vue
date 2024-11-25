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
import { useCartStore } from "@/stores/cartItem";
import DesktopContainer from "@/components/DesktopContainer.vue";
import { useOrderItemStore } from "@/stores/orderItem";
import { useAuthStore } from "@/stores/auth";
import { useOrderStore } from "@/stores/order";
import { usePaymentStore } from "@/stores/payment";
import router from "@/router/route";
import { useDeliveryStore } from "@/stores/delivery";
const paymentStore = usePaymentStore();
const cartItemStore = useCartStore();
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
const showSuccessToast = async () => {
  let data = ref();

  // //To be added
  // if (orderStore.paymentMethod === "paymongo") {
  //   if (!subtotal.value) {
  //     return;
  //   }
  //   console.log("IN THISSS");
  //   const options = {
  //     method: "POST",
  //     url: "https://api.paymongo.com/v1/links",
  //     headers: {
  //       accept: "application/json",
  //       "content-type": "application/json",
  //       authorization: "Basic c2tfdGVzdF9vd0Y4SkZFblF1eUU3OWJQdjFQaUhCZG06",
  //     },
  //     data: {
  //       data: {
  //         attributes: {
  //           amount: (subtotal.value + deliveryStore.deliveryCharge) * 100,
  //           description: "Payment for item(s)",
  //         },
  //       },
  //     },
  //   };
  //   try {
  //     const url = await axios.request(options);
  //     console.log(url.data);
  //     data.value = url.data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   console.log("whaat");
  // }

  //Status immediately basta payment method is COD
  const orderObject = { status: "completed", customerID: authStore.user_id };
  const orderResponse = await axios.post("/order", orderObject);
  console.log("ORDER RESPONSE: ", orderResponse.data);
  const { orderID } = orderResponse.data;
  const customerID = authStore.user_id;

  console.log("CUSTOMEER ID:", customerID);
  for (const product of cartItemStore.products) {
    console.log("FOR PRODUCT: ", product);
    await axios.post(`/order-item`, { orderID, ...product, customerID });
    console.log("produuct: ", product);

    await axios.put(`/inventory/update-stock`, {
      productID: product.productID,
      quantity: product.quantity, // Subtract this quantity
    });
  }

  //Do payment process
  // 2 states: online transac and cod
  //Focus on cod because of time constraints

  console.log("PAYMENT METHOOD", paymentStore.paymentMethod);

  const paymentObject = {
    orderID,
    paymentMethod: paymentStore.paymentMethod,
  };
  const paymentResponse = await axios.post("/payment", paymentObject);

  console.log("PAYMENT RESPONSE: ", paymentResponse);
  const deliveryObject = {
    orderID,
    deliveryStatus: "pending",
    deliveryAddress: deliveryStore.deliveryAddress,
  };
  const deliveryResponse = await axios.post("/delivery", deliveryObject);

  console.log("delivery response: ", deliveryResponse.data);

  const { deliveryID } = deliveryResponse.data;
  //1. user orders, it creates orderID
  //2. update orderItemID in orderItemStore to newly created orderID

  // const response = await axios.put("/query/updateOrder", {
  //   orderID: orderResponse.data.orderID,
  //   customerID: authStore.user_id,
  // });

  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Order Placed",
    life: 3000,
  });

  setTimeout(() => {
    // Cases where other people can see other's track-order
    router.push(`/track-order/${deliveryID}`);
    // window.open(data.value.data.attributes.checkout_url, "_blank");
  }, 1500);
};
const isPaymongoActive = ref(false);

watch(
  () => cartItemStore.products,
  async () => {
    if (cartItemStore.products.length === 0) {
      router.push("/order");
    }

    subtotal.value = await cartItemStore.getSubTotal(authStore.user_id);
  }
);

watch(
  () => paymentStore.paymentMethod,
  (newValue) => {
    paymentStore.paymentMethod = newValue;
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
  subtotal.value = await cartItemStore.getSubTotal(authStore.user_id);

  const { customer } = getCustomerInfoResponse.data;

  deliveryStore.deliveryAddress = customer.address;
  deliveryStore.deliveryCharge = 60;
  paymentStore.paymentMethod = "cash-on-delivery";

  cartItemStore.products = getCheckoutResponse.data;
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
              v-for="product in cartItemStore.products"
              :key="product.productID"
              :id="product.cartItemID"
              :deleteProduct="cartItemStore.deleteCartItem"
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
              class="w-[66px] relative hover:bg-green-300 cursor-pointer flex items-center"
              :class="[!isPaymongoActive ? 'bg-green-400' : '']"
              @click="
                () => {
                  paymentStore.paymentMethod = 'cash-on-delivery';
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
            <!-- <div
              class="relative w-[66px] hover:bg-green-300 cursor-pointer"
              :class="[isPaymongoActive ? 'bg-green-400' : '']"
              @click="
                () => {
                  paymentStore.paymentMethod = 'paymongo';
                  isPaymongoActive = true;
                }
              "
            >
              <img :src="PaymongoIcon" alt="Paymongo Icon" />
            </div> -->
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
              >Total Price: &#8369;{{ subtotal + deliveryStore.deliveryCharge }}
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
            v-for="product in cartItemStore.products"
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
