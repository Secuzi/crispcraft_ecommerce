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
import { onMounted, ref, watch, computed } from "vue";
import { useTransactionLogStore } from "@/stores/transactionlog";
import axios from "axios";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { useRoute } from "vue-router";
const transactionLogStore = useTransactionLogStore();
function removeTimeFromDateString(dateString) {
  return dateString.split("T")[0];
}
const route = useRoute();
// Track the currently active orderID
const activeOrderID = ref(null);

// Function to set the active transaction
function getTransactionContainer(orderID) {
  activeOrderID.value = orderID;
}

const merchant = ref(null);
const delivery = ref(null);
const payment = ref(null);

const searchTerm = ref("");
const filteredTransactions = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return transactionLogStore.transactions.filter((transaction) =>
    String(transaction.transactionID).toLowerCase().includes(term)
  );
});
const isLoading = ref(true);
onMounted(async () => {
  const transactionsResponse = await axios.get("/query/transaction-data");
  transactionLogStore.transactions = transactionLogStore.formatTransactions(
    transactionsResponse.data
  );

  activeOrderID.value = transactionLogStore.transactions[0].orderID;
  isLoading.value = false;
  console.log("active id: ", activeOrderID.value);
  console.log("Transaction log: ", transactionLogStore.transactions);
});
</script>

<template>
  <MainContainer>
    <div
      v-if="isLoading"
      class="text-center text-gray-500 py-6 flex-grow flex justify-center items-center bg-white"
    >
      <PulseLoader />
    </div>

    <div v-else>
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
                  :isActive="route.path === '/admin/stock'"
                />

                <AdminButton
                  route="/admin/transactions"
                  :imageIcon="TransactionIcon"
                  :isActive="route.path === '/admin/transactions'"
                  text="Transactions"
                />

                <AdminButton
                  route="/admin/merchants"
                  :isActive="route.path === '/admin/merchants'"
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
                    v-model="searchTerm"
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
                    v-for="(transaction, index) in filteredTransactions"
                    :key="transaction.transactionID"
                    class="myBoxShadow cursor-pointer bg-[#ECECEC] rounded-lg px-5 py-2"
                    :class="[index !== 0 ? 'mt-3' : '']"
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
                      <span
                        >TransactionID: {{ transaction.transactionID }}</span
                      >
                      <span>OrderID: {{ transaction.orderID }}</span>
                      <span
                        >Order Date:
                        {{
                          removeTimeFromDateString(transaction.orderDate)
                        }}</span
                      >
                      <span class="not-italic font-semibold"
                        >Total: &#8369;{{ transaction.subtotal + 60 }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              v-if="merchant"
              class="mt-[10rem] pb-[5rem] flex-grow font-bold text-[18px]"
            >
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
    </div>
  </MainContainer>
</template>

<style scoped>
:deep(.p-inputtext:focus) {
  border-color: #74cd5f !important;
}
</style>
