<script setup>
import Navbar from "@/components/Navbar.vue";
import HeaderText from "@/components/HeaderText.vue";
import Carousel from "@/components/Carousel.vue";
import InputNumber from "primevue/inputnumber";
import Subtotal from "@/components/Subtotal.vue";
import { ref } from "vue";
import MainContainer from "@/components/MainContainer.vue";
import ProductSweetCheese from "@/assets/images/BAG of CHIPS/cheese.png";
import ProductCheesyHot from "@/assets/images/BAG of CHIPS/cheesyhot.png";
import ProductChiliHot from "@/assets/images/BAG of CHIPS/chilihot.png";
import ProductSaltedOnion from "@/assets/images/BAG of CHIPS/onion.png";
import MobileContainer from "@/components/MobileContainer.vue";

const formQuantity = ref(null);

const products = ref([
  {
    id: 1,
    image: ProductCheesyHot,
    productName: "MC Cheesy Hot",
    colorTheme: "#EF9426",
    price: 100,
    qty: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
  {
    id: 2,
    image: ProductSaltedOnion,
    colorTheme: "#AE76B8",
    productName: "MC Salted Onion",
    price: 200,
    qty: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
  {
    id: 3,
    image: ProductChiliHot,
    colorTheme: "#863E24",
    productName: "MC Chili Hot",
    price: 300,
    qty: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
  {
    id: 4,
    image: ProductSweetCheese,
    colorTheme: "#EBCB5F",
    productName: "MC Sweet Cheese",
    price: 200,
    qty: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
  },
]);
</script>

<template>
  <MainContainer>
    <Navbar />

    <MobileContainer>
      <section class="myContainer">
        <HeaderText textsize="55px" />
        <p class="italic font-medium text-[12px] text-opacity-[.5]">
          Choose other flavors:
        </p>
      </section>

      <section>
        <Carousel items="products" />
      </section>

      <section class="myContainer">
        <h2>
          MALUNGGAY CHIPS:
          <span>Sweet Cheese</span>
        </h2>
        <p class="italic">
          <span class="font-bold">Description</span> Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Possimus, illo.
        </p>
        <div>
          <div>
            <div>
              <span>Quantity:</span>
              <InputNumber v-model="formQuantity" inputId="integeronly" />
            </div>
            <button>+</button>
            <button>-</button>
          </div>
          <div>
            <h3>Available Stock: 100</h3>
          </div>
        </div>

        <!-- Do this shit: -->

        <Subtotal
          :products="products"
          tableHeaderTextSize="10px"
          subTotalTextSize="12px"
          dataTextSize="7px"
          sumNumberTextSize="10px"
        />
      </section>
    </MobileContainer>
  </MainContainer>
</template>

<style scoped>
.myContainer {
  width: 90%;
  margin: 0 auto;
}
</style>
