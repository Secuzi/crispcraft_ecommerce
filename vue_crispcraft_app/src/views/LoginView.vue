<script setup>
import logo from "@/assets/images/BAG of CHIPS/logo.png";
import Login from "@/components/Login.vue";
import productHighlight from "@/assets/images/PRODUCT PLACEMENT RESOURCES/1.png";
</script>

<template>
  <main class="h-dvh flex flex-col overflow-hidden">
    <div class="bg-primary h-[46px]"></div>
    <div class="bg-secondary flex-grow relative">
      <div
        class="container mx-auto p-[16px] flex justify-center h-full flex-col flex-grow xl:flex-row xl:items-center"
      >
        <!-- Login form -->
        <Login />
        <!-- <Register /> -->

        <section class="hidden xl:block w-[674px]">
          <img
            :src="productHighlight"
            alt="product highlight"
            class="rounded-[27px]"
          />
        </section>

        <img
          :src="logo"
          class="w-[137px] self-center lg:self-end lg:absolute lg:bottom-[-6rem] lg:w-[215px] lg:right-[1rem] z-10"
        />
      </div>
    </div>

    <div class="bg-primary h-[46px]"></div>
  </main>
</template>
