<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Timeline from "primevue/timeline";
import MobileContainer from "@/components/MobileContainer.vue";
import DesktopContainer from "@/components/DesktopContainer.vue";
import CustomerSupportIcon from "@/assets/images/icons/customer_support_icon.svg";
import DeliveryIcon from "@/assets/images/icons/delivery_icon.svg";
import PackageReceivedIcon from "@/assets/images/icons/package_received_icon.svg";
import PackageIcon from "@/assets/images/icons/package_icon.svg";
import HeaderText from "@/components/HeaderText.vue";
import ExpiredIcon from "@/assets/images/icons/expired_icon.svg";
import DamagedIcon from "@/assets/images/icons/damaged_icon.svg";
import NoIssuesIcon from "@/assets/images/icons/noissues_icon.svg";
import NotDeliveredIcon from "@/assets/images/icons/notdelivered_icon.svg";
import WrongProductIcon from "@/assets/images/icons/wrongproduct_icon.svg";

import Navbar from "@/components/Navbar.vue";
import { useRoute } from "vue-router";
import MainContainer from "@/components/MainContainer.vue";
import axios from "axios";
import Drawer from "primevue/drawer";
import router from "@/router/route";
// const delivery = ref({
//   deliveryID: 9594,
//   deliveryDate: "2023-01-01",
//   cashCollected: null,
//   deliveryStatus: "processing",
//   orderID: 23,
// });

/*
  store design:
  1. Customer has an array of delivery each delivery has order id
  
  2. if (delivery.deliveryStatus === orderTracker.status){
    isDelivered.value = true
    }
    */
const route = useRoute();
const delivery = ref({});

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const deliveryStates = ref([
  {
    status: "pending",
    label: "Pending",
    icon: "pi pi-clock",
    description: "Order placed",
    image: PackageIcon,
    active: false,
    subtext: "Packaging the customer's order",
  },
  {
    status: "shipping",
    label: "Shipping",
    icon: "pi pi-truck",
    image: DeliveryIcon,
    subtext: "Delivering the ordered products",
    description: "On the way",
    active: false,
  },
  {
    status: "delivered",
    label: "Delivered",
    icon: "pi pi-check",
    image: PackageReceivedIcon,
    subtext: "Delivery successful ",
    description: "Delivered",
    active: false,
  },
]);
const timelineEvents = computed(() => {
  const currentStatusIndex = deliveryStates.value.findIndex(
    (state) => state.status === delivery.value.deliveryStatus
  );

  // Update active states
  return deliveryStates.value.map((state, index) => ({
    ...state,
    active: index <= currentStatusIndex,
  }));
});

const calculatePriceTotal = (products) => {
  let sum = 0;
  for (const product of products) {
    sum += product.price;
  }
  return sum;
};

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchDelivery();
    }
  }
);

async function fetchDelivery() {
  const deliveryID = route.params.id;
  console.log("Delivery ID: ", deliveryID);
  // const deliveryResponse = await axios.get(`/delivery/${deliveryID}`);

  const deliveryQuery = await axios.get(
    `/query/delivery-tracker/${deliveryID}`
  );
  delivery.value = deliveryQuery.data;

  // deliveryQuery.data.orderItems = JSON.parse(deliveryQuery.data.orderItems);
  delivery.value.orderItems = JSON.parse(delivery.value.orderItems);
  console.log("DELIVERY QUERY!: ", delivery.value);
}

const isDelivered = computed(() => {
  return deliveryStates.value[1].active;
});

if (delivery.value.deliveryStatus === "delivered") {
  isDelivered.value = true;
}

onMounted(fetchDelivery);
</script>

