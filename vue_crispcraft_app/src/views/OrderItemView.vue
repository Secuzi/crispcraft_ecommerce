<script setup>
import Navbar from "@/components/Navbar.vue";
import HeaderText from "@/components/HeaderText.vue";
import InputNumber from "primevue/inputnumber";
import Subtotal from "@/components/Subtotal.vue";
import { ref } from "vue";
import MainContainer from "@/components/MainContainer.vue";
import ProductSweetCheese from "@/assets/images/BAG of CHIPS/cheese.png";
import ProductCheesyHot from "@/assets/images/BAG of CHIPS/cheesyhot.png";
import ProductChiliHot from "@/assets/images/BAG of CHIPS/chilihot.png";
import ProductSaltedOnion from "@/assets/images/BAG of CHIPS/onion.png";
import MobileContainer from "@/components/MobileContainer.vue";
import MultiCarousel from "@/components/MultiCarousel.vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import { useOrderItemStore } from "@/stores/multicarousel";
import { onUnmounted, watchEffect, onMounted } from "vue";
import Button from "@/components/Button.vue";
import DesktopContainer from "@/components/DesktopContainer.vue";
const formQuantity = ref(null);

const products = ref([
  {
    id: 1,
    image: ProductCheesyHot,
    productName: "MC Cheesy Hot",
    colorTheme: "#EF9426",
    flavor: "Cheesy Hot",
    price: 100,
    stock: 99,
    qty: 2,
    isFontBlack: true,
    description:
      "Experience the delightful crunch of our Cheesy Hot Malunggay Chips—nutritious, flavorful, and perfect for satisfying your snack cravings!",
  },
  {
    id: 2,
    image: ProductSaltedOnion,
    colorTheme: "#AE76B8",
    productName: "MC Salted Onion",
    flavor: "Salted Onion",
    isFontBlack: false,
    price: 200,
    stock: 39,
    qty: 2,
    description:
      "Enjoy our Malunggay Chips with Salted Onion flavor—crispy, nutritious, and bursting with savory goodness. A delightful snack for every occasion!",
  },
  {
    id: 3,
    image: ProductChiliHot,
    colorTheme: "#863E24",
    productName: "MC Chili Hot",
    flavor: "Chili Hot",
    isFontBlack: false,
    price: 300,
    stock: 25,
    qty: 2,
    description:
      "Spice up your snack time with our Malunggay Chips in Chili Hot flavor—crispy, zesty, and packed with a fiery kick! Perfectly addictive!",
  },
  {
    id: 4,
    image: ProductSweetCheese,
    colorTheme: "#EBCB5F",
    productName: "MC Sweet Cheese",
    flavor: "Sweet Cheese",
    isFontBlack: true,
    price: 200,
    stock: 69,
    qty: 2,
    description:
      "Indulge in our Sweet Cheese Malunggay Chips—crispy and perfectly sweetened with cheesy goodness. A unique treat for every snack lover!",
  },
  {
    id: 5,
    image: ProductSweetCheese,
    colorTheme: "#EBCB5F",
    productName: "MC Sweet Cheese",
    flavor: "Sweet Cheese",
    isFontBlack: true,
    price: 345,
    stock: 69,
    qty: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
  {
    id: 6,
    image: ProductSweetCheese,
    colorTheme: "#EBCB5F",
    productName: "MC Sweet Cheese",
    flavor: "Sweet Cheese",
    isFontBlack: true,
    price: 345,
    stock: 69,
    qty: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
  {
    id: 7,
    image: ProductSweetCheese,
    colorTheme: "#EBCB5F",
    productName: "MC Sweet Cheese",
    flavor: "Sweet Cheese",
    isFontBlack: true,
    price: 345,
    stock: 69,
    qty: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
]);

onMounted(() => {
  //Make a call to
});

onUnmounted(() => {
  orderItemStore.selectedProduct = {};
});

const orderItemStore = useOrderItemStore();

orderItemStore.selectedProduct = products.value[0];
</script>

<template>
  <MainContainer>
    <Navbar />

    <DesktopContainer
      alignItems="md:start"
      :backgroundColor="orderItemStore.selectedProduct.colorTheme"
    >
      <section class="basis-[415px] self-center">
        <!-- Selected Product -->
        <div class="flex justify-center">
          <Transition name="slide-fade">
            <img
              v-show="orderItemStore.selectedProduct"
              :key="orderItemStore.selectedProduct.id"
              :src="orderItemStore.selectedProduct.image"
              :alt="orderItemStore.selectedProduct.flavor"
              class="w-[70%]"
            />
          </Transition>
        </div>
      </section>

      <section class="basis-[630px]">
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
          MALUNGGAY CHIPS:
          <span
            class="font-rubik tracking-tighter font-bold text-[#EBCB5F] block mt-[-11px] mb-2"
            style="-webkit-text-stroke: 2px; -webkit-text-stroke-color: black"
            >{{ orderItemStore.selectedProduct.flavor }}</span
          >
        </h2>

        <div class="h-[84px] overflow-y-auto">
          <p
            :class="[
              'italic',
              'max-w-[360px]',
              'text-[14px]',
              'mb-[10px]',
              orderItemStore.selectedProduct.isFontBlack
                ? 'text-black'
                : 'text-white',
            ]"
          >
            <span class="font-bold">Description:</span>
            {{ orderItemStore.selectedProduct.description }}
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
              inputId="integeronly"
              class="h-[24px]"
              :pt="{
                inputtext: {
                  root: '!rounded-[5px]',
                },
                root: '!rounded-[5px]',
              }"
              style="width: 212px; height: 48px"
            />
            <!-- Button Container -->
            <div class="mt-3">
              <Button text="-" padding_x="1.5rem" padding_y="0px" />
              <Button
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
              Available Stock: {{ orderItemStore.selectedProduct.stock }}
            </h3>
            <h3 class="font-extrabold text-[18px]">
              Price: {{ orderItemStore.selectedProduct.price }}
            </h3>
          </div>
        </div>

        <h3
          class="font-medium"
          :class="[
            orderItemStore.selectedProduct.isFontBlack
              ? 'text-black'
              : 'text-white',
          ]"
        >
          Choose Other Flavors:
        </h3>

        <div class="flex justify-around mt-[22px]">
          <MultiCarousel
            :style="'width: 400px'"
            :items="products"
            slidesPerView="3"
            spaceBetween="20"
          />
        </div>
      </section>

      <section class="self-center p-4">
        <div>
          <Subtotal
            :products="products"
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

    <!-- MOBILEEE -->
    <MobileContainer>
      <section class="myContainer">
        <HeaderText
          textsize="55px"
          class="text-left"
          products-text="ITEM"
          featured-text="ORDER"
        />
        <p
          class="italic font-medium text-[14px]"
          :class="[
            orderItemStore.selectedProduct.isFontBlack
              ? 'text-black'
              : 'text-white',
          ]"
        >
          Choose other flavors:
        </p>
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

      <section v-if="orderItemStore.selectedProduct" class="myContainer">
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
          <p
            :class="[
              'italic',

              'text-[14px]',
              'mb-[10px]',
              orderItemStore.selectedProduct.isFontBlack
                ? 'text-black'
                : 'text-white',
            ]"
          >
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
                inputId="integeronly"
                class="h-[24px]"
                :pt="{
                  inputtext: {
                    root: '!rounded-[5px]',
                  },
                  root: '!rounded-[5px]',
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
    </MobileContainer>
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
