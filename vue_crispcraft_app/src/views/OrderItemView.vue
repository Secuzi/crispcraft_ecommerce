<script setup>
import Navbar from "@/components/Navbar.vue";
import HeaderText from "@/components/HeaderText.vue";
import InputNumber from "primevue/inputnumber";
import Subtotal from "@/components/Subtotal.vue";
import { ref } from "vue";
import MainContainer from "@/components/MainContainer.vue";
import MobileContainer from "@/components/MobileContainer.vue";
import MultiCarousel from "@/components/MultiCarousel.vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import { onUnmounted, watch, onMounted } from "vue";
import Button from "@/components/Button.vue";
import DesktopContainer from "@/components/DesktopContainer.vue";
import { useProductStore } from "@/stores/product";
import { useOrderItemStore } from "@/stores/orderItem";
import { useAuthStore } from "@/stores/auth";
const formQuantity = ref(0);
const authStore = useAuthStore();
const productStore = useProductStore();
const orderitemStore = useOrderItemStore();
const product = ref({});
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

watch(
  () => formQuantity.value,
  async (newQuantity) => {
    const cartProduct = orderitemStore.products.find(
      (p) => p.productID == productStore.selectedProduct
    );

    console.log(`Created CART: `, cartProduct);
    if (typeof newQuantity === "undefined" || newQuantity === null) {
      return;
    }

    if (newQuantity === 0) {
      await axios.delete(`/order-item/${cartProduct.orderItemID}`);
      orderitemStore.products = orderitemStore.products.filter(
        (p) => p.orderItemID != cartProduct.orderItemID
      );
      return;
    }

    if (!cartProduct) {
      //If 0 wala na siya sa cart product
      product.value.quantity = newQuantity;

      console.log("CREATED PRODUUCT: ", product.value);
      const orderItemResponse = await axios.post("/order-item", {
        ...product.value,
        customerID: authStore.user_id,
      });
      const { orderItemID } = orderItemResponse.data;
      console.log("ORDER ITEM ID: ", orderItemID);
      orderitemStore.products.push({
        ...product.value,
        orderItemID,
        customerID: authStore.user_id,
      });
      console.log("PRODUCTS: ", orderitemStore.products);
      return;
    }

    cartProduct.quantity = newQuantity;
    console.log(`Updated PRODUCT`, cartProduct);
    await axios.put(`/order-item/${cartProduct.orderItemID}`, cartProduct);
  }
);

