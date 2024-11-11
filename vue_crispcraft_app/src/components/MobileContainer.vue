<script setup>
import { useOrderItemStore } from "@/stores/multicarousel";

const orderItemStore = useOrderItemStore();

const props = defineProps({
  backgroundColor: {
    type: String,
    default: "bg-mySecondaryColor",
  },
});
</script>
<template>
  <main
    :class="['grow', 'flex', 'flex-col', 'md:hidden', props.backgroundColor]"
    :style="{
      backgroundColor: orderItemStore.selectedProduct
        ? orderItemStore.selectedProduct.colorTheme
        : props.backgroundColor,
    }"
  >
    <!-- Some content -->
    <slot></slot>
  </main>
  <div class="bg-myPrimaryColor h-[49px] w-full md:hidden"></div>
</template>

<style scoped>
main {
  transition: background-color 0.3s ease-in-out; /* Smooth transition for background color */
}
</style>
