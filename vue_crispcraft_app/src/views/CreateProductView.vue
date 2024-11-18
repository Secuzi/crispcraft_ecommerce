<script setup>
import MainContainer from "@/components/MainContainer.vue";
import DesktopContainer from "@/components/DesktopContainer.vue";
import Navbar from "@/components/Navbar.vue";
import HeaderText from "@/components/HeaderText.vue";
import ProductForm from "@/components/ProductForm.vue";
</script>
<template>
  <MainContainer>
    <Navbar />
    <section class="bg-[#D6F3FF] h-full py-10">
      <section class="flex justify-center items-center w-full">
        <div>
          <HeaderText
            featuredText="Create Product"
            productsText=""
            textSize="55px"
            class="text-center"
          />
          <ProductForm></ProductForm>
        </div>
      </section>
    </section>
  </MainContainer>
</template>
