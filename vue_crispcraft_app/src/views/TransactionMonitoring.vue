<script setup>
import ChecklistIcon from "@/assets/images/icons/checklists.svg";
import TransactionIcon from "@/assets/images/icons/transaction.svg";
import ClerkIcon from "@/assets/images/icons/clerk.svg";
import MainContainer from "@/components/MainContainer.vue";
import DesktopContainer from "@/components/DesktopContainer.vue";
import Navbar from "@/components/Navbar.vue";
import AdminButton from "@/components/AdminButton.vue";
import HeaderText from "@/components/HeaderText.vue";
import { IconField, InputIcon, InputText } from "primevue";
</script>

<template>
  <MainContainer>
    <Navbar />
    <DesktopContainer
      backgroundColor="bg-[#D6F3FF]"
      alignItems="flex-start"
      class=""
    >
      <section class="flex-grow">
        <div class="w-[90%] mx-auto grid grid-cols-[1.1fr_2fr_1.1fr] gap-7">
          <section class="flex-grow">
            <HeaderText
              featuredText="Transaction"
              productsText="Monitoring"
              textSize="47px"
            />
            <div
              class="bg-white flex py-[5rem] max-w-[401px] flex-col gap-9 justify-center px-5 rounded-2xl mt-[5.7rem]"
            >
              <AdminButton
                route="/admin/stock"
                :imageIcon="ChecklistIcon"
                text="Inventory"
              />

              <!-- <RouterLink>
                <div
                  class="flex items-center justify-center xl:gap-3 2xl:gap-5 bg-[#63A553] rounded-2xl px-4 py-2 myBoxShadow"
                >
                  <img :src="ChecklistIcon" class="w-[47px] h-[46px]" />
                  <span
                    class="text-white flex-grow font-bold myTextShadow text-[24px] text-left"
                    >Inventory</span
                  >
                </div>
              </RouterLink> -->

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

          <section class="flex-grow">
            <!-- Transaction log -->
            <div class="h-[84px] flex flex-col justify-center">
              <IconField>
                <InputIcon class="pi pi-search" />
                <InputText
                  placeholder="Search Transaction"
                  class="!text-[20px] !focus:border-myPrimaryColor"
                />
              </IconField>
            </div>
            <div
              class="bg-white py-[24px] px-[19px] rounded-[10px] myTextShadow mt-[5rem]"
            >
              <h2 class="text-[20px] font-semibold mb-4">Transaction Log</h2>
              <!-- Main container for the list of logs -->
              <div>
                <!-- Log Container -->
                <div class="myBoxShadow bg-[#ECECEC] rounded-lg px-5 py-2">
                  <!-- For loop for the products in the specific order -->
                  <div class="text-[18px] flex justify-between">
                    <!-- Product name + Flavor name -->
                    <span class="font-extrabold"
                      >Malunggay Chips: Cheesy Hot</span
                    >
                    <!--  -->
                    <span class="font-semibold">Qty: 23</span>
                  </div>
                  <!-- second row -->
                  <div
                    class="text-[15px] italic mt-8 flex justify-between font-medium"
                  >
                    <span>OrderID: ####</span>
                    <span>Order Date: #####</span>
                    <span class="not-italic font-semibold">Total: Php 100</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="mt-[10rem] pb-[5rem] flex-grow font-bold text-[18px]">
            <span>Merchant in charge</span>

            <!-- Merchant container -->
            <div
              class="font-medium text-[16px] mb-11 px-6 py-4 myTextShadow myBoxShadow bg-white rounded-[30px]"
            >
              <p>Name: Nameofmerchant</p>
              <p>ID: 29392</p>
              <div class="mt-3">
                <p>Contact Details:</p>
                <p>Cell# 09696969</p>
                <p>Tell#: 123456</p>
                <p>Email: asasdasd@gmail.com</p>
              </div>
            </div>

            <span>Customer Payment Details</span>
            <!-- Payment container -->
            <div
              class="font-medium text-[16px] px-6 py-4 myTextShadow myBoxShadow bg-white rounded-[30px]"
            >
              <p>Payment Method: Gcash</p>
              <p>Payment amount: Php 635</p>
              <p>Payment date: 10/10/24</p>
              <p class="text-end text-[13px] italic">Payment ID: 2323232</p>
            </div>
          </section>
        </div>
      </section>
    </DesktopContainer>
  </MainContainer>
</template>

<style scoped>
:deep(.p-inputtext:focus) {
  border-color: #74cd5f !important;
}
</style>
