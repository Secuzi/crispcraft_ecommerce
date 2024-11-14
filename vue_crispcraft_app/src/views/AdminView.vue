<script setup>
import { useCartStore } from "@/stores/cart";
import DesktopContainer from "@/components/DesktopContainer.vue";
import MainContainer from "@/components/MainContainer.vue";
import MobileContainer from "@/components/MobileContainer.vue";
import Navbar from "@/components/Navbar.vue";
import HeaderText from "@/components/HeaderText.vue";
import ProductSaltedOnion from "@/assets/images/BAG of CHIPS/onion.png";
import CheckoutProductCard from "@/components/CheckoutProductCard.vue";
import { IconField, InputIcon, InputText } from "primevue";
import ChecklistIcon from "@/assets/images/icons/checklists.svg";
import TransactionIcon from "@/assets/images/icons/transaction.svg";
import ClerkIcon from "@/assets/images/icons/clerk.svg";
import Button from "@/components/Button.vue";
const cartStore = useCartStore();
</script>

<template>
  <MainContainer>
    <Navbar />

    <DesktopContainer
      backgroundColor="bg-[#D6F3FF]"
      alignItems="flex-start"
      class="overflow-hidden"
    >
      <section class="flex-grow">
        <div class="w-[90%] mx-auto flex gap-12 h-[100%]">
          <section class="basis-[365px] flex flex-col justify-between">
            <HeaderText
              featuredText="ITEM"
              productsText="STOCK"
              textSize="55px"
            />
            <div
              class="bg-white flex flex-col gap-9 justify-center px-3 rounded-t-2xl h-[85%]"
            >
              <button>
                <div
                  class="flex items-center justify-center xl:gap-3 2xl:gap-5 bg-[#63A553] rounded-2xl px-4 py-2 myBoxShadow"
                >
                  <img :src="ChecklistIcon" class="w-[47px] h-[46px]" />
                  <span
                    class="text-white flex-grow font-bold myTextShadow text-[24px] text-left"
                    >Inventory</span
                  >
                </div>
              </button>
              <button>
                <div
                  class="flex items-center justify-center xl:gap-3 2xl:gap-5 bg-[#63A553] rounded-2xl px-4 py-2 myBoxShadow"
                >
                  <img :src="TransactionIcon" class="w-[47px] h-[46px]" />
                  <span
                    class="text-white flex-grow font-bold myTextShadow text-[24px] text-left"
                    >Transactions</span
                  >
                </div>
              </button>
              <button>
                <div
                  class="flex items-center justify-center xl:gap-3 2xl:gap-5 bg-[#63A553] rounded-2xl px-4 py-2 myBoxShadow"
                >
                  <img :src="ClerkIcon" class="w-[47px]" />
                  <span
                    class="text-white flex-grow font-bold myTextShadow text-[24px] text-left"
                    >Merchants</span
                  >
                </div>
              </button>
            </div>
          </section>
          <section class="flex flex-col justify-between basis-[800px]">
            <div class="h-[84px] flex flex-col justify-center">
              <IconField>
                <InputIcon class="pi pi-search" />
                <InputText placeholder="Search Product" class="!text-[20px]" />
              </IconField>
            </div>

            <div class="flex flex-col gap-4 h-[85%] overflow-auto w-full">
              <CheckoutProductCard
                class="h-[128px] flex-grow-0"
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
          </section>
          <section class="flex-grow flex flex-col justify-center">
            <form v-on:submit.prevent="" class="bg-white rounded-xl px-10 py-5">
              <div class="form-item">
                <label for="productName" class="myTextShadow"
                  >Product Name:</label
                >
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  placeholder="Enter product name"
                  class="border-black p-3 border-2 rounded-[5px] myBoxShadow block w-full"
                />
              </div>
              <div class="form-item">
                <label for="flavorName" class="myTextShadow"
                  >Flavor Name:</label
                >
                <input
                  type="text"
                  name="flavorName"
                  id="flavorName"
                  placeholder="Enter flavor name"
                  class="border-black p-3 border-2 rounded-[5px] myBoxShadow block w-full"
                />
              </div>

              <div class="form-item">
                <label for="description" class="myTextShadow"
                  >Product Description:</label
                >
                <textarea
                  id="description"
                  placeholder="Enter product description"
                  class="border-black w-full p-3 border-2 rounded-[5px] myBoxShadow block"
                ></textarea>
              </div>
              <div class="form-item">
                <label for="stock" class="myTextShadow"
                  >Stocks Available:</label
                >
                <div class="flex justify-around gap-2">
                  <Button
                    text="-"
                    padding_x="1.5rem"
                    padding_y="0px"
                    class="!text-[32px]"
                  />
                  <Button
                    text="+"
                    padding_x="1.5rem"
                    padding_y="0px"
                    class="!text-[32px] ml-3"
                  />
                  <input
                    type="text"
                    name="product stock"
                    id="stock"
                    class="border-black border-2 px-2 rounded-[5px] myBoxShadow"
                  />
                </div>
              </div>
              <div class="form-item">
                <label for="price" class="myTextShadow">Price:</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  class="border-black w-full border-2 p-3 rounded-[5px] myBoxShadow block"
                />
              </div>
              <div class="flex justify-end">
                <button
                  class="bg-[#74CD5F] text-white px-5 rounded-full myBoxShadow font-bold text-[24px] py-[6px] myTextShadow"
                >
                  Save
                </button>
              </div>
            </form>

            <div class="flex justify-around mt-3">
              <button
                class="font-bold text-[24px] rounded-full text-white bg-[#3672F6] myBoxShadow myTextShadow px-4 py-3"
              >
                Edit Item
              </button>
              <button
                class="font-bold text-[24px] rounded-full text-white bg-[#3672F6] myBoxShadow myTextShadow px-4 py-3"
              >
                Add Item
              </button>
            </div>
          </section>
        </div>
      </section>
    </DesktopContainer>

    <MobileContainer backgroundColor="bg-[#D6F3FF]">
      <section class="myContainer">
        <HeaderText featuredText="ITEM" productsText="STOCK" textSize="20px" />
      </section>

      <section class="myContainer mt-4">
        <div class="grid grid-cols-2 gap-3 auto-rows-[40px]">
          <div class="flex flex-col">
            <button>
              <div
                class="flex items-center justify-center gap-5 bg-[#63A553] rounded-2xl px-4 py-2 myBoxShadow"
              >
                <img :src="ChecklistIcon" class="w-[21px]" />
                <span
                  class="text-white flex-grow font-bold myTextShadow text-[12px] text-left"
                  >Inventory</span
                >
              </div>
            </button>
          </div>
          <div class="flex flex-col">
            <button>
              <div
                class="flex items-center justify-center gap-3 bg-[#63A553] rounded-2xl px-4 py-2 myBoxShadow"
              >
                <img :src="TransactionIcon" class="w-[21px]" />
                <span
                  class="text-white flex-grow font-bold myTextShadow text-[12px] text-left"
                  >Transactions</span
                >
              </div>
            </button>
          </div>
          <button>
            <div
              class="flex items-center justify-center gap-5 bg-[#63A553] rounded-2xl px-4 py-2 myBoxShadow"
            >
              <img :src="ClerkIcon" class="w-[21px]" />
              <span
                class="text-white flex-grow font-bold myTextShadow text-[12px] text-left"
                >Merchants</span
              >
            </div>
          </button>
        </div>
      </section>

      <!-- Main section with padding -->
      <section class="h-[544px] overflow-scroll-auto overflow-x-hidden mt-3">
        <div
          v-for="product in cartStore.products"
          :key="product.id"
          class="bg-white px-[10px] py-[14px] myBoxShadow rounded-l-lg w-[95%] mt-4 ml-auto"
        >
          <!-- Has 2 flex items  -->
          <div class="flex gap-1 items-center justify-between">
            <!-- Header, input, labels -->
            <div class="">
              <h3 class="text-[13px] font-extrabold myTextShadow mb-2">
                {{ product.productName }}
              </h3>
              <!-- For the two inputs stocks and price -->
              <div class="flex gap-3">
                <!-- Container for stocks -->
                <div class="flex-grow">
                  <label
                    for="stock"
                    class="italic text-[12px] myTextShadow font-light"
                    >Stocks Available:</label
                  >
                  <!-- Inputs and buttons -->
                  <div class="flex gap-1 items-center">
                    <input
                      type="text"
                      name="stock"
                      id="stock"
                      class="myBoxShadow px-2 max-w-[85px] border border-black rounded-md"
                    />
                    <Button
                      text="-"
                      padding_x="6px"
                      padding_y="0px"
                      class="!text-[16px] text-center rounded-sm"
                    />
                    <Button
                      text="+"
                      padding_x="6px"
                      padding_y="0px"
                      class="!text-[16px] text-center rounded-sm"
                    />
                  </div>
                </div>
                <!-- Container for price -->
                <div class="flex-grow">
                  <label
                    for="price"
                    class="italic text-[12px] myTextShadow font-light"
                    >Price:</label
                  >
                  <!-- Inputs and buttons -->
                  <div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      class="myBoxShadow px-2 max-w-[85px] border border-black rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Image -->
            <img :src="product.image" alt="Lnion" class="w-[45px] self-end" />
          </div>
        </div>
      </section>
    </MobileContainer>
  </MainContainer>
</template>

<style scoped>
.form-item {
  margin-bottom: 1rem;
}

:deep(.p-inputtext:focus) {
  border-color: #74cd5f !important;
}
.form-item label {
  font-size: 14px;
  font-style: italic;
  font-weight: 500;
}
</style>
