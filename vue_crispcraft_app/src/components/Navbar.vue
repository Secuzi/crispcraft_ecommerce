<script setup>
import logo from "@/assets/images/BAG of CHIPS/logo.png";
import { RouterLink } from "vue-router";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import OrdersIcon from "@/assets/images/icons/orders_icon.svg";
import { Popover } from "primevue";
import HeaderText from "./HeaderText.vue";
import { ref, onMounted } from "vue";
const authStore = useAuthStore();
const router = useRouter();

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

onMounted(() => {});
</script>

<template>
  <nav class="bg-myPrimaryColor">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <RouterLink to="/">
          <img :src="logo" class="w-[64px] sm:w-[117px] inline-block" />
        </RouterLink>
        <IconField class="text-[8px] inline-block sm:text-[20px]">
          <InputIcon class="pi pi-search text-sm md:text-base" />
          <InputText
            v-model="value1"
            placeholder="Search"
            :pt="{
              root: {
                style: { borderRadius: '25px' },
              },
            }"
            class="rounded-[25px] max-w-[126px] sm:max-w-[256px] lg:max-w-[382px] test"
          />
        </IconField>
      </div>
      <div class="grow flex lg:justify-evenly justify-around items-center">
        <ul class="flex items-center sm:justify-around sm:w-full gap-5">
          <li>
            <RouterLink
              to="/checkout"
              class="text-white text-[8px] font-bold sm:text-[20px]"
              >Checkout</RouterLink
            >
          </li>

          <li>
            <RouterLink
              to="/order"
              class="text-white text-[8px] font-bold sm:text-[20px]"
              >Order</RouterLink
            >
          </li>

          <li>
            <button @click="togglePopover">
              <img :src="OrdersIcon" class="w-[36px]" />
            </button>
            <Popover ref="op">
              <div class="flex flex-col gap-4">
                <div class="myTextShadow">
                  <HeaderText
                    featuredText="Ordered"
                    productsText="Products"
                    textSize="20px"
                  />
                  <ul class="list-none p-0 m-0 flex flex-col">
                    <li
                      v-for="member in members"
                      :key="member.name"
                      class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                      @click="selectMember(member)"
                    >
                      <div>
                        <HeaderText
                          featuredText="Order"
                          productsText="1"
                          textSize="20px"
                        />
                        <span class="text-[16px] font-bold">Php 160</span>
                      </div>
                      <div>
                        <span>Delivery Date: 24/11/11</span>
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
              class="text-white text-[8px] font-bold sm:text-[20px]"
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
</style>
