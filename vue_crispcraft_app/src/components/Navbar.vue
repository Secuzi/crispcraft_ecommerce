<script setup>
import logo from "@/assets/images/BAG of CHIPS/logo.png";
import { RouterLink } from "vue-router";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import OrdersIcon from "@/assets/images/icons/orders_icon.svg";
import { Popover } from "primevue";
import HeaderText from "./HeaderText.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import OverlayBadge from "primevue/overlaybadge";
const authStore = useAuthStore();
const router = useRouter();
function removeTimeFromDateString(dateString) {
  return dateString.split("T")[0];
}
const authenticationClick = () => {
  if (!authStore.authenticated) {
    return router.push("/login");
  }
  authStore.logout();
};
const op = ref();

const togglePopover = (event) => {
  op.value.toggle(event);
};
const selectOrder = (deliveryID) => {
  op.value.toggle();
  router
    .push({
      path: `/track-order/${deliveryID}`,
    })
    .catch((err) => {
      if (err.name !== "NavigationDuplicated") {
        console.error(err);
      }
    });
};
const route = useRoute();
const severity = ref();

const orderList = ref([]);
onMounted(async () => {
  if (authStore.role !== "customer" || !authStore.user_id) {
    return;
  }

  const orderListResponse = await axios.get(
    `/query/order-list/${authStore.user_id}`
  );
  if (orderListResponse.data.length > 0) {
    severity.value = "danger";
  } else {
    severity.value = null;
  }
  orderList.value = orderListResponse.data;
  for (const order of orderList.value) {
    const subtotalResponse = await axios.get(
      `/query/order-subtotal/${order.orderID}`
    );
    order.subtotal = subtotalResponse.data.subtotal;
  }

  const orderItems = await axios.get("/order-item/");
  console.log('ROUTEE FULL: ', route.fullPath)
  console.log('ROUTEE: ', route.path)
  console.log("Orderlist", orderList.value);
});
</script>

<template>
  <nav class="bg-myPrimaryColor" id="smallNav">
    <div class="flex justify-around items-center ">
      <div class="flex items-center sm:min-h-[50px] lg:min-h-[167px] ">
        <RouterLink to="/" class="cursor-pointer">
          <img v-show="authStore.role === 'customer'":src="logo" class="w-[64px] sm:w-[117px] inline-block" />
        </RouterLink>
      </div>
      <div class="flex items-center">
        <ul class="flex items-center sm:justify-around sm:w-full gap-16 sm:self-center">
          <li>
            <RouterLink
              v-if="authStore.role === 'customer'"
              to="/order"
              class="text-white text-[8px] font-bold sm:text-[20px]"
              >Order</RouterLink
            >
          </li>

          <li v-if="authStore.role == 'customer'">
            <!-- Keep the icon always visible -->
            <OverlayBadge :severity="severity" v-if="orderList.length > 0">
              <button @click="togglePopover">
                <img :src="OrdersIcon" class="w-[36px]" />
              </button>
            </OverlayBadge>

            <!-- Render icon without badge -->
            <template v-else>
              <button @click="togglePopover">
                <img :src="OrdersIcon" class="w-[36px]" />
              </button>
            </template>

            <Popover ref="op">
              <div class="flex flex-col gap-4 !max-h-[250px] !overflow-auto">
                <div class="myTextShadow">
                  <HeaderText
                    featuredText="Ordered"
                    productsText="Products"
                    textSize="20px"
                  />
                  <ul class="list-none p-0 m-0 flex flex-col">
                    <li
                      v-for="order in orderList"
                      :key="order.orderID"
                      class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                      @click="selectOrder(order.deliveryID)"
                    >
                      <div>
                        <div class="flex justify-between">
                          <HeaderText
                            featuredText="Order"
                            :productsText="String(order.orderID)"
                            textSize="20px"
                          />
                          <span class="text-[16px] font-bold"
                            >&#8369; {{ order.subtotal + 60 }}</span
                          >
                        </div>
                        <div>
                          <span
                            >Delivery Date:
                            {{
                              removeTimeFromDateString(order.deliveryDate)
                            }}</span
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Popover>
          </li>
          <li>
            <RouterLink
              to="/"
              class="text-white text-[8px] font-bold sm:text-[20px] sm:min-h-[50px] sm:self-center"
              @click="authenticationClick"
              >{{ authStore.authenticated ? "Logout" : "Log in" }}</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
:deep(.p-inputtext:focus) {
  border-color: #2cb100 !important;
}
@media (max-width: 639px) {
  /* Your styles for phone-sized devices go here */
  #smallNav {
    height: 50px;
    }
}


</style>
