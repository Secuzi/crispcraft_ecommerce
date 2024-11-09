<script setup>
import { ref } from "vue";
import { useOrderItemStore } from "@/stores/multicarousel";

const orderItemStore = useOrderItemStore();
const props = defineProps({
  alignItems: {
    type: String,
    default: "md:items-center",
  },
  backgroundColor: {
    type: String,
    default: "bg-mySecondaryColor",
  },
});
</script>

<template>
  <!-- Desktop View -->
  <main
    class="md:flex md:justify-between hidden flex-grow"
    :class="[alignItems, backgroundColor]"
    :style="{
      backgroundColor: orderItemStore.selectedProduct
        ? orderItemStore.selectedProduct.colorTheme
        : props.backgroundColor,
    }"
  >
    <slot></slot>
  </main>
</template>

<style scoped>
main {
  transition: background-color 0.3s ease-in-out; /* Smooth transition for background color */
}
</style>
