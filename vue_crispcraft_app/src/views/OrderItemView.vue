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

import Button from "@/components/Button.vue";

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
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
  {
    id: 2,
    image: ProductSaltedOnion,
    colorTheme: "#AE76B8",
    productName: "MC Salted Onion",
    flavor: "Salted Onion",
    price: 200,
    stock: 39,
    qty: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
  {
    id: 3,
    image: ProductChiliHot,
    colorTheme: "#863E24",
    productName: "MC Chili Hot",
    flavor: "Chili Hot",
    price: 300,
    stock: 25,
    qty: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
  {
    id: 4,
    image: ProductSweetCheese,
    colorTheme: "#EBCB5F",
    productName: "MC Sweet Cheese",
    flavor: "Sweet Cheese",
    price: 200,
    stock: 69,
    qty: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
  {
    id: 5,
    image: ProductSweetCheese,
    colorTheme: "#EBCB5F",
    productName: "MC Sweet Cheese",
    flavor: "Sweet Cheese",
    price: 345,
    stock: 69,
    qty: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
]);

const selectedProduct = ref({});

const selectedIndex = ref(null);
</script>

<template>
  <MainContainer>
    <Navbar />

    <!-- Todo: 
     3. Implement changing shit based on selecting product
     3.1 When user clicks on a product we get its index and scale it
     3.2 We have a selectedProduct object
     


     -->
    <MobileContainer>
      <section class="myContainer">
        <HeaderText
          textsize="55px"
          class="text-left"
          products-text="ITEM"
          featured-text="ORDER"
        />
        <p class="italic font-medium text-[14px] text-black text-opacity-[.5]">
          Choose other flavors:
        </p>
      </section>

      <section class="relative">
        <div class="myContainer mt-3">
          <MultiCarousel
            :items="products"
            slidesPerView="4"
            class="relative z-10"
          />
          <div
            class="bg-white h-[80px] absolute z-0 bottom-0 left-0 right-0"
          ></div>
        </div>
      </section>

      <section class="myContainer">
        <h2
          class="text-[32px] text-stroke text-white font-bebas myTextShadow mt-2"
        >
          MALUNGGAY CHIPS:
          <span
            class="font-rubik tracking-tighter font-bold text-[#EBCB5F] block mt-[-11px] mb-2"
            style="-webkit-text-stroke: 2px; -webkit-text-stroke-color: black"
            >Sweet Cheese</span
          >
        </h2>
        <p class="italic text-black text-opacity-50 text-[14px] mb-[10px]">
          <span class="font-bold">Description</span> Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Proin at risus vel nisi volutpat
          facilisis. Enjoy the perfect blend of flavor and texture!
        </p>
        <div class="flex items-center gap-2">
          <div class="flex justify-between items-end flex-shrink">
            <div class="flex flex-col basis-[100px]">
              <span
                class="font-bold italic text-[14px] text-black text-opacity-50"
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
              <div class="flex gap-3 mt-2">
                <Button text="-" padding_x="0.5rem" padding_y="0px" />
                <Button text="+" padding_x="0.5rem" padding_y="0px" />
              </div>
            </div>
          </div>
          <div class="grow fluid">
            <h3 class="font-extrabold text-black text-opacity-50 text-[14px]">
              Available Stock: 100
            </h3>
            <h3 class="font-extrabold text-black text-[14px]">Price: 100</h3>
          </div>
        </div>

        <!-- Do this shit: -->

        <Subtotal
          :products="products"
          tableHeaderTextSize="12px"
          subTotalTextSize="14px"
          dataTextSize="14px"
          sumNumberTextSize="14px"
          class="mt-[15px]"
        />
      </section>
      <section class="myContainer flex justify-center">
        <button
          class="bg-myPrimaryColor myTextShadow mt-[22px] myBoxShadow text-white font-bold text-[13px] px-5 py-2 rounded-[25px] text-center"
        >
          Checkout
        </button>
      </section>
    </MobileContainer>
  </MainContainer>
</template>

<style scoped>
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
.myContainer {
  width: 90%;
  margin-inline: auto;
}
</style>
