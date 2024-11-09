<script setup>
const props = defineProps({
  textSize: {
    type: String,
    default: "40px", // Default text size
  },
  featuredText: {
    type: String,
    default: "FEATURED", // Default text for the first span
  },
  productsText: {
    type: String,
    default: "PRODUCTS", // Default text for the second span
  },
});
</script>

<template>
  <h1
    :style="{ fontSize: props.textSize }"
    class="font-bebas text-black myTextShadow"
  >
    <span class="text-[#FF0000]">{{ props.featuredText }}</span
    >&nbsp;
    <span>{{ props.productsText }}</span>
  </h1>
</template>
