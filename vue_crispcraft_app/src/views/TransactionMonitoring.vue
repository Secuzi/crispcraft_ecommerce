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
import { onMounted, ref, watch } from "vue";
import { useTransactionLogStore } from "@/stores/transactionlog";
import axios from "axios";

const transactionLogStore = useTransactionLogStore();
function removeTimeFromDateString(dateString) {
  return dateString.split("T")[0];
}

// Track the currently active orderID
const activeOrderID = ref(null);

// Function to set the active transaction
function getTransactionContainer(orderID) {
  activeOrderID.value = orderID;
}

const merchant = ref(null);
const delivery = ref(null);
const payment = ref(null);

watch(
  () => activeOrderID.value,
  async (newID) => {
    //Make a call to delivery first then get the merchant it
    const deliveryResponse = await axios.get(`/delivery/orderID/${newID}`);
    delivery.value = deliveryResponse.data.delivery;
    console.log("DELIVERYYY: ", delivery.value);
    const { merchantID } = deliveryResponse.data;
    //Make a call to merchant using merchant id!
    const merchantResponse = await axios.get(`/merchant/${merchantID}`);
    merchant.value = merchantResponse.data.merchant;
    console.log("Merchaant: ", merchant.value);

    const paymentResponse = await axios.get(`/payment/orderID/${newID}`);
    console.log("PAYMEENT: ", paymentResponse.data);
    payment.value = paymentResponse.data;
  }
);

onMounted(async () => {
  const transactionsResponse = await axios.get("/query/transaction-data");
  transactionLogStore.transactions = transactionLogStore.formatTransactions(
    transactionsResponse.data
  );

  activeOrderID.value = transactionLogStore.transactions[0].orderID;

  console.log("active id: ", activeOrderID.value);
  console.log("Transaction log: ", transactionLogStore.transactions);
});
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
              <AdminButton
                route="/admin/merchants"
                :imageIcon="ClerkIcon"
                text="Merchants"
              />
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
              class="bg-white py-[24px] px-[19px] rounded-[10px] myTextShadow mt-[5rem] h-[600px] overflow-auto"
            >
              <h2 class="text-[20px] font-semibold mb-4">Transaction Log</h2>
              <!-- Main container for the list of logs -->
              <div v-if="transactionLogStore.transactions.length > 0">
                <!-- Log Container -->
                <!-- For loop for the products in the specific order -->
                <div
                  v-for="(
                    transaction, index
                  ) in transactionLogStore.transactions"
                  :key="transaction.transactionID"
                  class="myBoxShadow cursor-pointer bg-[#ECECEC] rounded-lg px-5 py-2"
                  :class="[
                    index !== 0 ? 'mt-3' : '',
                    activeOrderID === transaction.orderID
                      ? 'bg-white'
                      : 'bg-[#ECECEC]',
                  ]"
                  @click="getTransactionContainer(transaction.orderID)"
                >
                  <div
                    v-for="orderItem in transaction.orderItems"
                    class="text-[18px] flex justify-between"
                  >
                    <!-- Product name + Flavor name -->
                    <span class="font-extrabold"
                      >{{ orderItem.productName }}:
                      {{ orderItem.flavorName }}</span
                    >
                    <!--  -->
                    <span class="font-semibold"
                      >Qty: {{ orderItem.quantity }}</span
                    >
                  </div>
                  <!-- second row -->
                  <div
                    class="text-[15px] italic mt-8 flex justify-between font-medium"
                  >
                    <span>OrderID: {{ transaction.orderID }}</span>
                    <span
                      >Order Date:
                      {{
                        removeTimeFromDateString(transaction.orderDate)
                      }}</span
                    >
                    <span class="not-italic font-semibold"
                      >Total: {{ transaction.subtotal + 60 }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="mt-[10rem] pb-[5rem] flex-grow font-bold text-[18px]">
            <span>Merchant in charge</span>

            <!-- Merchant container -->
            <div
              v-if="merchant"
              class="font-medium text-[16px] mb-11 px-6 py-4 myTextShadow myBoxShadow bg-white rounded-[30px]"
            >
              <p>Name: {{ merchant.fName }} {{ merchant.lName }}</p>
              <p>ID: {{ merchant.merchantID }}</p>
              <div class="mt-3">
                <p>Contact Details:</p>
                <p>Cell# {{ merchant.phoneNumber }}</p>
                <p>Tell#: {{ merchant.telNumber }}</p>
                <p>Email: {{ merchant.email }}</p>
              </div>
            </div>

            <span>Customer Payment Details</span>
            <!-- Payment container -->
            <div
              v-if="payment"
              class="font-medium text-[16px] px-6 py-4 myTextShadow myBoxShadow bg-white rounded-[30px]"
            >
              <p>Payment Method: {{ payment.paymentMethod }}</p>
              <p>Payment amount: Php {{ payment.paymentAmount }}</p>
              <p>
                Payment date:
                {{ removeTimeFromDateString(payment.paymentDate) }}
              </p>
              <p class="text-end text-[13px] italic">
                Payment ID: {{ payment.paymentID }}
              </p>
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
