<script setup>
import { ref } from "vue";
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
  },
  {
    status: "Processing",
    description:
      "The order is being packaged now and will be forwarded to the delivering facility shortly.",
    image: DeliveryIcon,
    color: "#9C27B0",
    subtext: "Delivering the ordered products",
  },
  {
    status: "Processing",
    description:
      "The order is being packaged now and will be forwarded to the delivering facility shortly.",
    image: PackageReceivedIcon,
    color: "#9C27B0",
    subtext: "Delivery successful ",
  },
]);

const orderTrackerState = ref({
  packaging: true,
  delivering: false,
  received: false,
});

const orderTrackerStates = ref([
  {
    key: "package",
    label: "Package",
    description: "Your package is on its way!",
    active: true,
  },
  {
    key: "delivery",
    label: "Delivery",
    description: "Out for delivery!",
    active: false,
  },
  {
    key: "received",
    label: "Received",
    description: "Package received!",
    active: false,
  },
]);
</script>

<template>
  <MainContainer>
    <Navbar />

    <!-- Mobilee -->
    <MobileContainer backgroundColor="bg-[#D6F3FF]">
      <section class="flex justify-around">
        <HeaderText
          featuredText="ORDER"
          productsText="TRACKER"
          textSize="32px"
          featuredTextColor="#004DFF"
        />
        <div class="flex items-center">
          <button
            class="myTextShadow bg-[#F63639] px-7 py-1 text-white z-10 rounded-lg text-[15px] font-bold"
          >
            Cancel
          </button>
        </div>
      </section>

      <section
        class="bg-white px-4 py-4 w-[95%] mr-auto rounded-tr-3xl myBoxShadow flex-grow"
      >
        <div class="">
          <!-- <div
            class="p-timeline p-component p-timeline-left p-timeline-vertical"
            data-pc-name="timeline"
            pc40
            data-pc-section="root"
          >
            <div class="p-timeline-event" data-pc-section="event">
              <div
                class="p.timeline-event-opposite"
                data-pc-section="eventopposite"
              >
                <small>15/20/2023</small>
              </div>

              <div
                class="p-timeline-event-separator"
                data-pc-section="eventseparator"
              >
                <div
                  class="p-timeline-event-marker"
                  data-pc-section="eventmarker"
                ></div>
                <div
                  class="p-timeline-event-connector"
                  data-pc-section="eventconnector"
                ></div>
              </div>

              <div
                class="p-timeline-event-content"
                data-pc-section="eventcontent"
              >
                Ordered
              </div>
            </div>
          </div> -->
          <Timeline :value="orderTracker">
            <template #opposite="{ item, index }">
              <div class="">
                <div class="w-[34px] mx-auto">
                  <img :src="item.image" alt="" class="object-fill" />
                </div>

                <p class="text-xs text-center mt-2 myTextShadow">
                  {{ item.subtext }}
                </p>
              </div>
            </template>

            <template #content="{ item, index }">
              <p class="text-xs">{{ item.description }}</p>
            </template>

            <template #marker="{ item, index }">
              <span :style="{ backgroundColor: 'red' }" class="custom-marker">
                <i :class="item.icon">oten</i>
              </span>
            </template>
          </Timeline>

          <!-- <Timeline :value="orderTracker" >
            <template #opposite="slotProps">
              <div class="">
                <div class="w-[34px] mx-auto">
                  <img :src="slotProps.item.image" alt="" class="object-fill" />
                </div>

                <p class="text-xs text-center mt-2 myTextShadow">
                  {{ slotProps.item.subtext }}
                </p>
              </div>
            </template>
            <template #content="slotProps">
              <p class="text-xs">{{ slotProps.item.description }}</p>
            </template>
          </Timeline> -->
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
  border: 2px solid black;
}

:deep(.p-timeline .p-timeline-event:nth-child(1) img) {
  opacity: 50%;
}

:deep(.p-timeline .p-timeline-event:nth-child(1) .p-timeline-event-marker) {
  background: green;
}
:deep(.p-timeline-event-marker::before) {
  background: none;
}
</style>
