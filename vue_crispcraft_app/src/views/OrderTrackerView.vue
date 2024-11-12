<script setup>
import { ref, computed } from "vue";
import Timeline from "primevue/timeline";
import MobileContainer from "@/components/MobileContainer.vue";
import DesktopContainer from "@/components/DesktopContainer.vue";
import CustomerSupportIcon from "@/assets/images/icons/customer_support_icon.svg";
import DeliveryIcon from "@/assets/images/icons/delivery_icon.svg";
import PackageReceivedIcon from "@/assets/images/icons/package_received_icon.svg";
import PackageIcon from "@/assets/images/icons/package_icon.svg";
import HeaderText from "@/components/HeaderText.vue";
import Navbar from "@/components/Navbar.vue";
import MainContainer from "@/components/MainContainer.vue";

const orderTracker = ref([
  {
    status: "Processing",
    description:
      "The order is being packaged now and will be forwarded to the delivering facility shortly.",
    image: PackageIcon,
    color: "#9C27B0",
    subtext: "Packaging the customer's order",
    active: true,
  },
  {
    status: "Delivering",
    description:
      "Your package is now at CEBU CITY. ETA to your location 10/30/24.",
    image: DeliveryIcon,
    color: "#9C27B0",
    subtext: "Delivering the ordered products",
    active: true,
  },
  {
    status: "Received",
    description:
      "The order is being packaged now and will be forwarded to the delivering facility shortly.",
    image: PackageReceivedIcon,
    color: "#9C27B0",
    subtext: "Delivery successful ",
    active: true,
  },
]);

const isDelivered = computed(() => {
  return orderTracker.value[1].active;
});
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
          <div class="flex items-center">
            <button
              @click="console.log('test')"
              :disabled="isDelivered"
              class="myTextShadow bg-[#F63639] px-7 py-1 text-white z-10 rounded-lg text-[22px] font-bold"
              :class="[!isDelivered ? 'opacity-100' : 'opacity-50']"
              :style="{ backgroundColor: !isDelivered ? '#F63639' : '#004DFF' }"
            >
              {{ !isDelivered ? "Cancel" : "Delivered" }}
            </button>
          </div>
        </section>

        <section
          class="bg-white px-4 py-4 mr-auto rounded-3xl flex-grow relative h-full flex items-center"
        >
          <div class="w-[884px] mx-auto">
            <Timeline
              :value="orderTracker"
              layout="horizontal"
              align="bottom"
              class="w-[100%]"
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
          <div class="absolute bottom-7 left-7">
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
