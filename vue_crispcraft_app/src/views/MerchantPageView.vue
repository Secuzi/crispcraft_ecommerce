<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { IconField, InputIcon, InputText, Toast } from "primevue";
import DesktopContainer from "@/components/DesktopContainer.vue";
import MainContainer from "@/components/MainContainer.vue";
import Navbar from "@/components/Navbar.vue";
import HeaderText from "@/components/HeaderText.vue";
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useDeliveryStore } from "@/stores/delivery";
const selectedRow = ref(null); // Track the selected row
const authStore = useAuthStore();
const deliveryStore = useDeliveryStore();
function onRowSelect(event) {
  selectedRow.value = event.data;
  console.log("Row Selected:", event.data);
}

const setToDeliver = async () => {
  if (!selectedRow.value) {
    return;
  }
  const selectedDelivery = selectedRow.value;
  selectedDelivery.deliveryStatus = "shipping";
  selectedDelivery.merchantID = authStore.user_id;
  console.log("Authstore id", authStore.user_id);
  await axios.put(`delivery/${selectedDelivery.deliveryID}`, selectedDelivery);

  deliveryStore.pendingDeliveries = deliveryStore.pendingDeliveries.filter(
    (d) => d.deliveryID !== selectedDelivery.deliveryID
  );

  console.log("SET TO DELIVER ", selectedDelivery);
  console.log("DELIVERIES ", deliveryStore.pendingDeliveries);
};

function onRowUnselect() {
  selectedRow.value = null;
  console.log("Row Unselected");
}
const selectedDelivery = ref();
onMounted(async () => {
  const deliveryResponse = await axios.get("/query/delivery-data");
  deliveryStore.pendingDeliveries = deliveryStore.formatDeliveryData(
    deliveryResponse.data
  );
  console.log("PENDING DELEVERIES: ", deliveryStore.pendingDeliveries);
});
</script>

<template>
  <MainContainer>
    <Navbar />
    <DesktopContainer backgroundColor="bg-[#D6F3FF]" alignItems="flex-start">
      <!-- Main section to avoid rows -->
      <section class="flex-grow">
        <!-- header and search -->
        <div class="flex items-center">
          <HeaderText
            class="ml-11"
            featuredText="Merchant"
            productsText="Page"
            textSize="55px"
          />
          <div class="ml-[137px]">
            <IconField>
              <InputIcon class="pi pi-search" />
              <InputText
                placeholder="Search Order"
                class="!text-[20px] !focus:border-myPrimaryColor"
              />
            </IconField>
          </div>
        </div>
        <!-- buttons and table container -->
        <div class="grid grid-cols-[1fr_3fr] w-[90%] mt-[19px]">
          <!-- buttons container -->
          <div
            class="bg-white max-w-[270px] h-[462px] text-[24px] font-bold text-white"
          >
            <button
              class="bg-mySecondaryColor block w-full mt-12 py-3 myTextShadow text-center"
            >
              Pending
            </button>

            <button
              class="bg-mySecondaryColor w-full py-3 mt-12 myTextShadow text-center"
            >
              Returned
            </button>
          </div>

          <!-- Table container -->
          <div
            v-if="deliveryStore.pendingDeliveries.length > 0"
            class="relative"
          >
            <button
              v-if="selectedRow"
              class="absolute myTextShadow font-bold text-[24px] myBoxShadow px-14 py-3 bottom-0 right-7 bg-mySecondaryColor rounded-3xl text-white"
              @click="setToDeliver"
            >
              Shipped
            </button>
            <DataTable
              v-model:selection="selectedDelivery"
              :value="deliveryStore.pendingDeliveries"
              selectionMode="single"
              dataKey="orderID"
              :metaKeySelection="false"
              @rowSelect="onRowSelect"
              @rowUnselect="onRowUnselect"
              tableStyle="min-width: 50rem;"
            >
              <Column field="orderID" header="Order ID"></Column>
              <Column field="fullName" header="Customer Name"></Column>
              <Column field="orderItems" header="Products Ordered">
                <template #body="slotProps">
                  <ul>
                    <li
                      v-for="(item, index) in slotProps.data.orderItems"
                      :key="index"
                    >
                      {{
                        `${item.productName}: ${item.flavorName} x ${item.quantity}`
                      }}
                    </li>
                  </ul>
                </template>
              </Column>
              <Column field="phoneNum" header="Contact #"></Column>
              <Column field="address" header="Delivery Address"></Column>
              <Column field="totalAmount" header="Total Amount"></Column>
            </DataTable>
          </div>
        </div>
      </section>
    </DesktopContainer>
  </MainContainer>
</template>

<style scoped>
:deep(.p-inputtext:focus) {
  border-color: #74cd5f !important;
}
:deep(.p-datatable-row-selected) {
  background-color: #74cd5f !important;
  color: black !important;
}
.myDataTable .p-datatable-tbody > tr {
  height: 50px; /* Constant row height */
  overflow: hidden;
  transition: height 0.3s ease; /* Smooth expansion/collapse */
}

.myDataTable .p-datatable-tbody > tr.p-highlight {
  height: 100px; /* Expanded row height */
  overflow: visible;
}
</style>
