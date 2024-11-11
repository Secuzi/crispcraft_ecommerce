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
  featuredTextColor: {
    type: String,
    default: "#FF0000",
  },
});
</script>

<template>
  <h1
    :style="{ fontSize: props.textSize }"
    class="font-bebas text-black myTextShadow"
  >
    <span :style="{ color: props.featuredTextColor }">{{
      props.featuredText
    }}</span
    >&nbsp;
    <span>{{ props.productsText }}</span>
  </h1>
</template>
