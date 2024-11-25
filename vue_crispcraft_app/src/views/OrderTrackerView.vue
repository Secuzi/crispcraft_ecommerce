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
const visibleBottom = ref(false);
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
  const deliveryResponse = await axios.get(`/delivery/${deliveryID}`);
  delivery.value = deliveryResponse.data.delivery;

  console.log("DELIVERY!: ", delivery.value);
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
          <Drawer
            v-model:visible="visibleBottom"
            position="bottom"
            :showCloseIcon="false"
            style="height: 638px; max-width: 1283px"
            class="!rounded-t-3xl"
          >
            <template #header>
              <div class="flex justify-between w-full">
                <HeaderText
                  featuredText="Order"
                  productsText="Feedback"
                  textSize="55px"
                  featured-text-color="#004DFF"
                />
                <div class="flex items-center">
                  <button
                    class="myTextShadow bg-[#004DFF] px-12 py-3 text-white z-10 rounded-2xl text-[22px] font-bold myBoxShadow"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </template>
            <div>
              <!-- Description Container -->
              <div class="flex items-center mb-[73px] w-[90%] mx-auto">
                <img :src="CustomerSupportIcon" class="w-[55px]" />
                <div class="font-extrabold text-[24px] text-black myTextShadow">
                  <p>Is there any wrong with the delivery?</p>
                  <p>Please let us know.</p>
                </div>
              </div>

              <!-- feedback container (main grid)-->
              <div class="grid grid-cols-5 gap-5 w-[90%] mx-auto">
                <div class="flex flex-col gap-3 items-center">
                  <div class="max-h-[111px]">
                    <img :src="WrongProductIcon" />
                  </div>
                  <p>They delivered the <span>wrong product.</span></p>
                </div>
                <div class="flex flex-col gap-3 items-center">
                  <div class="max-h-[111px]">
                    <img :src="ExpiredIcon" />
                  </div>
                  <p>
                    The product was <span>expired</span> when it was delivered.
                  </p>
                </div>
                <div class="flex flex-col gap-3 items-center">
                  <div class="max-h-[111px]">
                    <img :src="DamagedIcon" />
                  </div>
                  <p>
                    The product was <span>damaged</span> when was is delivered.
                  </p>
                </div>
                <div class="flex flex-col gap-3 items-center">
                  <div class="h-[111px] flex items-center">
                    <img :src="NotDeliveredIcon" />
                  </div>

                  <p>The product has not been <span>Delivered.</span></p>
                </div>
                <div class="flex flex-col gap-3 items-center">
                  <div class="h-[111px] flex items-center">
                    <img :src="NoIssuesIcon" />
                  </div>

                  <p>
                    The product is <span>Fine</span> and <span>no issues.</span>
                  </p>
                </div>
              </div>
            </div>
          </Drawer>

          <HeaderText
            featuredText="ORDER"
            productsText="TRACKER"
            textSize="55px"
            featuredTextColor="#004DFF"
          />
          <div v-if="delivery" class="flex items-center">
            <button
              @click="visibleBottom = true"
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
          class="bg-white px-4 py-4 mr-auto rounded-3xl flex-grow relative h-full flex items-center"
        >
          <div class="w-[884px] mx-auto">
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
            @click="console.log('test')"
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
</style>
