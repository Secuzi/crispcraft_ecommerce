<script setup>
import HeaderText from "./HeaderText.vue";
import MainContainer from "./MainContainer.vue";
import MobileContainer from "./MobileContainer.vue";
import Navbar from "./Navbar.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useDeliveryStore } from "@/stores/delivery";
import Drawer from "primevue/drawer";
import { RouterLink } from "vue-router";
const deliveryStore = useDeliveryStore();
const deliveries = ref([]);
const visibleBottom = ref(false);

const selectedDeliveryID = ref(null);

const showDrawer = (deliveryID) => {
  selectedDeliveryID.value = deliveryID;
  visibleBottom.value = true;
};

const handleCancelationReason = async (reason) => {
  try {
    const deliveryID = selectedDeliveryID.value;

    if (!deliveryID) {
      console.error("No delivery ID selected.");
      return;
    }

    const delivery = deliveries.value.find((d) => d.deliveryID === deliveryID);
    if (!delivery) {
      console.error("Delivery not found.");
      return;
    }

    // Update the delivery with reason and status locally
    delivery.reason = reason;
    delivery.deliveryStatus = "cancelled";

    await axios.put(`/delivery/cancel`, {
      deliveryID: delivery.deliveryID,
      reason: delivery.reason,
    });

    console.log("DELIVERY ID: ", deliveryID);

    // Update local state after cancelation
    deliveries.value = deliveries.value.filter(
      (d) => d.deliveryID !== deliveryID
    );

    visibleBottom.value = false; // Close the drawer
  } catch (error) {
    console.error("Error storing reason:", error);
  }
};

const updateDeliveryStatus = async (deliveryID) => {
  console.log("IN DELIVERY");
  const delivery = deliveries.value.find((d) => d.deliveryID === deliveryID);
  console.log(delivery);
  delivery.deliveryStatus = "delivered";
  delivery.cashCollected = delivery.totalAmount + 60;
  await axios.put(`/delivery/${deliveryID}`, delivery);
  deliveries.value = deliveries.value.filter(
    (d) => d.deliveryID !== deliveryID
  );

  console.log("DELIVERYY: ", delivery);
  //Update payment

  const paymentAmount = delivery.cashCollected;

  const payment = await axios.put(`/payment/${delivery.paymentID}`, {
    paymentAmount,
  });

  console.log("PAYMEENT: ", payment);
  //Update transaction
  const { orderID } = delivery;
  await axios.post("/transaction-log", { orderID, deliveryID });
};

onMounted(async () => {
  const deliveryResponse = await axios.get("/query/delivery-data", {
    params: {
      data: "shipping",
    },
  });

  deliveries.value = deliveryStore.formatDeliveryData(deliveryResponse.data);
});
</script>

<template>
  <MainContainer>
    <Navbar />
    <MobileContainer backgroundColor="bg-[#D6F3FF]">
      <section class="h-full">
        <div>
          <div class="w-[95%] mx-auto flex items-center justify-between mb-3">
            <h1>
              <HeaderText
                featuredText="Delivery"
                productsText="Tracker"
                textSize="32px"
                featuredTextColor="#004DFF"
              />
            </h1>

            <RouterLink
              to="/merchant"
              class="myBoxShadow text-white text-[15px] font-bold py-2 px-4 bg-[#004DFF] rounded-full"
              >Home</RouterLink
            >
          </div>
          <div
            class="w-[95%] bg-white py-3 mx-auto rounded-2xl myTextShadow text-[13px]"
          >
            <h2 class="font-bold text-[16px] px-3">Deliveries</h2>
            <!-- Deliveries where deliverystatus = shipping -->
            <div
              v-for="delivery in deliveries"
              :key="delivery.deliveryID"
              class="bg-[#ECECEC] mt-3 px-3 py-3"
            >
              <div class="grid grid-cols-[2fr_1fr]">
                <!-- First col -->
                <div>
                  <h3>{{ delivery.fName }} {{ delivery.lName }}</h3>
                  <p>Contact #: {{ delivery.phoneNum }}</p>
                  <p>Address: {{ delivery.address }}</p>
                </div>
                <!-- Second col -->
                <div class="flex items-center">
                  <span class="font-bold text-[16px]"
                    >Php {{ delivery.totalAmount + 60 }}</span
                  >
                </div>
              </div>

              <div class="text-[13px] flex justify-end gap-4 mt-3">
                <button
                  @click="updateDeliveryStatus(delivery.deliveryID)"
                  class="myBoxShadow text-white text-[15px] font-bold py-1 px-1 bg-mySecondaryColor rounded-full"
                >
                  Delivered
                </button>
                <button
                  @click="showDrawer(delivery.deliveryID)"
                  class="myBoxShadow text-white text-[15px] font-bold py-1 px-1 bg-[#F63636] rounded-full"
                >
                  Remove
                </button>
                <Drawer
                  v-model:visible="visibleBottom"
                  position="bottom"
                  :showCloseIcon="false"
                  style="height: 363px; max-width: 320px"
                  class="!rounded-t-3xl"
                >
                  <template #header>
                    <div>
                      <h2
                        class="myTextShadow text-black font-extrabold text-[16px]"
                      >
                        Reason for Cancelation?
                      </h2>
                    </div>
                  </template>
                  <div class="text-black">
                    <button
                      @click="
                        handleCancelationReason('Customer did not show up.')
                      "
                      class="font-bold w-full text-start text-[13px] bg-[#ECECEC] px-4 py-3 mb-4"
                    >
                      Customer did not show up.
                    </button>
                    <button
                      @click="
                        handleCancelationReason('Delivered the wrong product.')
                      "
                      class="font-bold w-full text-start text-[13px] bg-[#ECECEC] px-4 py-3 mb-4"
                    >
                      Delivered the wrong product.
                    </button>
                    <button
                      @click="
                        handleCancelationReason('Customer cannot be reached.')
                      "
                      class="font-bold w-full text-start text-[13px] bg-[#ECECEC] px-4 py-3 mb-4"
                    >
                      Customer cannot be reached.
                    </button>
                  </div>
                </Drawer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MobileContainer>
  </MainContainer>
</template>
