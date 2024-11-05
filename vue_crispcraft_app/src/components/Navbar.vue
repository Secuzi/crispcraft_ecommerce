<script setup>
import logo from "@/assets/images/BAG of CHIPS/logo.png";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
</script>

<template>
  <nav class="bg-myPrimaryColor">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <img :src="logo" class="w-[64px] sm:w-[117px] inline-block" />
        <IconField class="text-[8px] inline-block sm:text-[20px]">
          <InputIcon class="pi pi-search text-sm md:text-base" />
          <InputText
            v-model="value1"
            placeholder="Search"
            class="rounded-[20px] max-w-[126px] sm:max-w-[256px] lg:max-w-[382px]"
          />
        </IconField>
      </div>
      <div class="grow flex lg:justify-evenly justify-around items-center">
        <ul class="flex items-center sm:justify-around sm:w-full gap-5">
          <li>
            <RouterLink
              to="/"
              class="text-white text-[8px] font-bold sm:text-[20px]"
              >Notifications</RouterLink
            >
          </li>

          <li>
            <RouterLink
              to="/"
              class="text-white text-[8px] font-bold sm:text-[20px]"
              >Help</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