watch(
  () => productStore.selectedProduct, // Getter function for the reactive property
  (newID) => {
    if (newID) {
      try {
        // product.value = await productStore.fetchProductDetails(newID);
        product.value = productStore.products.find((x) => x.productID == newID);
        formQuantity.value = null;
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
  }
);

const isLoading = ref(true);
onMounted(async () => {
  const response = await axios.get("/query/stock");
  productStore.products = response.data.filter((p) => p.stockQty > 0);

  const orderItemResponse = await axios.get("/order-item", {
    params: {
      id: authStore.user_id,
    },
  });

  orderitemStore.products = orderItemResponse.data;

  if (productStore.products.length > 0) {
    productStore.selectedProduct = productStore.products[0].productID;
  }

  isLoading.value = false;
});

onUnmounted(() => {
  productStore.selectedProduct = {};
});
</script>

<template>
  <MainContainer>
    <Navbar />

    <DesktopContainer alignItems="md:start" background-color="!bg-[#D6F3FF]">
      <section v-if="product" class="basis-[415px] self-center">
        <!-- Selected Product -->
        <div class="flex justify-center">
          <Transition name="slide-fade">
            <img
              v-show="product"
              :key="product.productID"
              :src="baseUrl + '/' + product.image"
              :alt="product.flavorName"
              class="w-[70%]"
            />
          </Transition>
        </div>
      </section>

      <section v-if="product" class="basis-[630px]">
        <h1>
          <HeaderText
            featured-text="ORDER"
            products-text="ITEM"
            textSize="55px"
          />
        </h1>
        <h2
          :class="[
            'text-[30px]',
            'text-stroke',
            'text-white',
            'font-bebas',
            'myTextShadow mt-2',
          ]"
        >
          {{ product.productName }}
          <span
            class="font-rubik tracking-tighter font-bold text-[#EBCB5F] block mt-[-11px] mb-2"
            style="-webkit-text-stroke: 2px; -webkit-text-stroke-color: black"
            >{{ product.flavorName }}</span
          >
        </h2>

        <div class="h-[84px] overflow-y-auto">
          <p :class="['italic', 'max-w-[360px]', 'text-[14px]', 'mb-[10px]']">
            <span class="font-bold">Description:</span>
            {{ product.description }}
          </p>
        </div>

        <div class="flex gap-3 items-center">
          <!-- Quantity container -->
          <div class="flex flex-col basis-[100px]">
            <span class="font-bold italic text-[20px] text-opacity-50"
              >Quantity:</span
            >

            <InputNumber
              v-model="formQuantity"
              inputId="minmax"
              class="h-[24px]"
              defaultValue="0"
              :min="0"
              :max="product.stockQty"
              :pt="{
                inputtext: {
                  root: '!rounded-[5px]',
                },
              }"
              style="width: 212px; height: 48px"
            />
            <!-- Button Container -->
            <div class="mt-3">
              <Button
                text="-"
                padding_x="1.5rem"
                padding_y="0px"
                @click="formQuantity > 0 ? (formQuantity -= 1) : formQuantity"
              />
              <Button
                @click="
                  formQuantity < product.stockQty
                    ? (formQuantity += 1)
                    : formQuantity
                "
                text="+"
                padding_x="1.5rem"
                padding_y="0px"
                class="ml-3"
              />
            </div>
          </div>

          <!-- Product info -->
          <div class="grow fluid">
            <h3 class="font-extrabold text-opacity-50 text-[16px]">
              Available Stock: {{ product.stockQty }}
            </h3>
            <h3 class="font-extrabold text-[18px]">
              Price: {{ product.price }}
            </h3>
          </div>
        </div>

        <h3 class="font-medium mt-3">Choose Other Flavors:</h3>

        <div class="flex justify-around mt-[22px]">
          <MultiCarousel
            :style="'width: 400px'"
            :items="productStore.products"
            slidesPerView="3"
            spaceBetween="20"
          />
        </div>
      </section>

      <section class="self-center p-4">
        <div>
          <Subtotal
            :products="orderitemStore.products"
            tableHeaderTextSize="12px"
            subTotalTextSize="14px"
            dataTextSize="14px"
            sumNumberTextSize="14px"
            class="mt-[15px]"
            height="100%"
          />
          <div class="flex justify-end">
            <RouterLink to="/checkout">
              <button
                class="bg-mySecondaryColor myTextShadow mt-3 myBoxShadow text-white font-bold text-[24px] px-5 py-2 rounded-[25px] text-center"
              >
                Checkout
              </button>
            </RouterLink>
          </div>
        </div>
      </section>
    </DesktopContainer>

    <!-- MOBILEEE
    <MobileContainer>
      <section class="myContainer">
        <HeaderText
          textsize="55px"
          class="text-left"
          products-text="ITEM"
          featured-text="ORDER"
        />
        <p class="italic font-medium text-[14px]">Choose other flavors:</p>
      </section>

      <section class="relative">
        <div class="myContainer mt-3">
          <MultiCarousel
            :items="products"
            slidesPerView="4"
            class="relative z-10"
            height="h-[100px]"
          />
          <div
            class="bg-red h-[80px] absolute z-0 bottom-0 left-0 right-0"
          ></div>
        </div>
      </section>

      <section v-if="productStore.selectedProduct" class="myContainer">
        <h2
          :class="[
            'text-[32px]',
            'text-stroke',
            'text-white',
            'font-bebas',
            'myTextShadow mt-2',
          ]"
        >
          MALUNGGAY CHIPS:
          <span
            class="font-rubik tracking-tighter font-bold text-[#EBCB5F] block mt-[-11px] mb-2"
            style="-webkit-text-stroke: 2px; -webkit-text-stroke-color: black"
            >{{ orderItemStore.selectedProduct.flavor }}</span
          >
        </h2>
        <div class="h-[84px] overflow-y-auto">
          <p :class="['italic', 'text-[14px]', 'mb-[10px]']">
            <span class="font-bold">Description:</span>
            {{ orderItemStore.selectedProduct.description }}
          </p>
        </div>

        <div
          :class="[
            'flex',
            'items-center',
            'gap-2',
            orderItemStore.selectedProduct.isFontBlack
              ? 'text-black'
              : 'text-white',
          ]"
        >
          <div class="flex justify-between items-end flex-shrink">
            <div class="flex flex-col basis-[100px]">
              <span class="font-bold italic text-[14px] text-opacity-50"
                >Quantity:</span
              >

              <InputNumber
                v-model="formQuantity"
                inputId="minmax"
                min="0"
                max="99"
                class="h-[24px]"
                :pt="{
                  inputtext: {
                    root: '!rounded-[5px]',
                  },
                }"
                style="width: 150px"
              />
              <div class="flex gap-3 mt-2 text-black">
                <Button text="-" padding_x="0.5rem" padding_y="0px" />
                <Button text="+" padding_x="0.5rem" padding_y="0px" />
              </div>
            </div>
          </div>
          <div class="grow fluid">
            <h3 class="font-extrabold text-opacity-50 text-[14px]">
              Available Stock: {{ orderItemStore.selectedProduct.stock }}
            </h3>
            <h3 class="font-extrabold text-[14px]">
              Price: {{ orderItemStore.selectedProduct.price }}
            </h3>
          </div>
        </div>

        <Subtotal
          :products="products"
          tableHeaderTextSize="12px"
          subTotalTextSize="14px"
          dataTextSize="14px"
          sumNumberTextSize="14px"
          class="mt-[15px]"
          height="h-[100px]"
        />
      </section>
      <section class="myContainer flex justify-center">
        <RouterLink to="/checkout">
          <button
            class="bg-myPrimaryColor myTextShadow mt-1 myBoxShadow text-white font-bold text-[13px] px-5 py-2 rounded-[25px] text-center"
          >
            Checkout
          </button>
        </RouterLink>
      </section>
    </MobileContainer> -->
  </MainContainer>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.6s ease-out;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: scale(0);
  opacity: 0;
}

.text-stroke {
  -webkit-text-stroke: 2px #2cb100; /* Reduce the stroke width */
}
:deep(.p-inputnumber .p-inputtext) {
  width: 50%;
  border-radius: 5px;
}
:deep(.p-inputnumber .p-inputtext:focus) {
  border-color: #2cb100;
}
</style>
