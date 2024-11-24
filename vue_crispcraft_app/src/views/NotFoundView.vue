<script setup>
import MainContainer from "@/components/MainContainer.vue";
import DesktopContainer from "@/components/DesktopContainer.vue";
import Navbar from "@/components/Navbar.vue";
import NotFoundIcon from "@/assets/images/icons/notfound_icon.svg";
</script>

<template>
  <MainContainer>
    <Navbar />

    <DesktopContainer background-color="bg-[#D6F3FF]">
      <section class="w-full">
        <section class="flex gap-3 items-center justify-center">
          <img :src="NotFoundIcon" alt="Not Found Icon" />
          <h1 class="text-[128px] font-bold">
            Error 404
            <span class="text-[96px] block">Page not found</span>
          </h1>
        </section>
      </section>
    </DesktopContainer>
  </MainContainer>
</template>