<template>
  <MainContainer>
    <Navbar />

    <DesktopContainer background-color="bg-[#D6F3FF]">
      <div class="w-[90%] mx-auto h-[70%]">
        <section class="flex justify-between items-center">
          <HeaderText
            featuredText="ORDER"
            productsText="TRACKER"
            textSize="55px"
            featuredTextColor="#004DFF"
          />
          <div v-if="delivery" class="flex items-center">
            <button
              v-if="delivery.deliveryStatus === 'delivered'"
              class="myTextShadow bg-[#004DFF] px-7 py-1 text-white z-10 rounded-lg text-[22px] font-bold"
              :class="[!isDelivered ? 'opacity-100' : 'opacity-50']"
            >
              Delivered
            </button>
          </div>
        </section>

        <section
          v-if="delivery.deliveryStatus !== 'cancelled'"
          class="bg-white px-[56px] py-4 mr-auto rounded-3xl flex-grow relative h-full"
        >
          <div class="w-[884px] mx-auto mt-12">
            <Timeline
              :value="timelineEvents"
              layout="horizontal"
              align="bottom"
              class="w-[100%] !ml-[13%]"
            >
              <template #content="{ item, index }">
                <div class="">
                  <div
                    :class="[item.active ? 'opacity-100' : 'opacity-50']"
                    class="w-[157px]"
                  >
                    <img
                      :src="item.image"
                      alt=""
                      :class="[item.status == 'Received' ? 'h-[33px]' : '']"
                    />
                  </div>

                  <p
                    :class="[
                      item.active
                        ? 'text-opacity-100 text-black'
                        : 'text-opacity-50 text-black',
                      !item.active ? 'hidden' : 'block',
                    ]"
                    class="text-xs myTextShadow mt-2"
                  >
                    {{ item.subtext }}
                  </p>
                </div>
              </template>

              <template #opposite="{ item, index }">
                <div class="h-[64px]">
                  <p v-show="item.active" class="text-xs">
                    {{ item.description }}
                  </p>
                </div>
              </template>

              <template #marker="{ item, index }">
                <span class="p-timeline-event-marker">
                  <i
                    class="pi pi-circle-fill"
                    :style="{ color: item.active ? '#B0FF9E' : '#D6F3FF' }"
                  ></i>
                </span>
              </template>
            </Timeline>
          </div>
          <div class="border-t-[#999999] pt-[21px] border-t grid grid-cols-2">
            <div class="max-w-[415px]">
              <h2 class="font-extrabold text-[16px]">Order Item</h2>
              <div class="overflow-auto max-h-[209px] mt-2">
                <div
                  v-for="product in delivery.orderItems"
                  class="flex items-center gap-[12px] mt-[19px]"
                >
                  <!-- Image placement -->
                  <div
                    class="bg-[#F2F2F2] rounded-[5px] flex justify-center items-center basis-[104px] py-[4px]"
                  >
                    <img
                      :src="baseUrl + '/' + product.image"
                      alt="Product image"
                      class="max-w-[46px]"
                    />
                  </div>
                  <!-- Secondary container -->
                  <div class="flex justify-between items-center grow pr-1">
                    <div>
                      <p class="text-[16px]">{{ product.productName }}</p>
                      <span class="text-[15px] text-[#666666]">{{
                        product.flavorName
                      }}</span>
                    </div>
                    <div>
                      <span
                        >{{ product.quantity }} x &#8369;{{
                          product.price
                        }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="delivery.orderItems"
              class="myBoxShadow px-[10px] rounded-[5px] text-[16px] min-h-[241px]"
            >
              <h2 class="font-extrabold">Order Summary</h2>
              <div class="mt-[34px]">
                <!-- Product price -->
                <div class="flex justify-between text-[#666666]">
                  <span>Product Price</span>
                  <span>{{ delivery.orderItems.length }} items</span>
                  <span class="text-black"
                    >&#8369;{{ calculatePriceTotal(delivery.orderItems) }}</span
                  >
                </div>
                <div class="flex justify-between mt-[28px] text-[#666666]">
                  <span>Shipping Fee</span>

                  <span class="text-black">+&#8369;60</span>
                </div>
                <div
                  class="w-full h-[1px] bg-[#D9D9D9] mt-[33px] mb-[14px]"
                ></div>

                <div class="text-right">
                  <span class="font-extrabold">Total: </span>
                  <span
                    >&#8369;{{
                      calculatePriceTotal(delivery.orderItems) + 60
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="absolute bottom-7 right-7 myTextShadow text-[15px]">
            <!-- <div class="flex gap-2 items-center">
              <img
                :src="CustomerSupportIcon"
                alt="Customer Support"
                class="w-[32px]"
              />
              <span class="myTextShadow font-bold">Customer Support</span>
            </div> -->
            <span>Delivery ID: {{ delivery.deliveryID }}</span>
          </div>
        </section>

        <section v-else>
          <HeaderText
            featuredText="DELIVERY CANCELLED"
            productsText=""
            textSize="32px"
          />
        </section>
      </div>
    </DesktopContainer>

    <!-- Mobilee -->
    <MobileContainer backgroundColor="bg-[#D6F3FF]">
      <section class="flex justify-around items-center">
        <HeaderText
          featuredText="ORDER"
          productsText="TRACKER"
          textSize="32px"
          featuredTextColor="#004DFF"
        />
        <div class="flex items-center">
          <button
            :disabled="isDelivered"
            class="myTextShadow bg-[#F63639] px-7 py-1 text-white z-10 rounded-lg text-[15px] font-bold"
            :class="[!isDelivered ? 'opacity-100' : 'opacity-50']"
            :style="{ backgroundColor: !isDelivered ? '#F63639' : '#004DFF' }"
          >
            {{ !isDelivered ? "Cancel" : "Delivered" }}
          </button>
        </div>
      </section>

      <section
        class="bg-white px-4 py-4 w-[95%] mr-auto rounded-tr-3xl flex-grow relative"
      >
        <div class="">
          <Timeline :value="orderTracker">
            <template #opposite="{ item, index }">
              <div class="">
                <div
                  :class="[item.active ? 'opacity-100' : 'opacity-50']"
                  class="w-[34px] mx-auto"
                >
                  <img :src="item.image" alt="" class="object-fill" />
                </div>

                <p
                  :class="[
                    item.active
                      ? 'text-opacity-100 text-black'
                      : 'text-opacity-50 text-black',
                  ]"
                  class="text-xs text-center mt-2 myTextShadow"
                >
                  {{ item.subtext }}
                </p>
              </div>
            </template>

            <template #content="{ item, index }">
              <p v-if="item.active" class="text-xs">{{ item.description }}</p>
            </template>

            <template #marker="{ item, index }">
              <span class="p-timeline-event-marker">
                <i
                  class="pi pi-circle-fill"
                  :style="{ color: item.active ? '#B0FF9E' : '#D6F3FF' }"
                ></i>
              </span>
            </template>
          </Timeline>
        </div>
        <div class="absolute bottom-2">
          <div class="flex gap-2 items-center">
            <img
              :src="CustomerSupportIcon"
              alt="Customer Support"
              class="w-[32px]"
            />
            <span class="myTextShadow font-bold">Customer Support</span>
          </div>
        </div>
      </section>
    </MobileContainer>
  </MainContainer>
</template>

<style scoped>
:deep(.p-timeline-event) {
  height: 150px;
}

:deep(.p-timeline-event-connector) {
  background: black;
}

:deep(.p-timeline-event-marker) {
  background: #d6f3ff;
  border: 1px solid black;
}

:deep(.p-timeline-horizontal .p-timeline-event:last-child) {
  flex-grow: 1;
}
::-webkit-scrollbar {
  width: 4px;
}
</style>
